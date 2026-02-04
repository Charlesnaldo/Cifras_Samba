
'use client';
import { useState } from 'react';
import { transposeChord } from '@/utils/musicLogic';

export function useMusic(initialContent: string) {
  const [semitones, setSemitones] = useState(0);

  
  const getTransposedContent = (content: string) => {
    if (semitones === 0) return content;
    
   
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