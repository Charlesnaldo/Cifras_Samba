// src/music/SongCard.tsx
import Link from 'next/link';
import { Music2, ChevronRight } from 'lucide-react';

interface SongCardProps {
  titulo: string;
  artista: string;
  ritmo: string;
  tom: string;
  dificuldade: 'Fácil' | 'Média' | 'Difícil';
  slug: string;
}

export default function SongCard({ titulo, artista, ritmo, tom, dificuldade, slug }: SongCardProps) {
  
  // Lógica de cores para a dificuldade
  const diffColors = {
    'Fácil': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    'Média': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    'Difícil': 'text-red-400 bg-red-400/10 border-red-400/20'
  };

  return (
    <Link href={`/musica/${slug}`} className="group relative block">
      <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-[2rem] hover:bg-zinc-800/60 hover:border-yellow-500/30 transition-all duration-500">
        
        {/* Header do Card */}
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-zinc-800 rounded-2xl text-yellow-500 group-hover:scale-110 transition-transform duration-500">
            <Music2 size={20} />
          </div>
          <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${diffColors[dificuldade]}`}>
            {dificuldade}
          </span>
        </div>

        {/* Info da Música */}
        <div className="space-y-1">
          <h3 className="text-xl font-black text-white leading-tight uppercase italic group-hover:text-yellow-500 transition-colors">
            {titulo}
          </h3>
          <p className="text-zinc-500 font-medium text-sm">{artista}</p>
        </div>

        {/* Footer do Card */}
        <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
          <div className="flex gap-3">
            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-600 font-bold uppercase">Tom</span>
              <span className="text-xs font-mono font-bold text-zinc-300">{tom}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-600 font-bold uppercase">Ritmo</span>
              <span className="text-xs font-bold text-zinc-300">{ritmo}</span>
            </div>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-yellow-500 group-hover:text-black transition-all">
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}