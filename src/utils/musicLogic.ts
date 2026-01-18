// src/utils/musicLogic.ts
const chromaticScale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function transposeChord(chord: string, semitones: number): string {
  // Regex para achar a nota principal (ex: C, F#, Bb)
  return chord.replace(/[A-G][#b]?/g, (match) => {
    let note = match;
    // Normaliza bemóis
    if (note === "Db") note = "C#";
    if (note === "Eb") note = "D#";
    if (note === "Gb") note = "F#";
    if (note === "Ab") note = "G#";
    if (note === "Bb") note = "A#";

    const index = chromaticScale.indexOf(note);
    if (index === -1) return match;

    let newIndex = (index + semitones) % 12;
    if (newIndex < 0) newIndex += 12;
    
    return chromaticScale[newIndex];
  });
}