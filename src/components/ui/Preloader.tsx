'use client';
import { Music2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Força o preloader a ficar na tela por 2.5 segundos para teste
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Se o componente ainda não montou no navegador ou já parou de carregar, não renderiza nada
  if (!mounted || !loading) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center">
      {/* Elemento de Brilho de Fundo */}
      <div className="absolute w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full animate-pulse" />
      
      <div className="relative flex flex-col items-center">
        {/* Ícone com Animação */}
        <div className="animate-bounce">
          <Music2 size={60} className="text-yellow-500" strokeWidth={1.5} />
        </div>
        
        {/* Texto e Barra de Progresso */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
            CifraSamba
          </span>
          
          {/* Barra de progresso visual */}
          <div className="w-40 h-[1px] bg-zinc-900 overflow-hidden relative">
            <div className="absolute inset-0 bg-yellow-500/50 animate-loading-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}