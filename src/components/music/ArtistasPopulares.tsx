'use client';

import { MUSICAS } from '@/components/music/musicas';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ArtistasPopulares() {
  const contagemArtistas = MUSICAS.reduce((acc: { [key: string]: number }, musica) => {
    acc[musica.artista] = (acc[musica.artista] || 0) + 1;
    return acc;
  }, {});

  const topArtistas = Object.entries(contagemArtistas)
    .map(([nome, total]) => ({ nome, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    // Adicionado px-4 ou px-6 para dar o respiro lateral em telas menores
    // e max-w-7xl com mx-auto para centralizar em telas grandes
    <section className="py-16 border-b border-zinc-900 w-full max-w-7xl mx-auto px-6 md:px-10">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">
            Explorar Catálogo
          </h2>
          <h3 className="text-4xl font-light text-white tracking-tighter leading-none">
            Artistas <span className="italic text-yellow-500/90 font-serif">populares</span>
          </h3>
        </div>
        
        <Link 
          href="/buscar" 
          className="group flex items-center gap-2 text-[10px] font-black text-zinc-400 hover:text-white transition-colors tracking-widest"
        >
          VER TUDO
          <div className="w-6 h-6 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-yellow-500/50 transition-colors">
            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Grid com espaçamento maior (gap-10) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-10 md:gap-16">
        {topArtistas.map((artista) => (
          <Link 
            key={artista.nome}
            href={`/buscar?artista=${encodeURIComponent(artista.nome)}`}
            className="group flex flex-col items-center md:items-start gap-4 transition-opacity hover:opacity-80"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-zinc-950 border border-zinc-900 flex items-center justify-center transition-all duration-500 group-hover:border-yellow-500/40 group-hover:bg-zinc-900">
                <span className="text-2xl font-extralight text-zinc-600 group-hover:text-yellow-500 transition-colors">
                  {artista.nome.charAt(0)}
                </span>
              </div>
              
              <div className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center bg-white text-[10px] font-black text-black rounded-full shadow-xl">
                {artista.total}
              </div>
            </div>

            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-zinc-200 group-hover:text-yellow-500 transition-colors">
                {artista.nome}
              </p>
              <p className="text-[9px] text-zinc-600 uppercase tracking-[0.2em] font-bold mt-1">
                {artista.total === 1 ? '1 Cifra' : `${artista.total} Cifras`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}