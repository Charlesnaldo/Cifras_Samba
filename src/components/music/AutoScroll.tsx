'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Play, Pause, MousePointer2 } from 'lucide-react';

export default function AutoScroll() {
  const [active, setActive] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);

  // Lógica do Scroll
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (active) {
      interval = setInterval(() => {
        window.scrollBy({ top: speed, behavior: 'auto' }); // 'auto' é mais preciso para intervalos curtos
      }, 50);
    }
    return () => clearInterval(interval);
  }, [active, speed]);

  // Listener para ativar o controle (chamado pela página da música)
  useEffect(() => {
    const handleToggle = () => setShowControls(prev => !prev);
    window.addEventListener('toggle-autoscroll', handleToggle);
    return () => window.removeEventListener('toggle-autoscroll', handleToggle);
  }, []);

  if (!showControls) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[110] flex flex-col items-end gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Container Principal */}
      <div className={`
        bg-zinc-950/80 backdrop-blur-2xl border border-white/[0.05] shadow-2xl transition-all duration-500 overflow-hidden
        ${active ? 'p-2 rounded-full' : 'p-3 rounded-[2rem]'}
      `}>
        
        <div className={`flex flex-col items-center gap-4 ${active ? 'opacity-40 hover:opacity-100 transition-opacity' : ''}`}>
          
          {/* Controles de Velocidade - Escondidos quando ativo para diminuir o tamanho */}
          {!active && (
            <div className="flex flex-col items-center border-b border-white/[0.05] pb-2 w-full">
              <button 
                onClick={() => setSpeed(s => Math.min(s + 1, 10))} 
                className="p-1 text-zinc-500 hover:text-emerald-400 transition-colors"
              >
                <ChevronUp size={18} />
              </button>
              
              <div className="flex flex-col items-center -my-1">
                <span className="text-[10px] font-black text-emerald-500 tracking-tighter">{speed}</span>
                <span className="text-[7px] font-bold text-zinc-600 uppercase italic">vel</span>
              </div>

              <button 
                onClick={() => setSpeed(s => Math.max(s - 1, 1))} 
                className="p-1 text-zinc-500 hover:text-emerald-400 transition-colors"
              >
                <ChevronDown size={18} />
              </button>
            </div>
          )}

          {/* Botão Play/Pause - Única coisa que sobra quando ativo */}
          <button 
            onClick={() => setActive(!active)}
            className={`
              relative flex items-center justify-center transition-all duration-500
              ${active 
                ? 'w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20' 
                : 'w-12 h-12 bg-emerald-500 text-black rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)]'
              }
            `}
          >
            {active ? (
              <Pause size={20} fill="currentColor" className="animate-pulse" />
            ) : (
              <Play size={20} fill="currentColor" className="ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Botão de Fechar Minimalista */}
      {!active && (
        <button 
          onClick={() => setShowControls(false)}
          className="bg-zinc-900/50 hover:bg-zinc-800 text-zinc-500 px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border border-white/[0.05] transition-all"
        >
          Encerrar ×
        </button>
      )}
    </div>
  );
}