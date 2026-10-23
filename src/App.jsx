import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultsPanel from './components/ResultsPanel';
import CaregiverModal from './components/CaregiverModal';
import ErrorBoundary from './components/ErrorBoundary';
import Toast from './components/Toast';
import { parseMedicalReport } from './services/geminiService';
import { notifyCaregiverSafely } from './services/caregiverService';
import { getTranslation } from './data/translations';
import { 
  Wifi, 
  BatteryMedium
} from 'lucide-react';

export default function App() {
  const [selectedReport, setSelectedReport] = useState(() => {
    try {
      const saved = sessionStorage.getItem('mediclarify_saved_report');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Global Language State persisted in localStorage
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('mediclarify_lang') || 'en';
    } catch (e) {
      return 'en';
    }
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState({ status: 'idle', progress: 0, message: '' });
  const [activeTab, setActiveTab] = useState(() => selectedReport ? 'report' : 'scan');

  // Caregiver Notification State & Non-blocking Toast Alerts
  const [isCaregiverOpen, setIsCaregiverOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const t = getTranslation(language);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('mediclarify_lang', newLang);
    } catch (e) {}
  };

  const setAndSaveReport = (report) => {
    setSelectedReport(report);
    try {
      if (report) {
        sessionStorage.setItem('mediclarify_saved_report', JSON.stringify(report));
      } else {
        sessionStorage.removeItem('mediclarify_saved_report');
      }
    } catch (e) {}
  };

  const handleFileUpload = async (file, fileDataUrl) => {
    setIsProcessing(true);
    setOcrProgress({ status: 'starting', progress: 10, message: t.analyzingDoc });
    try {
      const parsed = await parseMedicalReport({
        file,
        fileDataUrl,
        preferredLanguage: language,
        onOcrProgress: (prog) => setOcrProgress(prog)
      });
      setAndSaveReport(parsed);
      setActiveTab('report');

      // Modular, isolated background auto-message dispatch
      // Wrapped in safe guardrails - never blocks UI or report completion
      notifyCaregiverSafely({
        report: parsed,
        language,
        isAuto: true
      }).then((alertRes) => {
        if (!alertRes.success) {
          console.warn('[Caregiver Auto-Message] Non-blocking dispatch notice:', alertRes.error);
          setToast({
            message: 'Caregiver alert failed to send, but report processing is complete',
            type: 'error'
          });
        }
      }).catch((bgErr) => {
        console.error('[Caregiver Auto-Message] Caught in safe boundary:', bgErr);
        setToast({
          message: 'Caregiver alert failed to send, but report processing is complete',
          type: 'error'
        });
      });

    } catch (err) {
      console.error('File parsing error:', err);
    } finally {
      setIsProcessing(false);
      setOcrProgress({ status: 'idle', progress: 0, message: '' });
    }
  };

  const handleReset = () => {
    setAndSaveReport(null);
    setActiveTab('scan');
  };

  return (
    <div className="min-h-screen bg-slate-900 sm:py-6 flex items-center justify-center p-0 selection:bg-teal-500 selection:text-white">
      
      {/* Non-Blocking Toast Alerts */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Phone Screen Mockup Container with Mobile Aspect Ratio */}
      <div className="w-full max-w-[430px] min-h-screen sm:min-h-[860px] sm:max-h-[92vh] bg-slate-50 sm:rounded-[44px] sm:shadow-2xl sm:shadow-teal-950/50 border-slate-300 sm:border-[8px] sm:border-slate-800 relative flex flex-col overflow-hidden">
        
        {/* Dynamic Island / Top Speaker on Desktop preview */}
        <div className="hidden sm:flex justify-center pt-2 pb-1 bg-white z-40">
          <div className="w-24 h-3.5 bg-slate-900 rounded-full flex items-center justify-end pr-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          </div>
        </div>

        {/* Mobile Status Bar */}
        <div className="flex items-center justify-between px-5 py-1.5 bg-white text-slate-800 text-[11px] font-bold border-b border-slate-100 z-30 select-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-slate-700" />
            <BatteryMedium className="w-4 h-4 text-emerald-600" />
          </div>
        </div>

        {/* App Header with Brand & Global Language Selector Dropdown */}
        <Header
          language={language}
          setLanguage={handleLanguageChange}
        />

        {/* Scrollable Mobile App Body */}
        <main className="flex-1 overflow-y-auto px-3.5 py-3.5 space-y-3.5 pb-6">
          
          {/* Section 1: Clean Input & Camera Upload with Safe Fallback */}
          <div id="section-scan">
            <InputSection
              selectedReport={selectedReport}
              onFileUpload={handleFileUpload}
              isProcessing={isProcessing}
              ocrProgress={ocrProgress}
              language={language}
            />
          </div>

          {/* Section 2: Results Display Panel with Audio, Summary, & Metrics */}
          {selectedReport && (
            <div id="section-report" className="animate-fade-in">
              <ResultsPanel
                report={selectedReport}
                language={language}
                onReset={handleReset}
                onOpenCaregiver={() => setIsCaregiverOpen(true)}
              />
            </div>
          )}

        </main>

      </div>

      {/* Isolated Caregiver Notification Modal wrapped in Error Boundary */}
      <ErrorBoundary>
        <CaregiverModal
          isOpen={isCaregiverOpen}
          onClose={() => setIsCaregiverOpen(false)}
          report={selectedReport}
          language={language}
        />
      </ErrorBoundary>

    </div>
  );
}
