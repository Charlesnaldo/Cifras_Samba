'use client';
import { chordsData } from '@/data/chords';

interface Props {
  name: string;
  instrument: 'cavaquinho' | 'violao';
}

export default function ChordDiagram({ name, instrument }: Props) {
  // 1. Busca os dados do instrumento e a posição do acorde com segurança
  const instrData = chordsData[instrument];
  const positions = (instrData.list as Record<string, number[]>)[name];

  // Caso o acorde não exista no dicionário
  if (!positions) {
    return (
      <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg border border-dashed border-gray-300 w-24 h-[110px]">
        <span className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">{name}</span>
        <span className="text-[8px] text-gray-400 text-center italic">Não encontrado</span>
      </div>
    );
  }

  const numStrings = instrData.strings;
  const width = 64; // Largura levemente maior para respiro
  const height = 80;
  const stringSpacing = width / (numStrings + 1);
  const fretSpacing = height / 5;

  return (
    <div className="flex flex-col items-center p-2 bg-white rounded-xl border border-orange-100 shadow-sm w-24 hover:shadow-md transition-shadow shrink-0">
      {/* Nome do Acorde */}
      <span className="text-sm font-black mb-2 text-orange-700 leading-none">{name}</span>
      
      <svg width={width} height={height + 10} viewBox={`0 -10 ${width} ${height + 10}`} className="overflow-visible">
        {/* Nut (Pestana superior mais grossa) */}
        <line 
          x1={stringSpacing} 
          y1="0" 
          x2={stringSpacing * numStrings} 
          y2="0" 
          stroke="#1a1a1a" 
          strokeWidth="3" 
        />
        
        {/* Trastes (Linhas horizontais) */}
        {[1, 2, 3, 4, 5].map((f) => (
          <line 
            key={f} 
            x1={stringSpacing} 
            y1={f * fretSpacing} 
            x2={stringSpacing * numStrings} 
            y2={f * fretSpacing} 
            stroke="#d1d5db" 
            strokeWidth="1" 
          />
        ))}

        {/* Cordas (Linhas verticais) */}
        {Array.from({ length: numStrings }).map((_, i) => (
          <line 
            key={i} 
            x1={(i + 1) * stringSpacing} 
            y1="0" 
            x2={(i + 1) * stringSpacing} 
            y2={height} 
            stroke="#4b5563" 
            strokeWidth="1.2" 
          />
        ))}

        {/* Marcadores de Posição (Bolinhas, X e O) */}
        {positions.map((fret, stringIdx) => {
          const xPos = (stringIdx + 1) * stringSpacing;
          
          // Dedo pressionando traste
          if (fret > 0) {
            return (
              <circle 
                key={stringIdx}
                cx={xPos} 
                cy={(fret * fretSpacing) - (fretSpacing / 2)} 
                r="4.5" 
                className="fill-orange-600" 
              />
            );
          }
          
          // Corda solta (Círculo vazio no topo)
          if (fret === 0) {
            return (
              <circle 
                key={stringIdx}
                cx={xPos} 
                cy="-5" 
                r="3" 
                fill="none" 
                stroke="#9ca3af" 
                strokeWidth="1" 
              />
            );
          }

          // Corda abafada (X no topo)
          if (fret === -1) {
            return (
              <g key={stringIdx} stroke="#9ca3af" strokeWidth="1.5">
                <line x1={xPos - 3} y1="-8" x2={xPos + 3} y2="-2" />
                <line x1={xPos + 3} y1="-8" x2={xPos - 3} y2="-2" />
              </g>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
}