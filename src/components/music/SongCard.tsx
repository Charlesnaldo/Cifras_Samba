'use client';

import Link from 'next/link';
import { Music2, ChevronRight } from 'lucide-react';

interface SongCardProps {
  titulo: string;
  artista: string;
  ritmo: string;
  tom: string;
  dificuldade?: 'Fácil' | 'Média' | 'Difícil';
  slug: string;
}

export default function SongCard({ titulo, artista, ritmo, tom, dificuldade = 'Média', slug }: SongCardProps) {
  return (
    <Link href={`/musica/${slug}`} className="group block">
      <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/[0.05] p-6 rounded-[2.5rem] hover:bg-zinc-900/60 hover:border-emerald-500/30 transition-all duration-500">
        
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-zinc-800 rounded-2xl text-emerald-500 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-500">
            <Music2 size={20} />
          </div>
          <span className="text-[9px] font-black uppercase px-3 py-1 rounded-full border border-white/10 text-zinc-500 group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-colors">
            {dificuldade}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-tight group-hover:text-emerald-500 transition-colors">
            {titulo}
          </h3>
          <p className="text-sm text-zinc-500 font-medium">{artista}</p>
        </div>

        <div className="mt-8 pt-5 border-t border-white/[0.05] flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Tom</span>
              <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-emerald-400">{tom}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Ritmo</span>
              <span className="text-xs font-bold text-zinc-400">{ritmo}</span>
            </div>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-emerald-500 group-hover:text-black group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all">
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
}