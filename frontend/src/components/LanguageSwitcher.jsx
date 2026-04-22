import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'vi', flag: '🇻🇳', label: 'VI' },
  { code: 'en', flag: '🇺🇸', label: 'EN' },
  { code: 'ja', flag: '🇯🇵', label: 'JP' },
  { code: 'ko', flag: '🇰🇷', label: 'KR' },
  { code: 'zh', flag: '🇨🇳', label: 'CN' },
];

export default function LanguageSwitcher({ mobile = false }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = LANGS.find(l => l.code === i18n.language) || LANGS[0];

  const change = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('anna_spa_lang', code);
    setOpen(false);
  };

  if (mobile) {
    return (
      <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-dark-800">
        {LANGS.map(l => (
          <button
            key={l.code}
            onClick={() => change(l.code)}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-inter tracking-wider border transition-all
              ${i18n.language === l.code
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-dark-700 text-dark-400 hover:border-gold/50 hover:text-gold'}`}
          >
            <span>{l.flag}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-dark-700 text-dark-300 hover:border-gold hover:text-gold transition-all text-xs font-inter tracking-wider"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span className="text-[8px] opacity-60">▼</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 bg-dark-900 border border-dark-700 shadow-xl shadow-black/50 min-w-[100px]">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => change(l.code)}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-inter tracking-wider transition-colors
                  ${i18n.language === l.code
                    ? 'text-gold bg-gold/10'
                    : 'text-dark-300 hover:text-gold hover:bg-dark-800'}`}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
