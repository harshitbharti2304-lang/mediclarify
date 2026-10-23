import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  MessageCircle, 
  Smartphone, 
  BellRing, 
  AlertCircle 
} from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function CaregiverModal({ isOpen, onClose, report, language }) {
  if (!isOpen || !report) return null;

  const t = getTranslation(language);
  const [phone, setPhone] = useState(() => {
    try {
      return localStorage.getItem('mediclarify_caregiver_phone') || '+91 98765 43210';
    } catch (e) {
      return '+91 98765 43210';
    }
  });

  const [caregiverName, setCaregiverName] = useState(() => {
    try {
      return localStorage.getItem('mediclarify_caregiver_name') || 'Pooja (Daughter / Caregiver)';
    } catch (e) {
      return 'Pooja (Daughter / Caregiver)';
    }
  });

  const [activeTab, setActiveTab] = useState('whatsapp'); // 'whatsapp' | 'sms'
  const [sendResult, setSendResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Safe metrics & patient overview data with full null-guards
  const abnormalMetrics = (report?.keyMetrics || []).filter(m => m && m.status !== 'normal');
  const summaryBullet = 
    report?.simplifiedSummary?.[language]?.[0] || 
    report?.simplifiedSummary?.en?.[0] || 
    'Report analysis completed.';

  const patientName = report?.patient?.name || 'Patient';
  const patientDate = report?.patient?.date || 'Recent';
  const badgeLabel = 
    report?.statusOverview?.badgeText?.[language] || 
    report?.statusOverview?.badgeText?.en || 
    'Reviewed';

  // Formatted WhatsApp markdown message
  const previewWhatsAppText = `🏥 *MediClarify Health Update for ${patientName}*
📅 *Date:* ${patientDate}
🩺 *Report:* ${report?.title || 'Diagnostic Report'}

*Status:* ${badgeLabel}

⚠️ *Key Parameters Needing Attention:*
${abnormalMetrics.length > 0 
  ? abnormalMetrics.map(m => `• *${m?.name || 'Parameter'}:* ${m?.displayValue || 'Observed'} _(Normal: ${m?.normalRange || 'Standard'})_`).join('\n') 
  : '• All checked markers are within normal limits!'}

💡 *Doctor's Plain-Language Summary:*
"${summaryBullet}"

📋 *Recommended Next Steps:*
${(report?.actionableSteps?.[language] || report?.actionableSteps?.en || []).slice(0, 3).map((s, idx) => `${idx + 1}. ${s.title}`).join('\n')}

_Sent via MediClarify Patient Care System_`;

  // Formatted clean text suitable for native SMS
  const previewSmsText = `MediClarify Health Update for ${patientName} (${patientDate}):
Report: ${report?.title || 'Diagnostic Report'}
Status: ${badgeLabel}
${abnormalMetrics.length > 0 ? `Key Markers: ${abnormalMetrics.map(m => `${m.name}: ${m.displayValue} (Ref: ${m.normalRange})`).join(', ')}` : 'All tested markers are within normal reference ranges.'}
Doctor's Summary: "${summaryBullet}"
Recommended: ${(report?.actionableSteps?.[language] || report?.actionableSteps?.en || []).slice(0, 2).map((s, idx) => `${idx + 1}. ${s.title}`).join('; ')}
(Sent via MediClarify Patient Portal)`;

  const cleanPhone = (phone || '').replace(/[^0-9+]/g, '');
  const whatsAppUrl = `https://wa.me/${cleanPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(previewWhatsAppText)}`;

  const handleCopyText = (text) => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  };

  const saveCaregiverPreferences = () => {
    try {
      localStorage.setItem('mediclarify_caregiver_phone', phone);
      localStorage.setItem('mediclarify_caregiver_name', caregiverName);
    } catch (e) {}
  };

  const handleOpenWhatsApp = () => {
    saveCaregiverPreferences();
    setSendResult({
      success: true,
      channel: 'WhatsApp',
      timestamp: new Date().toLocaleTimeString(),
      message: `WhatsApp message prepared for ${phone}. Launching WhatsApp...`
    });
  };

  // Direct native SMS trigger with cross-platform URI schemes
  const handleSendSMS = () => {
    saveCaregiverPreferences();
    
    const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const smsUrl = isIOS 
      ? `sms:${cleanPhone}&body=${encodeURIComponent(previewSmsText)}` 
      : `sms:${cleanPhone}?body=${encodeURIComponent(previewSmsText)}`;

    setSendResult({
      success: true,
      channel: 'SMS',
      timestamp: new Date().toLocaleTimeString(),
      message: `SMS message populated for ${phone}. Opening native messaging app...`
    });

    try {
      window.location.href = smsUrl;
    } catch (err) {
      console.warn('[Caregiver SMS] URI dispatch error caught safely:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* 1. Clean Production-Ready Modal Header (No n8n badges/subtitles) */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center shrink-0">
              <BellRing className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                Caregiver Alert Center
              </h3>
              <p className="text-[11px] text-teal-200/80 mt-0.5">
                Send direct multi-channel patient updates to family caregivers
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-teal-200 hover:text-white p-1 rounded-lg transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Target Caregiver Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Caregiver Name
              </label>
              <input
                type="text"
                value={caregiverName}
                onChange={(e) => setCaregiverName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-medium"
                placeholder="e.g. Daughter / Spouse"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp / SMS Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-medium font-mono"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          {/* Preview Navigation Tabs (WhatsApp vs Direct SMS) */}
          <div>
            <div className="flex border-b border-slate-200 mb-3">
              <button
                type="button"
                onClick={() => setActiveTab('whatsapp')}
                className={`flex items-center gap-1.5 pb-2 px-3 text-xs font-bold border-b-2 transition cursor-pointer ${
                  activeTab === 'whatsapp'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Message Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sms')}
                className={`flex items-center gap-1.5 pb-2 px-3 text-xs font-bold border-b-2 transition cursor-pointer ${
                  activeTab === 'sms'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-teal-600" />
                <span>SMS Text Message Preview</span>
              </button>
            </div>

            {/* WhatsApp Tab Content */}
            {activeTab === 'whatsapp' && (
              <div className="bg-[#e5ddd5] p-3.5 rounded-xl border border-slate-300 relative">
                <button
                  type="button"
                  onClick={() => handleCopyText(previewWhatsAppText)}
                  className="absolute top-2.5 right-2.5 p-1 px-2 rounded-md bg-white/90 hover:bg-white text-slate-700 text-[10px] font-bold flex items-center gap-1 border border-slate-300 shadow-2xs cursor-pointer z-10"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <div className="max-w-md bg-white rounded-xl shadow-2xs p-3 text-xs text-slate-800 space-y-1 relative leading-relaxed font-sans">
                  <div className="whitespace-pre-line text-[11px]">
                    {previewWhatsAppText}
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 mt-1">
                    <span>Just now</span>
                    <span className="text-teal-500 font-bold">✓✓</span>
                  </div>
                </div>
              </div>
            )}

            {/* SMS Tab Content */}
            {activeTab === 'sms' && (
              <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-300 relative">
                <button
                  type="button"
                  onClick={() => handleCopyText(previewSmsText)}
                  className="absolute top-2.5 right-2.5 p-1 px-2 rounded-md bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold flex items-center gap-1 border border-slate-300 shadow-2xs cursor-pointer z-10"
                >
                  {copied ? <Check className="w-3 h-3 text-teal-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <div className="max-w-md bg-white rounded-xl shadow-2xs p-3.5 border border-slate-200 text-xs text-slate-800 space-y-1.5 leading-relaxed font-sans">
                  <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100 text-[10px] font-bold text-slate-500">
                    <Smartphone className="w-3 h-3 text-teal-600" />
                    <span>Direct SMS Text to {phone}</span>
                  </div>
                  <div className="whitespace-pre-line text-[11px] text-slate-700">
                    {previewSmsText}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Feedback Status Alert */}
          {sendResult && (
            <div className="p-3 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-900 flex items-start gap-2.5 text-xs animate-in fade-in duration-150">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-[11px]">
                <strong className="font-bold block text-xs">
                  {sendResult.channel} Alert Ready!
                </strong>
                <p className="mt-0.5">
                  {sendResult.message}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls with Direct WhatsApp & Direct SMS Actions */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Direct WhatsApp Action Button */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleOpenWhatsApp}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-xs transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send WhatsApp Alert</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
            </a>

            {/* Direct Native SMS Action Button */}
            <button
              type="button"
              id="btn-send-direct-sms"
              onClick={handleSendSMS}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-xs shadow-xs transition cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Send SMS Alert</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
