'use client';
import { useState, useEffect } from 'react';
import { MousePointer2, ChevronUp, ChevronDown, Play, Pause } from 'lucide-react';

export default function AutoScroll() {
  const [active, setActive] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);

  // Função para chamar o scroll (pode ser disparada por um botão na página da música)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (active) {
      interval = setInterval(() => {
        window.scrollBy({ top: speed, behavior: 'smooth' });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [active, speed]);

  // Listener para o evento customizado que "chama" o scroll
  useEffect(() => {
    const handleToggle = () => setShowControls(prev => !prev);
    window.addEventListener('toggle-autoscroll', handleToggle);
    return () => window.removeEventListener('toggle-autoscroll', handleToggle);
  }, []);

  if (!showControls) return null; // Não renderiza nada se não for chamado

  return (
    <div className="fixed bottom-24 right-6 z-[110] flex flex-col items-end gap-2">
      <div className="bg-zinc-900/90 backdrop-blur-xl border border-emerald-500/30 p-2 rounded-2xl shadow-2xl flex flex-col gap-4 items-center">
        
        {/* Controle de Velocidade */}
        <div className="flex flex-col items-center gap-1">
          <button onClick={() => setSpeed(s => Math.min(s + 1, 10))} className="p-1 hover:text-emerald-500 transition-colors">
            <ChevronUp size={20} />
          </button>
          <span className="text-[10px] font-black text-emerald-500">{speed}x</span>
          <button onClick={() => setSpeed(s => Math.max(s - 1, 1))} className="p-1 hover:text-emerald-500 transition-colors">
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Botão Play/Pause */}
        <button 
          onClick={() => setActive(!active)}
          className={`p-3 rounded-full transition-all ${active ? 'bg-red-500 text-white' : 'bg-emerald-500 text-black'}`}
        >
          {active ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
        </button>
      </div>

      {/* Botão para fechar o controle */}
      <button 
        onClick={() => setShowControls(false)}
        className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest border border-white/5"
      >
        Fechar ×
      </button>
    </div>
  );
}