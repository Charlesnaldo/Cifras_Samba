'use client';
import { useParams } from 'next/navigation';
import CifraViewer from '@/components/ui/CifraViewer';

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

  if (!musica) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-mono">
        Música não encontrada no repertório. 🪕
      </div>
    );
  }

  // O CifraViewer já cuida de: TransposeControl, ChordDiagrams e a Letra Neon
  return <CifraViewer musica={musica} />;
}