// src/data/musicas.ts
export interface Musica {
  id: string;
  titulo: string;
  artista: string;
  ritmo: string;
  tom: string; // Unificado
  dificuldade: 'Fácil' | 'Média' | 'Difícil';
  slug: string;
  conteudo: string; // Adicionado para a cifra
}

export const MUSICAS: Musica[] = [
  {
    id: '1',
    titulo: 'Tá Escrito',
    artista: 'Grupo Revelação',
    ritmo: 'Samba de Raiz',
    tom: 'G',
    dificuldade: 'Média',
    slug: 'ta-escrito-revelacao',
    conteudo: "[G]Quem cultiva a se[D]mente de amor..." // A letra vem aqui
  },
  // ... outras músicas
];