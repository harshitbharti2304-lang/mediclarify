import React, { useState } from 'react';
import {
  Heart,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  FileText,
  MessageCircle
} from 'lucide-react';
import AudioPlayerBanner from './AudioPlayerBanner';
import OriginalDocumentCard from './OriginalDocumentCard';
import { speechService } from '../services/speechService';
import { getTranslation } from '../data/translations';
import { getLocalizedReportData } from '../services/localizationHelper';

export default function ResultsPanel({
  report,
  language,
  onReset,
  onOpenCaregiver
}) {
  const t = getTranslation(language);
  const [playingMetricId, setPlayingMetricId] = useState(null);

  if (!report) return null;

  const localizedData = getLocalizedReportData(report, language);
  const statusLevel = report.statusOverview?.level || 'attention';

  const badgeText = localizedData.badgeText;
  const doctorReassurance = localizedData.doctorReassurance;
  const summaryBullets = localizedData.summaryBullets;
  const actionableSteps = localizedData.actionableSteps;
  const keyMetrics = localizedData.keyMetrics;

  // Play individual metric explanation aloud strictly in selected language
  const handlePlayMetricAudio = (metric) => {
    speechService.stop();
    const textToSpeak = metric.spokenCardText ||
      `${metric.displayName}. ${metric.explanationText || ''}`;

    speechService.speak({
      text: textToSpeak,
      lang: language
    });
    setPlayingMetricId(metric.id);
    setTimeout(() => setPlayingMetricId(null), 5000);
  };

  return (
    <div className="space-y-4">

      {/* Patient & Status Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60 uppercase">
              {t.healthOverview}
            </span>
            <h3 className="text-sm font-extrabold text-slate-900 mt-1 truncate">
              {report.patient?.name || 'Verified Patient'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {report.patient?.age ? `${t.age}: ${report.patient.age} • ` : ''}
              {report.patient?.physician || report.patient?.doctor || 'Clinical Care'}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
              statusLevel === 'normal'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-amber-50 text-amber-800 border-amber-300'
            }`}>
              {statusLevel === 'normal' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              )}
              <span>{badgeText}</span>
            </span>
            {report.patient?.date && (
              <p className="text-[10px] text-slate-400 mt-1">
                {report.patient.date}
              </p>
            )}
          </div>
        </div>

        {/* Doctor Reassurance Message */}
        {doctorReassurance && (
          <div className="mt-3 p-3 bg-teal-50/80 rounded-xl border border-teal-200/70 text-xs text-teal-950 font-medium leading-relaxed flex items-start gap-2">
            <Heart className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>{doctorReassurance}</span>
          </div>
        )}

        {/* Simplified Bullet Summary */}
        {summaryBullets.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {summaryBullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-1.5" />
                <span className="leading-snug">{bullet}</span>
              </div>
            ))}
          </div>
        )}

        {/* Caregiver Alert Trigger Button */}
        {onOpenCaregiver && (
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Caregiver WhatsApp / SMS</span>
            </span>
            <button
              type="button"
              id="btn-trigger-caregiver-alert"
              onClick={onOpenCaregiver}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-300 text-xs font-bold transition cursor-pointer active:scale-95 shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.caregiverAlert || 'Notify Caregiver'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Voice AI Audio Player */}
      <AudioPlayerBanner report={report} language={language} />

      {/* Doctor Prescription Pad & Physical Lab Card */}
      <OriginalDocumentCard report={report} language={language} />

      {/* Key Metrics Cards / Table */}
      {keyMetrics.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>{t.keyMetricsTitle}</span>
              <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                {keyMetrics.length}
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {t.keyMetricsSub}
            </p>
          </div>

          <div className="mt-3 space-y-2">
            {keyMetrics.map((metric) => {
              const isAbnormal = metric.status !== 'normal';
              const isPlayingThis = playingMetricId === metric.id;

              return (
                <div
                  key={metric.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isAbnormal
                      ? 'bg-amber-50/50 border-amber-200/90'
                      : 'bg-slate-50/70 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {metric.displayName}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          metric.status === 'low'
                            ? 'bg-rose-100 text-rose-800'
                            : metric.status === 'high'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {metric.badgeLabel}
                        </span>
                      </div>

                      <div className="mt-1 flex items-baseline gap-2 text-xs">
                        <span className="font-extrabold text-slate-900">
                          {metric.displayValue}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          ({t.normalRange}: {metric.normalRange})
                        </span>
                      </div>
                    </div>

                    {/* Listen Audio Button */}
                    <button
                      type="button"
                      onClick={() => handlePlayMetricAudio(metric)}
                      className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition cursor-pointer shrink-0 ${
                        isPlayingThis
                          ? 'bg-teal-600 text-white animate-pulse'
                          : 'bg-white border border-slate-200 text-teal-700 hover:bg-teal-50'
                      }`}
                      title={t.listenParam}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {metric.explanationText && (
                    <p className="mt-1.5 text-[11px] text-slate-600 leading-relaxed border-t border-slate-200/50 pt-1">
                      {metric.explanationText}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-center">
          <FileText className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
          <p className="text-xs font-semibold text-slate-700">
            {t.noMetricsDetected}
          </p>
        </div>
      )}

      {/* Actionable Next Steps */}
      {actionableSteps.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>{t.actionableTitle}</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {t.actionableSub}
            </p>
          </div>

          <div className="mt-3 space-y-2">
            {actionableSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5"
              >
                <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reset / Scan Another Document Button */}
      {onReset && (
        <div className="pt-2 pb-6 flex justify-center">
          <button
            type="button"
            id="btn-scan-another"
            onClick={onReset}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t.scanAnother}</span>
          </button>
        </div>
      )}

    </div>
  );
}
