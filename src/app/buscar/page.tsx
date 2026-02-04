'use client';

import { useState, useMemo } from 'react';
import { MUSICAS } from "@/components/music";
import SongCard from '@/components/music/SongCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function BuscarPage() {
  const [busca, setBusca] = useState('');
  const [ritmoAtivo, setRitmoAtivo] = useState('Todos');

  // Extrair ritmos únicos para os filtros
  const ritmos = ['Todos', ...Array.from(new Set(MUSICAS.map(m => m.ritmo)))];

  // Lógica de filtragem com useMemo para performance
  const musicasFiltradas = useMemo(() => {
    return MUSICAS.filter(musica => {
      const correspondeBusca =
        musica.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        musica.artista.toLowerCase().includes(busca.toLowerCase());

      const correspondeRitmo = ritmoAtivo === 'Todos' || musica.ritmo === ritmoAtivo;

      return correspondeBusca && correspondeRitmo;
    });
  }, [busca, ritmoAtivo]);

  return (
    <div className="min-h-screen bg-black pt-24 px-6 pb-20">
      <div className="max-w-7xl mx-auto">

        {/* Header de Busca */}
        <div className="mb-12 space-y-6">
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
            Explorar <span className="text-yellow-500">Repertório</span>
          </h1>

          {/* Barra de Pesquisa */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Busque por música ou artista..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 p-4 pl-12 rounded-2xl text-white outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 transition-all"
            />
            {busca && (
              <button onClick={() => setBusca('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                <X size={18} />
              </button>
            )}
          </div>

          {/* Filtros de Ritmo (Pills) */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <div className="bg-zinc-800/50 p-2 rounded-xl text-zinc-400">
              <SlidersHorizontal size={18} />
            </div>
            {ritmos.map(ritmo => (
              <button
                key={ritmo}
                onClick={() => setRitmoAtivo(ritmo)}
                className={`px-6 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${ritmoAtivo === ritmo
                    ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                  }`}
              >
                {ritmo}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Resultados */}
        {musicasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {musicasFiltradas.map(musica => (
              <SongCard key={musica.slug} {...musica} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[3rem]">
            <p className="text-zinc-500 font-medium">Nenhuma música encontrada para sua busca.</p>
          </div>
        )}
      </div>
    </div>
  );
}