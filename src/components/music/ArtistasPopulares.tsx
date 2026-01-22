'use client';

import { MUSICAS } from '@/components/music/musicas';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ArtistasPopulares() {
  const contagemArtistas = (MUSICAS || []).reduce((acc: { [key: string]: number }, musica) => {
    acc[musica.artista] = (acc[musica.artista] || 0) + 1;
    return acc;
  }, {});

  const topArtistas = Object.entries(contagemArtistas)
    .map(([nome, total]) => ({ nome, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">
            Explorar Catálogo
          </h2>
          <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
            Artistas <span className="font-serif italic text-emerald-500 font-light lowercase">populares</span>
          </h3>
        </div>
        
        <Link 
          href="/buscar" 
          className="group flex items-center gap-2 text-[10px] font-black text-zinc-500 hover:text-emerald-500 transition-colors tracking-widest"
        >
          VER TUDO
          <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-10 md:gap-16">
        {topArtistas.map((artista) => (
          <Link 
            key={artista.nome}
            href={`/buscar?artista=${encodeURIComponent(artista.nome)}`}
            className="group flex flex-col items-center md:items-start gap-4 transition-all"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-all duration-500 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]">
                <span className="text-2xl font-light text-zinc-600 group-hover:text-emerald-500 transition-colors">
                  {artista.nome.charAt(0)}
                </span>
              </div>
              <div className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center bg-emerald-500 text-[10px] font-black text-black rounded-full shadow-lg shadow-emerald-500/20">
                {artista.total}
              </div>
            </div>

            <div className="text-center md:text-left">
              <p className="text-sm font-black text-zinc-200 group-hover:text-emerald-400 transition-colors uppercase italic tracking-tighter">
                {artista.nome}
              </p>
              <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-1">
                {artista.total === 1 ? '1 Cifra' : `${artista.total} Cifras`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}