export interface LocalBand {
    id: string;
    name: string;
    city: string;
    state: string; // e.g. 'SP', 'RJ'
    image: string;
    genre: string;
    instagram?: string;
    description: string;
    rating: number; // 0-5
}

export const LOCAL_BANDS: LocalBand[] = [
    {
        id: '1',
        name: 'Samba da Esquina',
        city: 'São Paulo',
        state: 'SP',
        image: '/artistas/local1.jpg', // Placeholder
        genre: 'Samba Raiz',
        instagram: '@sambadaesquina',
        description: 'Roda de samba tradicional na Vila Madalena.',
        rating: 4.8
    },
    {
        id: '2',
        name: 'Pagode do Zé',
        city: 'Rio de Janeiro',
        state: 'RJ',
        image: '/artistas/local2.jpg',
        genre: 'Pagode 90',
        instagram: '@pagodedoze_rio',
        description: 'O melhor do pagode dos anos 90 na Lapa.',
        rating: 4.9
    },
    {
        id: '3',
        name: 'Grupo Sem Compromisso',
        city: 'Belo Horizonte',
        state: 'MG',
        image: '/artistas/local3.jpg',
        genre: 'Samba e Pagode',
        instagram: '@semcompromissobh',
        description: 'Animação garantida para o seu evento.',
        rating: 4.5
    },
    {
        id: '4',
        name: 'Samba de Roda',
        city: 'Salvador',
        state: 'BA',
        image: '/artistas/local4.jpg',
        genre: 'Samba de Roda',
        instagram: '@sambaderoda_salvador',
        description: 'Samba de roda autêntico.',
        rating: 5.0
    },
    {
        id: '5',
        name: 'Quintal do Samba',
        city: 'São Paulo',
        state: 'SP',
        image: '/artistas/local5.jpg',
        genre: 'Partido Alto',
        instagram: '@quintaldosamba',
        description: 'Samba de mesa todas as sextas.',
        rating: 4.7
    }
];
