'use client';

import { Play, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function Hero3D() {
  return (
    <section className="relative w-full h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950">

      {/* Imagem de Fundo (Fixa Dark Mode style por ter imagem) */}
      <div
        className="absolute inset-0 z-0 scale-105 animate-slow-zoom"
        style={{
          backgroundImage: 'url("/hero/hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay Limpo e Moderno */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-black/20" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-[95%] md:max-w-[90rem] mx-auto px-4">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 md:space-y-10 max-w-4xl">

          {/* Badge Minimalista */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-900 flex items-center justify-center">
                  <Star size={10} className="text-emerald-500 fill-emerald-500" />
                </div>
              ))}
            </div>
            <span className="text-[10px] font-bold text-zinc-300 tracking-wider uppercase">
              +1000 Cifras Simplificadas
            </span>
          </div>

          {/* Título Moderno e Impactante */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase italic tracking-tighter leading-[0.85] drop-shadow-2xl">
            Toque <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Samba</span> <br />
            <span className="font-serif font-thin text-white lowercase tracking-normal text-4xl sm:text-5xl md:text-7xl lg:text-8xl">sem complicação</span>
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
            <Link href="/musica/ta-escrito-revelacao" className="w-full md:w-auto group relative flex items-center justify-center gap-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-1 shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.4)]">
              <span>Começar Agora</span>
              <Play size={16} fill="currentColor" />
            </Link>

            <button onClick={() => {
              const resultsSection = document.getElementById('search-results') || document.body;
              resultsSection.scrollIntoView({ behavior: 'smooth' });
            }} className="w-full md:w-auto group flex items-center justify-center gap-2 px-8 py-5 rounded-2xl text-white font-bold text-sm hover:bg-white/5 transition-all border border-white/10 hover:border-white/20">
              <span>Explorar Cifras</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* Detalhe de Design Lateral (Estilo Moderno) */}
      <div className="hidden lg:block absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-zinc-950 via-zinc-950/50 to-transparent pointer-events-none" />

      {/* Scroll Indicator minimalista */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
    </section>
  );
}