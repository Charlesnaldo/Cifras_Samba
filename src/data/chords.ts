// src/data/chords.ts

export const chordsData = {
  cavaquinho: {
    strings: 4,
    list: {
      // MAIORES
      "C": [2, 0, 1, 2],
      "C#": [3, 1, 2, 3],
      "Db": [3, 1, 2, 3],
      "D": [0, 2, 3, 4],
      "D#": [1, 3, 4, 5],
      "Eb": [1, 3, 4, 5],
      "E": [2, 4, 5, 6],
      "F": [3, 2, 1, 3],
      "F#": [4, 3, 2, 4],
      "Gb": [4, 3, 2, 4],
      "G": [0, 0, 0, 0], // Cordas soltas (ou 5,4,3,5)
      "G#": [1, 1, 1, 1],
      "Ab": [1, 1, 1, 1],
      "A": [2, 2, 2, 2],
      "A#": [3, 3, 3, 3],
      "Bb": [3, 3, 3, 3],
      "B": [4, 4, 4, 4],

      // MENORES
      "Cm": [5, 5, 4, 5],
      "C#m": [6, 6, 5, 6],
      "Dm": [0, 2, 3, 3],
      "Em": [2, 0, 0, 2],
      "Fm": [3, 1, 1, 3],
      "Gm": [0, 3, 3, 0],
      "Am": [2, 2, 1, 2],
      "Bm": [4, 4, 3, 4],

      // COM SÉTIMA (Dominantes - fundamentais no samba)
      "C7": [3, 3, 1, 2],
      "D7": [0, 2, 1, 0],
      "E7": [1, 1, 0, 0],
      "F7": [2, 2, 1, 1],
      "G7": [0, 0, 0, 3],
      "A7": [0, 2, 2, 2],
      "B7": [2, 2, 0, 2],
      
      // MENORES COM SÉTIMA
      "Dm7": [0, 1, 1, 0],
      "Am7": [2, 0, 1, 2],
      "Gm7": [3, 3, 3, 3], // Pestana na 3ª casa
    }
  },
  violao: {
    strings: 6,
    list: {
      "C": [-1, 3, 2, 0, 1, 0],
      "D": [-1, -1, 0, 2, 3, 2],
      "G": [3, 2, 0, 0, 0, 3],
      // Adicionaremos mais conforme a necessidade
    }
  }
};