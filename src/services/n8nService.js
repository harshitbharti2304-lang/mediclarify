// Caregiver Alert Automation Service (n8n Webhook / WhatsApp / SMS)
// Complete Null-Safety & Timeout Guardrails - Never crashes the main thread

export async function sendCaregiverAlert({
  report,
  language = 'en',
  caregiverPhone = '+91 98765 43210',
  caregiverName = 'Family Caregiver',
  webhookUrl = ''
}) {
  try {
    if (!report) {
      console.warn('[Caregiver Alert] No report provided for dispatch.');
      return {
        success: false,
        error: 'No report data',
        message: 'Caregiver alert failed to send, but report processing is complete'
      };
    }

    const abnormalMetrics = (report.keyMetrics || []).filter(m => m && m.status !== 'normal');
    const summaryBullet = 
      report.simplifiedSummary?.[language]?.[0] || 
      report.simplifiedSummary?.en?.[0] || 
      'Medical findings reviewed.';

    const steps = (report.actionableSteps?.[language] || report.actionableSteps?.en || [])
      .map(s => s?.title || s)
      .filter(Boolean);

    const patientName = report.patient?.name || 'Patient';
    const patientDate = report.patient?.date || new Date().toLocaleDateString();
    const reportTitle = report.title || 'Medical Report';
    const badgeLabel = 
      report.statusOverview?.badgeText?.[language] || 
      report.statusOverview?.badgeText?.en || 
      'Reviewed';

    // Structured JSON payload formatted for n8n webhooks
    const payload = {
      eventId: `alert-${Date.now()}`,
      eventType: 'MEDICLARIFY_PATIENT_ALERT',
      timestamp: new Date().toISOString(),
      channel: 'WHATSAPP_SMS_AUTOMATION',
      source: 'MediClarify Caregiver Alert Network',
      patient: {
        name: patientName,
        age: report.patient?.age || 'Not specified',
        gender: report.patient?.gender || 'Not specified',
        reportTitle,
        reportDate: patientDate,
        preferredLanguage: language
      },
      caregiver: {
        name: caregiverName,
        phone: caregiverPhone
      },
      triageLevel: abnormalMetrics.length > 0 
        ? (report.statusOverview?.level === 'alert' ? 'URGENT_ATTENTION' : 'MODERATE_MONITORING') 
        : 'ROUTINE',
      abnormalMetrics: abnormalMetrics.map(m => ({
        parameter: m?.name || 'Test Parameter',
        observed: m?.displayValue || 'N/A',
        normalRange: m?.normalRange || 'Standard',
        status: m?.status ? m.status.toUpperCase() : 'NORMAL',
        plainExplanation: (m?.explanation && (m.explanation[language] || m.explanation.en)) || ''
      })),
      simplifiedSummaryHighlight: summaryBullet,
      actionableSteps: steps,
      audioPlaybackUrl: `https://mediclarify.app/listen/${report.id || 'current'}?lang=${language}`
    };

    // WhatsApp formatted markdown message for direct preview
    const whatsappText = `🏥 *MediClarify Health Update for ${patientName}*
📅 *Date:* ${patientDate}
🩺 *Report:* ${reportTitle}

*Status:* ${badgeLabel}

⚠️ *Key Parameters Needing Attention:*
${abnormalMetrics.length > 0 
  ? abnormalMetrics.map(m => `• *${m?.name || 'Parameter'}:* ${m?.displayValue || 'Observed'} _(Normal: ${m?.normalRange || 'Standard'})_`).join('\n') 
  : '• All checked markers are within normal limits!'}

💡 *Doctor's Plain-Language Summary:*
"${summaryBullet}"

_Sent via MediClarify Patient Portal_`;

    const smsText = `MediClarify Health Update for ${patientName} (${patientDate}):
Report: ${reportTitle}
Status: ${badgeLabel}
${abnormalMetrics.length > 0 ? `Key Markers: ${abnormalMetrics.map(m => `${m?.name || 'Parameter'}: ${m?.displayValue || ''} (Normal: ${m?.normalRange || 'Standard'})`).join(', ')}` : 'All tested markers are within normal reference ranges.'}
Doctor's Note: "${summaryBullet}"
Recommended: ${steps.slice(0, 2).map((s, idx) => `${idx + 1}. ${s}`).join('; ')}
(Sent via MediClarify Patient Portal)`;

    let responseStatus = 'simulated';
    let networkDetails = null;

    // If a live webhook URL is provided, send the real HTTP POST with a 5000ms timeout
    if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.startsWith('http')) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-MediClarify-Source': 'MediClarify-App'
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          const errDetail = `HTTP ${res.status}: ${res.statusText}`;
          console.error('[Caregiver Alert] Webhook dispatch returned error status:', errDetail);
          return {
            success: false,
            status: 'webhook_http_error',
            error: errDetail,
            message: 'Caregiver alert failed to send, but report processing is complete',
            payload,
            whatsappText
          };
        }

        responseStatus = 'delivered_live';
        networkDetails = {
          httpStatus: res.status,
          statusText: res.statusText
        };
      } catch (netErr) {
        clearTimeout(timeoutId);
        const isTimeout = netErr.name === 'AbortError';
        console.error(`[Caregiver Alert] Webhook delivery failed (${isTimeout ? 'Timeout' : 'Network/CORS'}):`, netErr);
        
        return {
          success: false,
          status: isTimeout ? 'webhook_timeout' : 'webhook_network_error',
          error: netErr.message || 'Network error',
          message: 'Caregiver alert failed to send, but report processing is complete',
          payload,
          whatsappText,
          whatsappUrl: `https://wa.me/${(caregiverPhone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappText)}`
        };
      }
    }

    // Return successful dispatch result (live delivery or simulated)
    return {
      success: true,
      status: responseStatus,
      timestamp: new Date().toLocaleTimeString(),
      payload,
      whatsappText,
      whatsappUrl: `https://wa.me/${(caregiverPhone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappText)}`,
      smsText,
      networkDetails
    };
  } catch (fatalErr) {
    console.error('[Caregiver Alert] Unexpected safe error boundary triggered:', fatalErr);
    return {
      success: false,
      error: fatalErr?.message || 'Unexpected error',
      message: 'Caregiver alert failed to send, but report processing is complete'
    };
  }
}
