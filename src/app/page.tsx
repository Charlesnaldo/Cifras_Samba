'use client';
import SongCard  from '@/music/SongCard';
import { useSearchParams } from 'next/navigation';

const SAMBAS_MOCK = [
  { titulo: "Preciso Desse Amor", artista: "Exaltasamba", tom: "C", slug: "preciso-desse-amor", ritmo: "Pagode" },
  { titulo: "O Show Tem Que Continuar", artista: "Fundo de Quintal", tom: "D", slug: "o-show-tem-que-continuar", ritmo: "Samba de Raiz" },
  // ... adicione as outras músicas aqui
];

export default function Home() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  // Filtra as músicas em tempo real baseado no que foi digitado
  const musicasFiltradas = SAMBAS_MOCK.filter(m => 
    m.titulo.toLowerCase().includes(query) || 
    m.artista.toLowerCase().includes(query)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-black italic uppercase text-white mb-8">
        {query ? `Resultados para: ${query}` : 'Mais Tocadas'} <span className="text-yellow-500">.</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {musicasFiltradas.length > 0 ? (
          musicasFiltradas.map((musica) => (
            <SongCard key={musica.slug} {...musica} />
          ))
        ) : (
          <p className="text-zinc-500 col-span-full py-20 text-center border border-dashed border-zinc-800 rounded-3xl">
            Nenhum samba encontrado com esse nome... 🪕
          </p>
        )}
      </div>
    </div>
  );
}