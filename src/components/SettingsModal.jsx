import React, { useState } from 'react';
import { X, Key, Sparkles, Volume2, Webhook, Check, Shield } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [geminiKey, setGeminiKey] = useState(
    localStorage.getItem('mediclarify_gemini_key') || ''
  );
  const [elevenLabsKey, setElevenLabsKey] = useState(
    localStorage.getItem('mediclarify_elevenlabs_key') || ''
  );
  const [voiceId, setVoiceId] = useState(
    localStorage.getItem('mediclarify_voice_id') || '21m00Tcm4TlvDq8ikWAM'
  );
  const [n8nWebhook, setN8nWebhook] = useState(
    localStorage.getItem('mediclarify_n8n_webhook') || ''
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (geminiKey) localStorage.setItem('mediclarify_gemini_key', geminiKey.trim());
    else localStorage.removeItem('mediclarify_gemini_key');

    if (elevenLabsKey) localStorage.setItem('mediclarify_elevenlabs_key', elevenLabsKey.trim());
    else localStorage.removeItem('mediclarify_elevenlabs_key');

    if (voiceId) localStorage.setItem('mediclarify_voice_id', voiceId.trim());

    if (n8nWebhook) localStorage.setItem('mediclarify_n8n_webhook', n8nWebhook.trim());
    else localStorage.removeItem('mediclarify_n8n_webhook');

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">API & Workflow Integrations</h3>
              <p className="text-xs text-slate-400">Optional live API keys & webhook configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          
          <div className="p-3 bg-teal-50 border border-teal-200/60 rounded-xl text-xs text-teal-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <strong>Instant Mock Mode is Active by Default!</strong>
              <p className="mt-0.5 text-teal-800">
                You can test every feature immediately without entering API keys. Adding keys enables live external cloud services.
              </p>
            </div>
          </div>

          {/* Gemini API Key */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-teal-600" />
              Google Gemini API Key (Multimodal Vision)
            </label>
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Used when uploading custom PDFs/images. If empty, uses the built-in clinical mock engine.
            </p>
          </div>

          {/* ElevenLabs API Key */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-teal-600" />
              ElevenLabs Voice AI Key (Optional)
            </label>
            <input
              type="password"
              value={elevenLabsKey}
              onChange={(e) => setElevenLabsKey(e.target.value)}
              placeholder="xi-..."
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              If empty, the browser's high-speed Web Speech API powers speech synthesis with zero setup.
            </p>
          </div>

          {/* n8n Webhook URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Webhook className="w-3.5 h-3.5 text-teal-600" />
              n8n Webhook URL (Caregiver Notification Pipeline)
            </label>
            <input
              type="url"
              value={n8nWebhook}
              onChange={(e) => setN8nWebhook(e.target.value)}
              placeholder="https://your-n8n-instance.com/webhook/..."
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono text-xs"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Target endpoint for Caregiver WhatsApp/SMS automation pipeline.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setGeminiKey('');
                setElevenLabsKey('');
                setN8nWebhook('');
                localStorage.clear();
              }}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
            >
              Reset to Pure Mock
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-xs flex items-center gap-1.5"
              >
                {saved ? <Check className="w-4 h-4" /> : null}
                <span>{saved ? 'Saved!' : 'Save Settings'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
