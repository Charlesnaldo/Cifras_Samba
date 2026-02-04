'use client';

import { MUSICAS } from '@/components/music/musicas';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ArtistasPopulares() {
  // Contagem de cifras por artista
  const contagemArtistas = (MUSICAS || []).reduce((acc: { [key: string]: number }, musica) => {
    acc[musica.artista] = (acc[musica.artista] || 0) + 1;
    return acc;
  }, {});

  // Criamos o ranking e buscamos a foto de cada artista na lista original
  const topArtistas = Object.entries(contagemArtistas)
    .map(([nome, total]) => {
      // Busca a primeira ocorrência do artista para pegar a fotoArtista
      const dadosArtista = MUSICAS.find(m => m.artista === nome);
      return {
        nome,
        total,
        foto: dadosArtista?.fotoArtista || '/hero/hero.jpg' // Fallback caso não tenha foto
      };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <section className="w-full">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">
            Explorar Catálogo
          </h2>
          <h3 className="text-4xl font-black text-foreground uppercase italic tracking-tighter leading-none">
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

      {/* Grid de Artistas com Foto */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-10 md:gap-16">
        {topArtistas.map((artista) => (
          <Link
            key={artista.nome}
            href={`/buscar?artista=${encodeURIComponent(artista.nome)}`}
            className="group flex flex-col items-center md:items-start gap-4 transition-all"
          >
            <div className="relative">
              {/* Círculo com a Foto do Artista */}
              <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden transition-all duration-500 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                <img
                  src={artista.foto}
                  alt={artista.nome}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110"
                />
              </div>

              {/* Badge com total de cifras */}
              <div className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center bg-emerald-500 text-[10px] font-black text-black rounded-full shadow-lg shadow-emerald-500/30 z-10">
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