// src/components/TransposeControl.tsx
'use client';

import { Plus, Minus, RotateCcw } from 'lucide-react';

interface TransposeProps {
  semitones: number;
  setSemitones: (value: number) => void;
}

export default function TransposeControl({ semitones, setSemitones }: TransposeProps) {
  return (
    <div className="flex items-center gap-2 bg-white p-1.5 rounded-full shadow-md border border-orange-100">
      {/* Botão de Diminuir Meio Tom */}
      <button 
        onClick={() => setSemitones(semitones - 1)}
        className="p-2 hover:bg-orange-50 rounded-full transition-all active:scale-90 text-orange-600 border border-transparent hover:border-orange-200"
        title="Diminuir meio tom"
      >
        <Minus size={18} strokeWidth={3} />
      </button>
      
      {/* Indicador Central */}
      <div className="flex flex-col items-center justify-center px-3 min-w-[50px] border-x border-gray-100">
        <span className="text-[9px] uppercase font-black text-gray-400 tracking-tighter">Tom</span>
        <span className={`font-mono font-bold text-lg leading-none ${semitones !== 0 ? 'text-orange-600' : 'text-gray-800'}`}>
          {semitones > 0 ? `+${semitones}` : semitones}
        </span>
      </div>

      {/* Botão de Aumentar Meio Tom */}
      <button 
        onClick={() => setSemitones(semitones + 1)}
        className="p-2 hover:bg-orange-50 rounded-full transition-all active:scale-90 text-orange-600 border border-transparent hover:border-orange-200"
        title="Aumentar meio tom"
      >
        <Plus size={18} strokeWidth={3} />
      </button>

      {/* Botão de Reset (Opcional, mas muito útil) */}
      {semitones !== 0 && (
        <button 
          onClick={() => setSemitones(0)}
          className="ml-1 p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Resetar para tom original"
        >
          <RotateCcw size={16} />
        </button>
      )}
    </div>
  );
}