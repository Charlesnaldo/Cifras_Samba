'use client';

import { Play, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { MUSICAS } from '.';

export default function MaisTocadas() {
  const maisTocadas = MUSICAS.slice(0, 12);

  return (
    <section className="w-full py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <TrendingUp size={12} className="text-emerald-500" />
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">Ranking Semanal</span>
          </div>
          <h3 className="text-3xl md:text-3xl font-black text-foreground italic tracking-tighter leading-none">
            As mais <span className="font-serif italic text-emerald-500 font-light lowercase">tocadas</span>
          </h3>
        </div>

        <Link
          href="/cifras"
          className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-emerald-500 transition-colors border-b border-zinc-800 pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-md"
        >
          Ver ranking completo
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3">
        {maisTocadas.map((musica, index) => (
          <Link
            key={musica.id}
            href={`/musica/${musica.slug}`}
            className="group relative flex items-center gap-4 md:gap-6 p-3 md:p-4 rounded-[2rem] hover:bg-zinc-900/40 border border-transparent hover:border-white/[0.05] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <div className="relative flex items-center justify-center min-w-[40px]">
              <span className="text-3xl md:text-4xl font-black text-zinc-800/50 group-hover:text-emerald-500/10 transition-colors italic tracking-tighter">
                {index + 1}
              </span>
            </div>

            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden shadow-xl border border-white/5">
              <Image
                src={musica.fotoArtista || '/hero/hero.jpg'}
                alt={musica.artista}
                width={64}
                height={64}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-base md:text-lg font-black text-foreground group-hover:text-emerald-400 transition-colors uppercase italic tracking-tighter truncate">
                {musica.titulo}
              </h4>
              <p className="text-[11px] md:text-xs text-zinc-500 font-bold uppercase tracking-wider truncate">{musica.artista}</p>
            </div>

            <div className="flex items-center gap-4 pr-2">
              <div className="hidden sm:flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter italic">Tom</span>
                <span className="text-xs font-mono font-black text-emerald-500/80 italic">{musica.tom}</span>
              </div>

              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:bg-emerald-500 group-hover:text-black group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300">
                <Play size={18} fill="currentColor" className="ml-1 transition-transform group-hover:scale-110" />
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/[0.02] to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] pointer-events-none" />
          </Link>
        ))}
      </div>
    </section>
  );
}
