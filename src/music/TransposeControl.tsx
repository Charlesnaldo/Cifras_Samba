// src/components/music/TransposeControl.tsx
import { Plus, Minus, RotateCcw } from 'lucide-react';

export default function TransposeControl({ semitones, setSemitones }: any) {
  return (
    <div className="flex items-center gap-4 bg-white p-2 rounded-full shadow-lg border border-orange-100">
      <button 
        onClick={() => setSemitones(semitones - 1)}
        className="p-2 hover:bg-orange-100 rounded-full transition-colors text-orange-600"
      >
        <Minus size={20} />
      </button>
      
      <div className="flex flex-col items-center min-w-[60px]">
        <span className="text-[10px] uppercase font-bold text-gray-400">Tom</span>
        <span className="font-mono font-bold text-lg leading-none">
          {semitones > 0 ? `+${semitones}` : semitones}
        </span>
      </div>

      <button 
        onClick={() => setSemitones(semitones + 1)}
        className="p-2 hover:bg-orange-100 rounded-full transition-colors text-orange-600"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}