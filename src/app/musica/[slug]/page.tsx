'use client';

import { useParams } from 'next/navigation';
import CifraViewer from '@/components/ui/CifraViewer';
import { Music2 } from 'lucide-react';
import Link from 'next/link';

// Simulando um banco de dados de Samba
const musicasDB = {
  'preciso-desse-amor': {
    titulo: "Preciso Desse Amor",
    artista: "Exaltasamba",
    tomOriginal: "C",
    conteudo: "[C]Não é facil se entre[Am]gar\nMas a gente [Dm7]não pode evi[G7]tar"
  },
  'o-show-tem-que-continuar': {
    titulo: "O Show Tem Que Continuar",
    artista: "Fundo de Quintal",
    tomOriginal: "D",
    conteudo: "[D]Lutar e nunca aba[Bm]ter\nVencer o [Em7]mal que exis[A7]tir"
  }
};

export default function SongPage() {
  const params = useParams();
  const slug = params.slug as string;

  const musica = musicasDB[slug as keyof typeof musicasDB];

  // Estado de Erro Padronizado (Verde Esmeralda + Limpo)
  if (!musica) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-6 px-6">
        <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500/20">
          <Music2 size={40} />
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            Cifra não <span className="text-emerald-500">encontrada</span>
          </h1>
          <p className="text-zinc-500 text-sm max-w-[250px] mx-auto">
            Não encontramos essa música em nosso repertório de samba.
          </p>
        </div>

        <Link 
          href="/" 
          className="mt-4 px-8 py-3 bg-emerald-500 text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
        >
          Voltar para o Início
        </Link>
      </div>
    );
  }

  /**
   * O CifraViewer recebe o objeto da música.
   * O layout global (RootLayout) já cuida do padding superior:
   * - Mobile: pt-0 (Cifra encosta no topo)
   * - Desktop: pt-16 (Respiro para o Header Slim)
   */
  return (
    <div className="w-full min-h-screen bg-zinc-950">
      <CifraViewer musica={musica} />
    </div>
  );
}