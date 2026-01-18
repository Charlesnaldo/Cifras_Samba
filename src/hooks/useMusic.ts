// src/hooks/useMusic.ts
'use client';
import { useState } from 'react';
import { transposeChord } from '@/utils/musicLogic';

export function useMusic(initialContent: string) {
  const [semitones, setSemitones] = useState(0);

  // Função que processa a letra da música
  // Assume que as cifras estão entre colchetes [C] ou são detectadas por Regex
  const getTransposedContent = (content: string) => {
    if (semitones === 0) return content;
    
    // Regex que busca acordes dentro de colchetes ou em linhas de cifra
    return content.replace(/\[(.*?)\]/g, (match, chord) => {
      return `[${transposeChord(chord, semitones)}]`;
    });
  };

  return {
    semitones,
    setSemitones,
    transposedContent: getTransposedContent(initialContent),
    reset: () => setSemitones(0)
  };
}