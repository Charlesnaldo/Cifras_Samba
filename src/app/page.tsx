'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import SongCard from '@/components/music/SongCard';
import ArtistasPopulares from '@/components/music/ArtistasPopulares';
import NossasAulas from '@/components/layout/NossasAulas';
import MaisTocadas from '@/components/music/MaisTocadas';
import { SearchX, RotateCcw } from 'lucide-react';
import LocalBandsCTA from '@/components/music/LocalBandsCTA';
import { MUSICAS } from "@/components/music";

// MOCK de dados integrado ao padrão do componente

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const musicasFiltradas = MUSICAS.filter(m =>
    m.titulo.toLowerCase().includes(query) ||
    m.artista.toLowerCase().includes(query)
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-5 space-y-20">

      {/* 1. Visão Inicial: Mostra o Ranking e Artistas se não houver busca */}
      {!query && (
        <>

          <MaisTocadas />
          <ArtistasPopulares />
        </>
      )}

      {/* Seção Bandas Locais (Aparece se não tiver busca) */}
      {!query && (
        <LocalBandsCTA />
      )}

      {/* 2. Seção de Músicas / Resultados */}
      <section id="search-results" className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-900 pb-8">
          <div className="space-y-2">
            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">
              {query ? 'Pesquisa de Catálogo' : 'Repertório Geral'}
            </h2>
            <h3 className="text-3xl md:text-4xl font-black text-foreground  italic tracking-tighter leading-none">
              {query ? (
                <>Resultados para: <span className="text-emerald-500">{query}</span></>
              ) : (
                <>Todas as <span className="text-emerald-500 font-serif lowercase font-light">cifras</span></>
              )}
            </h3>
          </div>

          {query && (
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] bg-zinc-900 px-4 py-2 rounded-full border border-white/5">
              {musicasFiltradas.length} {musicasFiltradas.length === 1 ? 'Resultado' : 'Resultados'}
            </span>
          )}
        </div>

        {/* Grid de Resultados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {musicasFiltradas.length > 0 ? (
            musicasFiltradas.map((musica) => (
              <SongCard key={musica.slug} {...musica} />
            ))
          ) : (
            /* Estado Vazio (Empty State) Verde */
            <div className="col-span-full py-24 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-[3rem] bg-zinc-950/30 group">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-6 border border-zinc-800 group-hover:border-emerald-500/30 transition-colors">
                <SearchX className="text-zinc-700 group-hover:text-emerald-500 transition-colors" size={32} />
              </div>
              <p className="text-zinc-500 font-medium italic text-lg">
                Nenhum samba encontrado com esse nome...
              </p>
              <button
                onClick={() => router.push('/')}
                className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 hover:text-white transition-all bg-emerald-500/5 px-6 py-3 rounded-full border border-emerald-500/20"
              >
                <RotateCcw size={14} />
                Limpar Busca
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Seção Final: Aulas (Aparece apenas quando não está buscando para manter o foco) */}
      {!query && (
        <div className="pt-12 border-t border-zinc-900">
          <NossasAulas />
        </div>
      )}

      {/* Footer Spacer */}
      <div className="h-12" />
    </div>
  );
}
