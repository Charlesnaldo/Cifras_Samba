'use client';

import { Music2, Play } from 'lucide-react';

export default function Hero3D() {
  return (
    <section className="relative w-full bg-zinc-950 pt-10 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em]">
              O Maior Acervo de Samba
            </span>
          </div>

          {/* Título Principal Padronizado */}
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.85] max-w-4xl">
            Toque o melhor <br />
            <span className="font-serif italic text-emerald-500 font-light lowercase">do Samba & Pagode</span>
          </h1>

          <p className="max-w-xl text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
            Cifras precisas, dicionário de acordes e ferramentas exclusivas para elevar o seu nível no samba.
          </p>

          {/* Botão de Ação */}
          <button className="group relative flex items-center gap-3 bg-emerald-500 text-black px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <Play size={16} fill="currentColor" />
            Começar a tocar
          </button>
        </div>
      </div>

      {/* Background Decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />
    </section>
  );
}