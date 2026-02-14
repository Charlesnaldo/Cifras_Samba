'use client';

import { Plus, Minus, RotateCcw } from 'lucide-react';

interface TransposeControlProps {
  semitones: number;
  setSemitones: (value: number | ((prev: number) => number)) => void;
}

export default function TransposeControl({ semitones, setSemitones }: TransposeControlProps) {
  const isTransposed = semitones !== 0;

  return (
    <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl shadow-xl">
      <button
        onClick={() => setSemitones((prev) => prev - 1)}
        className="p-2 hover:bg-zinc-800 rounded-xl transition-all active:scale-90 text-zinc-400 hover:text-accent"
        title="Diminuir meio tom"
      >
        <Minus size={18} strokeWidth={2.5} />
      </button>

      <div className="flex flex-col items-center justify-center px-2 min-w-[45px] border-x border-zinc-800">
        <span className="text-[9px] uppercase font-black text-zinc-500 tracking-tighter">Tom</span>
        <span className={`font-mono font-bold text-base leading-none ${isTransposed ? 'text-accent' : 'text-white'}`}>
          {semitones > 0 ? `+${semitones}` : semitones}
        </span>
      </div>

      <button
        onClick={() => setSemitones((prev) => prev + 1)}
        className="p-2 hover:bg-zinc-800 rounded-xl transition-all active:scale-90 text-zinc-400 hover:text-accent"
        title="Aumentar meio tom"
      >
        <Plus size={18} strokeWidth={2.5} />
      </button>

      {isTransposed && (
        <button
          onClick={() => setSemitones(0)}
          className="ml-1 p-2 text-zinc-500 hover:text-danger transition-colors border-l border-zinc-800"
          title="Resetar tom"
        >
          <RotateCcw size={14} />
        </button>
      )}
    </div>
  );
}
