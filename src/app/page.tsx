'use client';

import { useSearchParams } from 'next/navigation';
import SongCard from '@/components/music/SongCard';
import ArtistasPopulares from '@/components/music/ArtistasPopulares';
import NossasAulas from '@/components/layout/NossasAulas';

const SAMBAS_MOCK = [
  { titulo: "Preciso Desse Amor", artista: "Exaltasamba", tom: "C", slug: "preciso-desse-amor", ritmo: "Pagode" },
  { titulo: "O Show Tem Que Continuar", artista: "Fundo de Quintal", tom: "D", slug: "o-show-tem-que-continuar", ritmo: "Samba de Raiz" },
  { titulo: "Samba de Arerê", artista: "Revelação", tom: "G", slug: "samba-de-arere", ritmo: "Pagode" },
  // ... adicione as outras músicas aqui
];

export default function Home() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const musicasFiltradas = SAMBAS_MOCK.filter(m => 
    m.titulo.toLowerCase().includes(query) || 
    m.artista.toLowerCase().includes(query)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      
      {/* Se o usuário NÃO estiver buscando, mostra os Artistas Populares no topo */}
      {!query && <ArtistasPopulares />}

      {/* Seção de Músicas / Resultados */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black italic uppercase text-white tracking-tighter">
            {query ? (
              <>Resultados para: <span className="text-yellow-500">{query}</span></>
            ) : (
              <>Cifras <span className="text-yellow-500 font-serif italic lowercase font-light">mais tocadas</span></>
            )}
          </h2>
          {query && (
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
              {musicasFiltradas.length} Encontradas
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {musicasFiltradas.length > 0 ? (
            musicasFiltradas.map((musica) => (
              <SongCard key={musica.slug} {...musica} />
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center border border-dashed border-zinc-900 rounded-[2.5rem] bg-zinc-950/50">
              <p className="text-zinc-500 font-medium italic">
                Nenhum samba encontrado com esse nome... 🪕
              </p>
              <button 
                onClick={() => window.location.href = '/'}
                className="mt-4 text-[10px] font-black uppercase tracking-widest text-yellow-500 hover:text-white transition-colors"
              >
                Limpar Busca
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Se o usuário NÃO estiver buscando, mostra as Aulas embaixo */}
      {!query && (
        <div className="pt-8 border-t border-zinc-900">
          <NossasAulas />
        </div>
      )}
      
    </div>
  );
}