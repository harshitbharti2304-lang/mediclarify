// Modular Caregiver Notification Background Service
// Isolated, fault-tolerant background dispatcher for n8n Webhook / WhatsApp / SMS alerts

import { sendCaregiverAlert } from './n8nService';

/**
 * Dispatch Caregiver Notification safely in the background.
 * Wrapped in try/catch and guarantees it will NEVER crash the caller or UI thread.
 */
export async function notifyCaregiverSafely({
  report,
  language = 'en',
  caregiverPhone = '',
  caregiverName = '',
  webhookUrl = '',
  isAuto = false
}) {
  if (!report) {
    return {
      success: false,
      message: 'Caregiver alert failed to send, but report processing is complete',
      error: 'No report data'
    };
  }

  try {
    const phone = caregiverPhone || localStorage.getItem('mediclarify_caregiver_phone') || '+91 98765 43210';
    const name = caregiverName || localStorage.getItem('mediclarify_caregiver_name') || 'Family Caregiver';
    const hook = webhookUrl || localStorage.getItem('mediclarify_n8n_webhook') || '';

    console.log(`[Caregiver Service] Triggering ${isAuto ? 'automated' : 'manual'} caregiver dispatch...`);

    const result = await sendCaregiverAlert({
      report,
      language,
      caregiverPhone: phone,
      caregiverName: name,
      webhookUrl: hook
    });

    if (!result.success) {
      console.warn('[Caregiver Service] Dispatch failed gracefully:', result.error);
      return {
        ...result,
        userToast: 'Caregiver alert failed to send, but report processing is complete'
      };
    }

    return {
      ...result,
      userToast: isAuto
        ? 'Caregiver notified automatically via n8n pipeline'
        : 'Caregiver alert sent successfully'
    };
  } catch (err) {
    console.error('[Caregiver Service] Unhandled error safely caught:', err);
    return {
      success: false,
      error: err?.message || 'Unknown network error',
      userToast: 'Caregiver alert failed to send, but report processing is complete',
      message: 'Caregiver alert failed to send, but report processing is complete'
    };
  }
}
