'use client';

import { Play, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const MAIS_TOCADAS_MOCK = [
  { titulo: "Preciso Desse Amor", artista: "Exaltasamba", slug: "preciso-desse-amor", tom: "C" },
  { titulo: "O Show Tem Que Continuar", artista: "Fundo de Quintal", slug: "o-show-tem-que-continuar", tom: "D" },
  { titulo: "Samba de Arerê", artista: "Revelação", slug: "samba-de-arere", tom: "G" },
];

export default function MaisTocadas() {
  return (
    <section className="w-full">
      {/* Cabeçalho Padronizado */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">
            Ranking Semanal
          </h2>
          <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
            Mais <span className="font-serif italic text-emerald-500 font-light lowercase">tocadas</span>
          </h3>
        </div>
      </div>

      {/* Lista de Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
        {MAIS_TOCADAS_MOCK.map((musica, index) => (
          <Link 
            key={musica.slug} 
            href={`/musica/${musica.slug}`}
            className="group flex items-center gap-6 p-4 rounded-3xl hover:bg-zinc-900/40 border border-transparent hover:border-white/[0.05] transition-all duration-300"
          >
            {/* Posição Numerada */}
            <span className="text-4xl font-black text-zinc-800 group-hover:text-emerald-500/20 transition-colors italic tracking-tighter">
              0{index + 1}
            </span>

            {/* Informações da Música */}
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-black text-zinc-200 group-hover:text-emerald-400 transition-colors uppercase italic tracking-tighter truncate">
                {musica.titulo}
              </h4>
              <p className="text-sm text-zinc-500 font-medium">{musica.artista}</p>
            </div>

            {/* Tom e Botão de Ação */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Tom</span>
                <span className="text-xs font-mono font-bold text-zinc-400">{musica.tom}</span>
              </div>
              
              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:bg-emerald-500 group-hover:text-black group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                <Play size={16} fill="currentColor" className="ml-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}