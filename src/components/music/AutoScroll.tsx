'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, Play, Pause } from 'lucide-react';

export default function AutoScroll() {
  const [active, setActive] = useState(false);
  const [speed, setSpeed] = useState(0.5); // Começa bem lento
  const [showControls, setShowControls] = useState(false);
  
  // Ref para acumular os decimais do scroll
  const scrollAccumulator = useRef(0);
  const speedRef = useRef(speed);

  // Sincroniza a ref com o estado para o setInterval sempre ter o valor atual
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (active) {
      // Rodando a cada 20ms para suavidade (50 FPS)
      interval = setInterval(() => {
        // Acumulamos a velocidade (ex: 0.2 + 0.2 + 0.2...)
        scrollAccumulator.current += speedRef.current;

        // Quando o acumulado for maior ou igual a 1 pixel, a gente rola
        if (scrollAccumulator.current >= 1) {
          const pixelsToScroll = Math.floor(scrollAccumulator.current);
          window.scrollBy({ top: pixelsToScroll, behavior: 'auto' });
          
          // Mantemos o resto (ex: se era 1.2, sobra 0.2 para a próxima volta)
          scrollAccumulator.current -= pixelsToScroll;
        }
      }, 20); 
    } else {
      scrollAccumulator.current = 0;
    }

    return () => clearInterval(interval);
  }, [active]);

  // Listener para o evento (mesma lógica anterior)
  useEffect(() => {
    const handleToggle = () => setShowControls(prev => !prev);
    window.addEventListener('toggle-autoscroll', handleToggle);
    return () => window.removeEventListener('toggle-autoscroll', handleToggle);
  }, []);

  if (!showControls) return null;

  return (
    <div className="fixed bottom-5 right-6 z-[2000] pointer-events-none flex flex-col items-end gap-3 animate-in fade-in slide-in-from-right-4">
      <div className={`
        pointer-events-auto bg-zinc-950/10 backdrop-blur-2xl border border-white/10 shadow-3xl transition-all duration-500
        ${active ? 'p-1.3 rounded-full' : 'p-3 rounded-[2rem]'}
      `}>
        <div className={`flex flex-col items-center gap-4 ${active ? 'opacity-40 hover:opacity-100 transition-opacity' : ''}`}>
          
          {!active && (
            <div className="flex flex-col items-center border-b border-white/10 pb-2 w-full">
              <button 
                onClick={() => setSpeed(s => Number((Math.min(s + 0.1, 5)).toFixed(1)))} 
                className="p-1 text-zinc-400 hover:text-emerald-400"
              >
                <ChevronUp size={20} />
              </button>
              
              <div className="flex flex-col items-center -my-1">
                <span className="text-xs font-black text-emerald-500 tabular-nums">{speed.toFixed(1)}</span>
                <span className="text-[7px] font-bold text-zinc-600 uppercase italic">vel</span>
              </div>

              <button 
                onClick={() => setSpeed(s => Number((Math.max(s - 0.1, 0.1)).toFixed(1)))} 
                className="p-1 text-zinc-400 hover:text-emerald-400"
              >
                <ChevronDown size={20} />
              </button>
            </div>
          )}

          <button 
            onClick={() => setActive(!active)}
            className={`flex cursor-pointer items-center justify-center transition-all ${active ? 'w-8 h-8 bg-emerald-500/20 text-emerald-500 rounded-full' : 'w-12 h-12 bg-emerald-500 text-black rounded-2xl'}`}
          >
            {active ? <Pause size={20} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-1" />}
          </button>
        </div>
      </div>
    </div>
  );
}