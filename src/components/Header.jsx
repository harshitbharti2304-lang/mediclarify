import React, { useState, useRef, useEffect } from 'react';
import { Activity, Globe, ChevronDown, Check } from 'lucide-react';
import { UI_TRANSLATIONS, SUPPORTED_LANGUAGES, getTranslation } from '../data/translations';

export default function Header({ language, setLanguage }) {
  const t = getTranslation(language);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-4 py-3 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        {/* Logo & Headline */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-sm shadow-teal-600/30">
            <Activity className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-slate-900 leading-tight">
              {t.appTitle}
            </h1>
            <p className="text-[10px] font-semibold text-teal-700 tracking-wide uppercase">
              {t.clinicalBadge}
            </p>
          </div>
        </div>

        {/* Global Multi-Language Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            id="global-language-selector-btn"
            onClick={() => setIsOpen(prev => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/90 text-slate-800 text-xs font-bold rounded-xl border border-slate-200/80 shadow-2xs transition cursor-pointer select-none"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            title={t.selectLanguage}
          >
            <Globe className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-sm leading-none mr-0.5">{currentLangObj.flag}</span>
            <span className="font-semibold text-slate-800">{currentLangObj.native}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu Modal */}
          {isOpen && (
            <div
              className="absolute right-0 mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
              role="listbox"
            >
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                {t.selectLanguage}
              </div>
              {SUPPORTED_LANGUAGES.map((item) => {
                const isSelected = language === item.code;
                return (
                  <button
                    key={item.code}
                    id={`lang-option-${item.code}`}
                    type="button"
                    onClick={() => handleSelectLanguage(item.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs transition cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50 text-teal-900 font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base leading-none">{item.flag}</span>
                      <span>{item.native}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({item.label})</span>
                    </div>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-teal-600" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
