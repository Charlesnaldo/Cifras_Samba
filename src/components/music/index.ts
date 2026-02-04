import { Musica } from './musicas';

// src/components/music/index.ts
export { default as SongCard } from './SongCard';
export { default as TransposeControl } from './TransposeControl';
export { default as AutoScroll } from './AutoScroll';
export const MUSICAS: Musica[] = [
    {
        id: '1',
        titulo: 'Tá Escrito',
        artista: 'Grupo Revelação',
        fotoArtista: '/artistas/revelacao.jpg',
        ritmo: 'Samba de Raiz',
        tom: 'F',
        dificuldade: 'Média',
        slug: 'ta-escrito-revelacao',
        cifra: `
[Intro] [ ] [F]
[Primeira Parte]
[F] Quem cultiva a semente do amor [C] Segue em frente não se apa[Bb]vora
[F] Se na vida encontrar dissa[Dm]bor [Gm] Vai saber espe[C7]rar sua hora
[F] Quem cultiva a semente do amor [C] Segue em frente não se apa[Bb]vora
[F] Se na vida encontrar dissa[Dm]bor [Gm] Vai saber espe[C7]rar sua [F] hora [F7]

[Segunda Parte]
[Bb] Às vezes a felicidade demora a chegar
[F] Aí é que a gente [F/C] Não pode deixar de so[Am]nhar
[Gm] Guerreiro não foge da luta Não pode cor[C7]rer
[F] Ninguém vai poder atra[F7M]sar [Cm] Quem nasceu pra ven[F7]cer

[Pré-Refrão]
[Bb] É dia de sol mas o tempo pode fechar
[F] A chuva só vem quando [F/C] tem que mo[Am]lhar [D7(9-)]
[Gm] Na vida é preciso apren[C7]der [F] Se colhe o bem que plan[D7]tar
[Gm] É Deus quem aponta a es[C7]trela Que tem que bri[F]lhar [F7]

[Refrão]
Ergue essa ca[Bb]beça, mete o pé e vai na fé
[C7] Manda essa tristeza em[F]bora [F7M] [F6]
Basta acredi[C]tar que um novo dia vai rai[Bb]ar
Sua [C] hora vai che[F]gar [F7]
Erga essa ca[Bb]beça, mete o pé e vai na fé
[C7] Manda essa tristeza em[F]bora [F7M] [F6]
Basta acredi[C]tar que um novo dia vai rai[Bb]ar
Sua [C] hora vai che[F]gar

(Repete Tudo)`
    },
    {
        id: '2',
        titulo: 'O Show Tem Que Continuar',
        artista: 'Fundo de Quintal',
        fotoArtista: '/artistas/fundodequintal.webp',
        ritmo: 'Samba de Raiz',
        tom: 'C',
        dificuldade: 'Fácil',
        slug: 'o-show-tem-que-continuar',
        cifra: `
[Intro]
[F#m7(5-)] Lalaia lalaia laia [Fm6] [Em7] Lalaia lalaia laia [Eb°] [Dm7(9)] Lalaia Lalaia [G7(13)] [  ] [ ] [Gm7] [C7(9)] Laia

[Primeira Parte]
[C6(9)] O teu choro [Eb°] já não toca 
[Dm7(9)] [  ] [ ][G7(13)] meu bando[C6(9)]lim
[Ebº] Diz que minha voz su[Dm7(9)]foca [  ] [ ][G7(13)] seu vio[Gm7]lão
[C7(9)] Afrouxaram-se as [F#m7(5-)] cordas [Fm6] e assim [Em7] desa[Eb°]fina
E pobre das [Dm7(9)] rimas [G7(13)] da nossa can[Gm7]ção
[C7(9)] Hoje somos [F#m7(5-)] folha morta [Fm6] metais em sur[Em7]dina [Ebº]
Fechando a cur[Dm7(9)]tina [  ] [ ][G7(13)] vazio o sa[C6(9)]lão

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
O show tem que [Dm7(9)] conti[G7(13)]nuar [  ] [ ][C6(9)]

[Final]
Nós iremos a[F#m7(5-)]té Pa[Fm6]ris, arra[Em7]sar no O[Eb°]limpia
O show tem que [Dm7(9)] conti[G7(13)]nuar [  ] [ ][Gm7][  ] [ ] [C7(9)]
Olha o povo pe[F#m7(5-)]dindo [Fm6] bis, os in[Em7]gressos vão se esgo[Eb°]tar
O show tem que [Dm7(9)] conti[G7(13)]nuar[  ] [ ] [C7M] [  ] [ ][C7]
Todo mundo que [F#m7(5-)] hoje [Fm6] diz, aca[Em7]bou vai se admi[Eb°]rar
Nosso amor vai [Dm7(9)] conti[G7(13)]nuar[  ] [ ] [Gm7] [  ] [ ][C7(9)]

[F#m7(5-)] Lalaia lalaia laia [Fm6] [Em7] Lalaia lalaia laia [Eb°] [Dm7(9)] Lalaia Lalaia [G7(13)] [Gm7] [C7(9)] Laia
`
    },
    {
        id: '3',
        titulo: 'Iracema',
        artista: 'Adoniran Barbosa',
        fotoArtista: '/artistas/adoniran-barbosa.jfif',
        ritmo: 'Samba de Raiz',
        tom: 'Dm',
        dificuldade: 'Fácil',
        slug: 'iracema',
        cifra: `

    [Intro] [Dm] [D7] [Gm] [Dm] [A#7] [A7] [Dm] [A7]

[Primeira Parte]
[Dm]      [A7]             [Dm]
Iracema, eu nunca mais eu te vi
  [D7]                           [Gm]
Iracema meu grande amor foi embora
        [A7]           [Dm]
Chorei, eu chorei de dor porque
   [A#7]            [A7]         [Dm]  [A7]
Iracema meu grande amor foi você

[Segunda Parte]
[Dm]     [A7]         [Dm]
Iracema, eu sempre dizia
            [D7]             [Gm]
Cuidado ao atravessar essas ruas
              [A7]           [Dm]
Eu falava, mas você não escutava não
   [A#7]           [A7]             [Dm]  [D7]
Iracema você atravessou na contra mão

[Refrão]
   [Gm]                 [Dm]
E hoje ela vive la no céu
      [A7]                       [Am7(5-)]  [D7]
E ela vive bem juntinho de nosso senhor
      [Gm]      [C]         [F]
De lembrança guardo somente
                    [Dm]
Suas meias e seu sapato
   [A#7]      [A7]           [Dm]
Iracema eu perdi o seu retrato

[Solo/Interlúdio]
([Dm] [D7] [Gm] [Dm])
([A#7] [A7] [Dm]) [A7]

[Refrão Final]
[Dm]                   [Dm]
E hoje ela vive lá no céu
      [A7]                        [Am7(5-)]  [D7]
E ela vive juntinho de nosso senhor
      [Gm]      [C]          [F]
De lembrança guardo somente
                   [Dm]
Suas meias e seu sapato
  [A#7]       [A7]           [Dm]
Iracema eu perdi o seu retrato

[Final] [Gm]  [Dm]  [A7]  [Dm]  [D7]`
    }
];

export { default as MaisTocadas } from './MaisTocadas';