import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose, duration = 5000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isError = type === 'error' || message.includes('failed') || message.includes('complete');

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 w-[90%] max-w-[390px] z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className={`p-3 rounded-2xl shadow-xl border flex items-start gap-2.5 backdrop-blur-md ${
        isError 
          ? 'bg-slate-900/95 text-white border-amber-500/40' 
          : 'bg-emerald-950/95 text-white border-emerald-500/40'
      }`}>
        {isError ? (
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        )}
        <div className="flex-1 text-[11px] leading-snug">
          <p className="font-semibold">{message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-white p-0.5 rounded transition cursor-pointer shrink-0"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
