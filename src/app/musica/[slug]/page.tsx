'use client';

import { useParams } from 'next/navigation';
import CifraViewer from '@/components/ui/CifraViewer';
import { MUSICAS } from '@/components/music/musicas'; // <-- IMPORTANDO DO SEU ARQUIVO
import { Music2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SongPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Busca a música dentro do array MUSICAS pelo slug
  const musica = MUSICAS.find((m) => m.slug === slug);

  // Estado de Erro caso a música não exista no musicas.ts
  if (!musica) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-6 px-6">
        <div className="w-20 h-20 rounded-full bg-zinc-900 border border-white/[0.05] flex items-center justify-center text-emerald-500/20">
          <Music2 size={40} />
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            Cifra não <span className="text-emerald-500">encontrada</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest max-w-[250px] mx-auto">
            O samba que você procura não está no catálogo.
          </p>
        </div>

        <Link 
          href="/" 
          className="mt-4 flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
        >
          <ArrowLeft size={14} />
          Voltar ao Início
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-zinc-950">
      {/* Passa a música encontrada para o Viewer que já tem a lógica do [Colchete] */}
      <CifraViewer musica={musica} />
    </div>
  );
}