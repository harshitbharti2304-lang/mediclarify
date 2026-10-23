import React, { useState } from 'react';
import {
  FileText,
  Pill,
  Volume2,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Maximize2,
  FileCheck
} from 'lucide-react';
import { speechService } from '../services/speechService';
import { getTranslation } from '../data/translations';
import {
  translateTiming,
  translateDosage,
  translateDuration,
  translateFollowUp,
  translateImpression
} from '../services/localizationHelper';

export default function OriginalDocumentCard({ report, language }) {
  const t = getTranslation(language);
  const [isPlayingRx, setIsPlayingRx] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [showRawLines, setShowRawLines] = useState(false);

  if (!report?.originalCard) return null;

  const card = report.originalCard;
  const prescriptions = card.prescriptions || [];
  const hasPrescriptions = prescriptions.length > 0;
  const hasExtractedLines = report.extractedLines && report.extractedLines.length > 0;
  const hasAbnormals = report.keyMetrics && report.keyMetrics.some(m => m.status !== 'normal');

  const doctorImpressionText = translateImpression(card.doctorClinicalImpression, language, hasAbnormals);
  const followUpAdviceText = translateFollowUp(card.doctorFollowUp, language);

  const handleReadRxAloud = () => {
    if (!hasPrescriptions) return;

    let textToSpeak = '';
    if (language === 'hi') {
      textToSpeak = `डॉक्टर का पर्चा: ${prescriptions.map(p => `${p.medication}, ${translateDosage(p.dosage, 'hi')}, ${translateTiming(p.timing, 'hi')}`).join('. ')}। ${followUpAdviceText}`;
    } else if (language === 'pa') {
      textToSpeak = `ਡਾਕਟਰ ਦਾ ਪਰਚਾ: ${prescriptions.map(p => `${p.medication}, ${translateDosage(p.dosage, 'pa')}, ${translateTiming(p.timing, 'pa')}`).join('. ')}। ${followUpAdviceText}`;
    } else if (language === 'bn') {
      textToSpeak = `ডাক্তারের প্রেসক্রিপশন: ${prescriptions.map(p => `${p.medication}, ${translateDosage(p.dosage, 'bn')}, ${translateTiming(p.timing, 'bn')}`).join('. ')}। ${followUpAdviceText}`;
    } else if (language === 'mr') {
      textToSpeak = `डॉक्टरांचे प्रिस्क्रिप्शन: ${prescriptions.map(p => `${p.medication}, ${translateDosage(p.dosage, 'mr')}, ${translateTiming(p.timing, 'mr')}`).join('. ')}। ${followUpAdviceText}`;
    } else if (language === 'es') {
      textToSpeak = `Receta médica: ${prescriptions.map(p => `${p.medication}, ${translateDosage(p.dosage, 'es')}, ${translateTiming(p.timing, 'es')}`).join('. ')}. ${followUpAdviceText}`;
    } else {
      textToSpeak = card.handwrittenRxAudioScript?.[language] ||
        `Doctor's prescription: ${prescriptions.map(p => `${p.medication}, ${p.dosage}, ${p.timing}`).join('. ')}. ${card.doctorFollowUp || ''}`;
    }

    speechService.stop();
    speechService.speak({
      text: textToSpeak,
      lang: language
    });
    setIsPlayingRx(true);
    setTimeout(() => setIsPlayingRx(false), 7000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white p-3.5 border-b border-slate-700">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="px-1.5 py-0.5 rounded-sm bg-teal-500/20 text-teal-300 font-mono text-[9px] font-bold border border-teal-500/30">
                {t.clinicalCard}
              </span>
              <span className="text-slate-400 text-[10px] font-mono truncate max-w-[150px]">
                {card.specimenId}
              </span>
            </div>
            <h3 className="text-sm font-bold tracking-tight text-white truncate">
              {card.labName}
            </h3>
            <p className="text-[10px] text-slate-400 truncate">
              {card.labAddress}
            </p>
          </div>

          {/* Timestamp Badge */}
          <div className="text-right shrink-0">
            <span className="text-[10px] font-mono text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800 block">
              {card.reportTime}
            </span>
            <span className="text-[9px] text-slate-400 mt-0.5 block">
              {card.sampleQuality}
            </span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-3.5 space-y-3">
        
        {/* Uploaded Photograph Preview with Ground Truth Badge */}
        {report.uploadedImageUrl && (
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
            <div className="px-3 py-2 bg-slate-100 flex items-center justify-between text-xs border-b border-slate-200">
              <span className="font-bold text-slate-700 flex items-center gap-1.5 text-[11px]">
                <Eye className="w-3.5 h-3.5 text-teal-600" />
                <span>{t.inputPhotograph}</span>
              </span>
              <button
                type="button"
                onClick={() => setShowFullImage(!showFullImage)}
                className="text-[10px] font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" />
                <span>{showFullImage ? t.hidePhoto : t.viewPhoto}</span>
              </button>
            </div>

            {showFullImage && (
              <div className="p-2 bg-black/90 flex justify-center max-h-72 overflow-auto">
                <img
                  src={report.uploadedImageUrl}
                  alt="Uploaded Prescription"
                  className="max-h-64 rounded object-contain shadow-md"
                />
              </div>
            )}

            <div className="px-3 py-1.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold flex items-center gap-1.5 border-t border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.groundedTruthBadge}</span>
            </div>
          </div>
        )}

        {/* Doctor Impression Note */}
        {doctorImpressionText && (
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs">
            <span className="font-bold text-slate-800 block mb-0.5 text-[11px]">
              {t.doctorImpression}:
            </span>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              {doctorImpressionText}
            </p>
          </div>
        )}

        {/* Doctor's Handwritten Prescription Pad */}
        {hasPrescriptions ? (
          <div className="rounded-xl p-3 bg-gradient-to-br from-amber-50/70 to-orange-50/40 border border-amber-200/80 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200/60">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-900 flex items-center justify-center font-serif font-bold text-xs italic">
                  ℞
                </div>
                <h4 className="text-xs font-bold text-slate-900">
                  {t.prescriptionPad}
                </h4>
              </div>

              {/* Read Prescription Aloud Button */}
              <button
                type="button"
                id="btn-read-rx-aloud"
                onClick={handleReadRxAloud}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                  isPlayingRx
                    ? 'bg-teal-600 text-white animate-pulse'
                    : 'bg-white border border-amber-300 text-amber-900 hover:bg-amber-100'
                }`}
                title={t.readPrescriptionAloud}
              >
                <Volume2 className="w-3 h-3" />
                <span>{isPlayingRx ? t.playingVoice : t.readPrescriptionAloud}</span>
              </button>
            </div>

            {/* Prescriptions List */}
            <div className="mt-2.5 space-y-2">
              {prescriptions.map((rx, idx) => {
                const dosageDisplay = translateDosage(rx.dosage, language);
                const timingDisplay = translateTiming(rx.timing, language);
                const durationDisplay = translateDuration(rx.duration, language);

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-2.5 border border-amber-100 shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        <Pill className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{rx.medication}</span>
                      </span>
                      <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60 shrink-0">
                        {dosageDisplay}
                      </span>
                    </div>

                    <div className="mt-1.5 text-[11px] text-slate-600 space-y-1">
                      <div>
                        <span className="font-semibold text-slate-500">{t.timing}: </span>
                        <span className="text-slate-800 font-medium">{timingDisplay}</span>
                      </div>
                      {durationDisplay && (
                        <div>
                          <span className="font-semibold text-slate-500">{t.duration}: </span>
                          <span className="text-slate-800 font-medium">{durationDisplay}</span>
                        </div>
                      )}
                      {rx.instructions && language === 'en' && (
                        <p className="text-[10px] text-amber-900 bg-amber-50/70 p-1.5 rounded mt-1 italic">
                          "{rx.instructions}"
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Doctor Follow-Up Note */}
            <div className="mt-2.5 pt-2 border-t border-amber-200/50 text-[11px] text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <span className="font-bold text-slate-800">{t.followUpAdvice}: </span>
                <span className="text-slate-700">{followUpAdviceText}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold shrink-0">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{t.extractedFromDoc}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 rounded-xl p-2.5 text-center text-slate-500 text-xs">
            {t.noPrescription}
          </div>
        )}

        {/* Real Extracted Document Text Accordion (Ground Truth verification) */}
        {hasExtractedLines && (
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowRawLines(!showRawLines)}
              className="w-full flex items-center justify-between text-[11px] font-bold text-slate-600 hover:text-teal-700 py-1 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>{t.extractedTextTitle} ({report.extractedLines.length} lines)</span>
              </span>
              <span className="text-[10px] text-teal-600 underline">
                {showRawLines ? t.hide : t.show}
              </span>
            </button>

            {showRawLines && (
              <div className="mt-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-700 space-y-1 max-h-48 overflow-y-auto">
                {report.extractedLines.map((line, idx) => (
                  <div key={idx} className="truncate">
                    <span className="text-slate-400 select-none mr-2">{idx + 1}.</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
