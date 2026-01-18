

'use client';
import { Play, Mic2 } from 'lucide-react';
import Link from 'next/link'

interface SongCardProps {
  titulo: string;
  artista: string;
  tom: string;
  slug: string;
  ritmo: string;
}

export default function SongCard({ titulo, artista, tom, slug, ritmo }: SongCardProps) {
  return (
    <Link href={`/musica/${slug}`} className="group relative block">
      {/* Background do Card com Hover Effect */}
      <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl transition-all duration-300 group-hover:bg-zinc-800/60 group-hover:border-zinc-700 group-hover:translate-y-[-4px]">
        
        {/* Badge de Ritmo e Tom */}
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-yellow-500 transition-colors">
            {ritmo}
          </span>
          <div className="flex flex-col items-end">
             <span className="text-[10px] text-zinc-600 uppercase font-bold">Tom</span>
             <span className="text-xs font-mono font-bold text-yellow-500/80">{tom}</span>
          </div>
        </div>

        {/* Informações Principais */}
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors">
            {titulo}
          </h3>
          <div className="flex items-center gap-1.5 text-zinc-400 group-hover:text-zinc-300 transition-colors">
            <Mic2 size={12} />
            <span className="text-sm font-medium">{artista}</span>
          </div>
        </div>

        {/* Botão Flutuante de Play (Aparece no Hover) */}
        <div className="absolute bottom-4 right-4 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
          <div className="bg-yellow-500 p-2.5 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            <Play size={16} fill="black" className="text-black" />
          </div>
        </div>
      </div>
    </Link>
  );
}