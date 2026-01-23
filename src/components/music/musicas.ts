export interface Musica {
  id: string;
  titulo: string;
  artista: string;
  fotoArtista?: string; // Adicionado para a foto que você pediu
  ritmo: string;
  tom: string;
  dificuldade: 'Fácil' | 'Média' | 'Difícil';
  slug: string;
  conteudo: string;
}

export const MUSICAS: Musica[] = [
  {
    id: '1',
    titulo: 'Tá Escrito',
    artista: 'Grupo Revelação',
    fotoArtista: 'https://i.scdn.co/image/ab6761610000e5eb9863378036279f648705a691', // Exemplo URL
    ritmo: 'Samba de Raiz',
    tom: 'G',
    dificuldade: 'Média',
    slug: 'ta-escrito-revelacao',
    conteudo: `
[Intro]
[G] [D7] [G] [D7]

[Primeira Parte]
Quem cul[G]tiva a semente de amor
Segue a [D7]frente, não corre da dor
E se a [Dm7]tempestade chegar, você [G7]dança na chuva
E não [C7M]murcha a flor
`
  },
  {
    id: '2',
    titulo: 'O Show Tem Que Continuar',
    artista: 'Fundo de Quintal',
    fotoArtista: '/artistas/fundodequintal.webp', // Exemplo URL
    ritmo: 'Samba de Raiz',
    tom: 'C',
    dificuldade: 'Fácil',
    slug: 'o-show-tem-que-continuar',
    conteudo: `
[Intro]
[F#m7(5-)] Lalaia lalaia laia [Fm6] [Em7] Lalaia lalaia laia [Eb°] [Dm7(9)] Lalaia Lalaia [G7(13)] [Gm7] [C7(9)] Laia

[Primeira Parte]
[C6(9)] O teu choro [Eb°] já não toca [Dm7(9)] [G7(13)] meu bando[C6(9)]lim
[Ebº] Diz que minha voz su[Dm7(9)]foca [G7(13)] seu vio[Gm7]lão
[C7(9)] Afrouxaram-se as [F#m7(5-)] cordas [Fm6] e assim [Em7] desa[Eb°]fina
E pobre das [Dm7(9)] rimas [G7(13)] da nossa can[Gm7]ção
[C7(9)] Hoje somos [F#m7(5-)] folha morta [Fm6] metais em sur[Em7]dina [Ebº]
Fechando a cur[Dm7(9)]tina [G7(13)] vazio o sa[C6(9)]lão

[Segunda Parte]
Se os [Eb°] duetos não se en[Dm7(9)]contram [G7(13)] mais
E os [C6(9)] solos per[Eb°]deram emoção
Se aca[Dm7(9)]bou o [G7(13)] gás pra can[C6(9)]tar o mais simples refrão
Se a gente [Bm7(5-)] nota [E7] que uma só [Am7] nota [Am7/G] já nos es[Dm7(9)]gota
[G7(13)] E o show perde a ra[Gm7]zão [C7(9)]

[Refrão]
Nós iremos a[F#m7(5-)]char o [Fm6] tom, um acorde com um [Em7] lindo [Eb°] som
E fazer com que [Dm7(9)] fique bom [G7(13)] outra vez, [Gm7] o nosso can[C7(9)]tar
E a gente vai [F#m7(5-)] ser fe[Fm6]liz, olha nós outra [Em7] vez no [Eb°] ar
O show tem que [Dm7(9)] conti[G7(13)]nuar [C6(9)]

[Final]
Nós iremos a[F#m7(5-)]té Pa[Fm6]ris, arra[Em7]sar no O[Eb°]limpia
O show tem que [Dm7(9)] conti[G7(13)]nuar [Gm7] [C7(9)]
Olha o povo pe[F#m7(5-)]dindo [Fm6] bis, os in[Em7]gressos vão se esgo[Eb°]tar
O show tem que [Dm7(9)] conti[G7(13)]nuar [C7M] [C7]
Todo mundo que [F#m7(5-)] hoje [Fm6] diz, aca[Em7]bou vai se admi[Eb°]rar
Nosso amor vai [Dm7(9)] conti[G7(13)]nuar [Gm7] [C7(9)]

[F#m7(5-)] Lalaia lalaia laia [Fm6] [Em7] Lalaia lalaia laia [Eb°] [Dm7(9)] Lalaia Lalaia [G7(13)] [Gm7] [C7(9)] Laia
`
  }
];