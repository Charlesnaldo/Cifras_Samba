'use client';

import { Play } from 'lucide-react';

export default function Hero3D() {
  return (
    <section className="relative w-full h-[85vh] md:h-screen flex items-center overflow-hidden bg-zinc-950">
      
      {/* Imagem de Fundo com Tratamento Escurecido */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/hero/hero.jpg")', // Ajuste a extensão se for .png ou .webp
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay Gradiente para dar o tom escurecido e profundidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950" />
        <div className="absolute inset-0 bg-black/40" /> {/* Escurecimento extra */}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">
              O Maior Acervo de Samba
            </span>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl md:text-8xl font-bold text-white uppercase italic  leading-[0.85] max-w-5xl drop-shadow-2xl">
            Toque o melhor <br />
            <span className="font-serif italic text-emerald-500 font-light lowercase">do Samba & Pagode</span>
          </h1>

          <p className="max-w-xl text-zinc-300 text-sm md:text-base leading-relaxed font-medium drop-shadow-md">
            Cifras precisas, dicionário de acordes e ferramentas exclusivas para elevar o seu nível no samba.
          </p>

          {/* Botão de Ação */}
          <button className="group relative flex items-center gap-4 bg-emerald-500 hover:bg-emerald-400 text-black px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(16,185,129,0.3)]">
            <div className="bg-black/10 p-1 rounded-full">
               <Play size={14} fill="currentColor" />
            </div>
            Começar a tocar
          </button>
        </div>
      </div>

      {/* Vinheta nas bordas para focar no centro */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </section>
  );
}