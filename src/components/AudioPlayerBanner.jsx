import React, { useState, useEffect } from 'react';
import { Volume2, Play, Pause, Square, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { speechService } from '../services/speechService';
import { getTranslation } from '../data/translations';
import { getLocalizedReportData } from '../services/localizationHelper';

export default function AudioPlayerBanner({ report, language }) {
  const t = getTranslation(language);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(0.95);
  const [showScript, setShowScript] = useState(false);

  useEffect(() => {
    const unsubscribe = speechService.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsPaused(state.isPaused);
    });
    return () => {
      unsubscribe();
      speechService.stop();
    };
  }, []);

  // Stop previous speech playback immediately whenever user changes language or report
  useEffect(() => {
    speechService.stop();
  }, [language, report?.id]);

  const localizedData = getLocalizedReportData(report, language);
  const currentScript = localizedData?.audioScript || report?.audioScript?.[language] || report?.audioScript?.en || '';

  const handlePlayToggle = () => {
    if (isPlaying) {
      if (isPaused) {
        speechService.resume();
      } else {
        speechService.pause();
      }
    } else {
      const elevenLabsKey = localStorage.getItem('mediclarify_elevenlabs_key') || '';
      const voiceId = localStorage.getItem('mediclarify_voice_id') || '21m00Tcm4TlvDq8ikWAM';
      
      speechService.speak({
        text: currentScript,
        lang: language,
        rate: rate,
        elevenLabsKey,
        voiceId
      });
    }
  };

  const handleStop = () => {
    speechService.stop();
  };

  const handleSpeedChange = (newRate) => {
    setRate(newRate);
    if (isPlaying && !isPaused) {
      speechService.stop();
      speechService.speak({
        text: currentScript,
        lang: language,
        rate: newRate
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white rounded-2xl shadow-md p-4 overflow-hidden relative border border-teal-700/40">
      <div className="flex items-center justify-between gap-3 relative z-10">
        
        {/* Left Icon & Text */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center shrink-0">
            <Volume2 className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>{t.voiceNarration}</span>
              {isPlaying && !isPaused && (
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </h3>
            <p className="text-[11px] text-teal-200/80">
              {isPlaying ? t.playingVoice : t.listenAudio}
            </p>
          </div>
        </div>

        {/* Waveform indicator */}
        <div className="h-7 px-2 bg-black/30 rounded-lg border border-teal-500/20 flex items-center gap-0.5 shrink-0">
          {[30, 70, 45, 90, 55, 80].map((h, idx) => (
            <span
              key={idx}
              className={`w-0.5 bg-teal-400 rounded-full transition-all duration-200 ${
                isPlaying && !isPaused ? 'wave-bar' : 'opacity-40'
              }`}
              style={{
                height: isPlaying && !isPaused ? undefined : `${h * 0.25}%`
              }}
            />
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="mt-3 pt-3 border-t border-teal-800/60 flex items-center justify-between gap-2">
        <button
          type="button"
          id="btn-play-audio-summary"
          onClick={handlePlayToggle}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm ${
            isPlaying && !isPaused
              ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
              : 'bg-teal-400 text-teal-950 hover:bg-teal-300'
          }`}
        >
          {isPlaying && !isPaused ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>{t.pauseAudio}</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{t.playAudio}</span>
            </>
          )}
        </button>

        {isPlaying && (
          <button
            type="button"
            id="btn-stop-audio-summary"
            onClick={handleStop}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition cursor-pointer"
            title={t.stopAudio}
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>
        )}

        {/* Speed Selector */}
        <div className="flex bg-black/40 p-0.5 rounded-lg border border-teal-500/20 text-[10px]">
          {[0.8, 1.0, 1.2].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSpeedChange(s)}
              className={`px-1.5 py-1 rounded transition cursor-pointer ${
                rate === s ? 'bg-teal-500 text-white font-bold' : 'text-teal-200/60 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Transcript Accordion */}
      <div className="mt-2 text-right">
        <button
          type="button"
          onClick={() => setShowScript(!showScript)}
          className="text-[10px] text-teal-300/80 hover:text-teal-100 inline-flex items-center gap-1 cursor-pointer"
        >
          <FileText className="w-3 h-3" />
          <span>{showScript ? t.hide : t.transcript}</span>
          {showScript ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {showScript && (
          <div className="mt-2 p-2.5 bg-black/50 rounded-xl border border-teal-500/20 text-[11px] text-teal-100 leading-relaxed text-left font-normal animate-in fade-in duration-200">
            "{currentScript}"
          </div>
        )}
      </div>
    </div>
  );
}
