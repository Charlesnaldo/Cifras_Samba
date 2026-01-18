'use client';
import { Play, Sparkles, Music } from 'lucide-react';

export default function Banner() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 mt-10">
      {/* Background com Gradientes Estáticos (Estilo Apple Music) */}
      <div className="relative h-[300px] w-full rounded-[2.5rem] overflow-hidden bg-[#050505] border border-white/5 shadow-2xl flex items-center">
        
        {/* Camadas de Brilho Lilás/Roxo */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-emerald-600/10 to-transparent" />
        <div className="absolute -right-10 -top-20 w-[450px] h-[450px] bg-emerald-600/20 blur-[120px] rounded-full" />
        <div className="absolute right-[5%] bottom-[-50px] w-[300px] h-[300px] bg-emerald-500/20 blur-[100px] rounded-full" />

        {/* Conteúdo à Esquerda */}
        <div className="relative z-20 pl-12 md:pl-20 w-full md:w-3/5">
          <div className="flex items-center gap-2 mb-4">
             <div className="p-1.5 bg-emerald-500/20 rounded-md border border-emerald-500/30">
               <Sparkles className="text-emerald-400" size={14} />
             </div>
             <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em]">
               Novidade
             </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1]">
            O Samba <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-violet-400 to-indigo-400">
              agora é roxo.
            </span>
          </h2>
          
          <button className="mt-8 flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-2xl font-bold transition-all hover:bg-emerald-500 hover:text-white">
            <Play size={18} fill="currentColor" />
            Explorar Cifras
          </button>
        </div>

        {/* Ícone ou Imagem Decorativa à Direita (Substituindo o 3D) */}
        <div className="hidden md:flex absolute right-20 items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/40 blur-[80px] rounded-full" />
            <Music size={140} className="text-white/10 relative z-10 rotate-12" />
          </div>
        </div>

      </div>
    </div>
  );
}