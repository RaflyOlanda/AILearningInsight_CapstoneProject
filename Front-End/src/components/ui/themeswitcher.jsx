import React, { useEffect, useRef, useState } from 'react';
import { FaPalette, FaTimes } from 'react-icons/fa';
import { useTheme } from '../../context/themecontext';
import { THEMES } from '../../lib/themes';

export default function ThemeSwitcher({ position = 'static', top = '', right = '' }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const THEME_OPTIONS = THEMES.map(t => ({
    key: t.id,
    label: t.label,
    desc: t.description,
    swatch: t.swatch,
  }));

  return (
    <div className={`${position} ${top} ${right}`}>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl shadow-soft border border-border bg-card text-foreground hover:bg-muted cursor-pointer"
        title="Theme"
      >
        <FaPalette />
        <span className="hidden sm:inline text-sm">Edit Theme</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
          style={{backdropFilter: 'blur(6px)'}} // efek blur lebih nyata seperti badge
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-card text-card-foreground rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="text-lg font-bold">Pilih Tema</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition">
                <FaTimes size={18} />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {THEME_OPTIONS.map((opt) => (
                <div
                  key={opt.key}
                  role="button"
                  onClick={() => { setTheme(opt.key); setOpen(false); }}
                  className={`group p-3 rounded-lg transition duration-150 border flex items-center gap-3 ${
                    theme === opt.key ? 'border-primary bg-muted' : 'border-border hover:bg-muted'
                  }`}
                >
                  <div className="flex flex-col grow">
                    <span className="font-semibold">{opt.label}</span>
                    <span className="text-xs text-muted-foreground">{opt.desc}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {opt.swatch?.map((c, i) => (
                      <span key={i} className="inline-block w-3 h-3 rounded-sm" style={{ background: c }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border text-right">
              <button 
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
