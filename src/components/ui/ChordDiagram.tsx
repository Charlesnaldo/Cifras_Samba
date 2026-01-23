'use client';
import { chordsData } from '@/data/chords';

interface Props {
  name: string;
  instrument: 'cavaquinho' | 'violao';
  frets?: number[];
}

export default function ChordDiagram({ name, instrument, frets }: Props) {
  const instrData = chordsData[instrument];
  const positions = frets || (instrData?.list as Record<string, number[]>)?.[name];

  if (!positions) return null;

  // --- LÓGICA DE CASAS (FRETS) ---
  // Filtramos apenas as notas pressionadas (maiores que 0)
  const pressedFrets = positions.filter(f => f > 0);
  const minFret = pressedFrets.length > 0 ? Math.min(...pressedFrets) : 0;
  
  // Se o acorde passar da 4ª casa, calculamos a casa inicial (baseFret)
  const baseFret = minFret > 4 ? minFret : 1;
  const numStrings = instrument === 'cavaquinho' ? 4 : 6;
  
  const width = 64;
  const height = 80;
  const stringSpacing = width / (numStrings + 1);
  const fretSpacing = height / 5;

  return (
    <div className="flex flex-col items-center p-4 bg-zinc-900/40 border border-white/5 rounded-[2rem] w-32 hover:border-emerald-500/30 transition-all group shrink-0 relative">
      
      {/* Nome do Acorde */}
      <span className="text-sm font-black mb-3 text-white group-hover:text-emerald-500 transition-colors uppercase italic tracking-tighter">
        {name}
      </span>
      
      <div className="relative">
        {/* Indicador de Casa (ex: 5ª) */}
        {baseFret > 1 && (
          <span className="absolute -left-6 top-0 text-[10px] font-bold text-emerald-500 italic">
            {baseFret}ª
          </span>
        )}

        <svg width={width} height={height + 10} viewBox={`0 -10 ${width} ${height + 10}`} className="overflow-visible">
          {/* Nut ou Traste Superior */}
          <line 
            x1={stringSpacing} y1="0" 
            x2={stringSpacing * numStrings} y2="0" 
            stroke={baseFret === 1 ? "#71717a" : "#27272a"} 
            strokeWidth={baseFret === 1 ? "3" : "1"} 
          />
          
          {/* Trastes Dinâmicos */}
          {[1, 2, 3, 4, 5].map((f) => (
            <line key={f} x1={stringSpacing} y1={f * fretSpacing} x2={stringSpacing * numStrings} y2={f * fretSpacing} stroke="#27272a" strokeWidth="1" />
          ))}

          {/* Cordas */}
          {Array.from({ length: numStrings }).map((_, i) => (
            <line key={i} x1={(i + 1) * stringSpacing} y1="0" x2={(i + 1) * stringSpacing} y2={height} stroke="#3f3f46" strokeWidth="1.2" />
          ))}

          {/* Bolinhas (Posição Relativa à baseFret) */}
          {positions.map((fret, stringIdx) => {
            const xPos = (stringIdx + 1) * stringSpacing;
            if (fret > 0) {
              // Calculamos a posição da bolinha subtraindo a baseFret para ela caber no diagrama
              const relativeFret = fret - baseFret + 1;
              return (
                <circle 
                  key={stringIdx}
                  cx={xPos} 
                  cy={(relativeFret * fretSpacing) - (fretSpacing / 2)} 
                  r="4.5" 
                  className="fill-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                />
              );
            }
            // Cordas soltas e abafadas permanecem no topo (y=-5 ou y=-8)
            if (fret === 0) return <circle key={stringIdx} cx={xPos} cy="-5" r="3" fill="none" stroke="#52525b" strokeWidth="1" />;
            if (fret === -1) return (
              <g key={stringIdx} stroke="#ef4444" strokeWidth="1.5">
                <line x1={xPos - 3} y1="-8" x2={xPos + 3} y2="-2" /><line x1={xPos + 3} y1="-8" x2={xPos - 3} y2="-2" />
              </g>
            );
            return null;
          })}
        </svg>
      </div>
    </div>
  );
}