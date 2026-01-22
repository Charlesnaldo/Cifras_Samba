// src/data/aulas.ts
export interface Aula {
  id: string;
  titulo: string;
  descricao: string;
  urlYoutube: string;
  thumbnail: string;
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado';
  tags: string[];
}

export const AULAS: Aula[] = [
  {
    id: '1',
    titulo: 'Macetando - Solo de Violão',
    descricao: 'Aprenda o solo e as cifras da música de Ivete Sangalo e Ludmilla adaptada para o violão.',
    urlYoutube: 'https://www.youtube.com/watch?v=qTIFHUB1tt4',
    thumbnail: 'https://img.youtube.com/vi/qTIFHUB1tt4/mqdefault.jpg',
    nivel: 'Iniciante',
    tags: ['violão', 'solo', 'carnaval'],
  },
  {
    id: '2',
    titulo: 'Ritmo de Partido Alto',
    descricao: 'Domine a levada contagiante do Partido Alto com dicas essenciais.',
    urlYoutube: 'https://www.youtube.com/watch?v=iPfrSUTaXdQ',
    thumbnail: 'https://img.youtube.com/vi/iPfrSUTaXdQ/mqdefault.jpg',
    nivel: 'Intermediário',
    tags: ['ritmo', 'samba'],
  },
  {
    id: '3',
    titulo: 'Introdução ao Pandeiro',
    descricao: 'Fundamentos e primeiros toques para o instrumento mais versátil do samba.',
    urlYoutube: 'https://www.youtube.com/watch?v=CDrbusixOtw',
    thumbnail: 'https://img.youtube.com/vi/CDrbusixOtw/mqdefault.jpg',
    nivel: 'Iniciante',
    tags: ['pandeiro', 'percussão'],
  },
   {
    id: '4',
    titulo: 'Introdução ao Pandeiro',
    descricao: 'Fundamentos e primeiros toques para o instrumento mais versátil do samba.',
    urlYoutube: 'https://www.youtube.com/watch?v=CDrbusixOtw',
    thumbnail: 'https://img.youtube.com/vi/CDrbusixOtw/mqdefault.jpg',
    nivel: 'Iniciante',
    tags: ['pandeiro', 'percussão'],
  },
    {
    id: '5',
    titulo: 'Macetando - Solo de Violão',
    descricao: 'Aprenda o solo e as cifras da música de Ivete Sangalo e Ludmilla adaptada para o violão.',
    urlYoutube: 'https://www.youtube.com/watch?v=qTIFHUB1tt4',
    thumbnail: 'https://img.youtube.com/vi/qTIFHUB1tt4/mqdefault.jpg',
    nivel: 'Iniciante',
    tags: ['violão', 'solo', 'carnaval'],
  },
  {
    id: '6',
    titulo: 'Ritmo de Partido Alto',
    descricao: 'Domine a levada contagiante do Partido Alto com dicas essenciais.',
    urlYoutube: 'https://www.youtube.com/watch?v=iPfrSUTaXdQ',
    thumbnail: 'https://img.youtube.com/vi/iPfrSUTaXdQ/mqdefault.jpg',
    nivel: 'Intermediário',
    tags: ['ritmo', 'samba'],
  },
];