'use client';

import { useState } from 'react';
import { 
  Maximize2, 
  Settings2, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown,
  Printer,
  Share2,
  Music2
} from 'lucide-react';

export default function CifraViewer({ musica }: any) {
  const [tom, setTom] = useState(musica.tomOriginal || 'C');
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto px-6 py-12">
      
      {/* COLUNA ESQUERDA: Ferramentas (Minimalista e Verde) */}
      <aside className="lg:w-48 order-2 lg:order-1 flex lg:flex-col gap-3 flex-wrap">
        <div className="w-full space-y-4">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] px-2">Ferramentas</p>
          
          {/* Controle de Tom */}
          <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/[0.05] rounded-3xl p-2 flex flex-col gap-1">
            <div className="flex items-center justify-between p-3">
              <span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">Tom</span>
              <span className="text-sm font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">{tom}</span>
            </div>
            <div className="flex gap-1 px-1 pb-1">
              <button onClick={() => {}} className="flex-1 py-2 bg-zinc-800/50 rounded-xl flex justify-center hover:text-emerald-400 hover:bg-zinc-800 transition-all">
                <ArrowDown size={14} />
              </button>
              <button onClick={() => {}} className="flex-1 py-2 bg-zinc-800/50 rounded-xl flex justify-center hover:text-emerald-400 hover:bg-zinc-800 transition-all">
                <ArrowUp size={14} />
              </button>
            </div>
          </div>

          {/* Controle de Fonte */}
          <div className="bg-zinc-900/40 border border-white/[0.05] rounded-3xl p-2 flex items-center justify-around">
            <button onClick={() => setFontSize(f => Math.max(f - 1, 12))} className="p-2 text-zinc-500 hover:text-emerald-400 transition-colors font-bold">-A</button>
            <span className="text-[10px] text-zinc-600 font-black uppercase tracking-tighter">{fontSize}px</span>
            <button onClick={() => setFontSize(f => Math.min(f + 1, 24))} className="p-2 text-zinc-500 hover:text-emerald-400 transition-colors font-bold">+A</button>
          </div>

          {/* Botões de Ação Rápida */}
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-4 bg-zinc-900/40 border border-white/[0.05] rounded-3xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:border-emerald-500/30 hover:text-emerald-400 transition-all group">
              <RotateCcw size={14} className="group-hover:rotate-[-45deg] transition-transform" /> Exibição Simples
            </button>
            <button className="w-full flex items-center gap-3 p-4 bg-zinc-900/40 border border-white/[0.05] rounded-3xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:border-emerald-500/30 hover:text-emerald-400 transition-all">
              <Printer size={14} /> Imprimir
            </button>
          </div>
        </div>
      </aside>

      {/* COLUNA CENTRAL: A Cifra */}
      <main className="flex-1 order-1 lg:order-2">
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-4">
             <span className="px-4 py-1.5 bg-emerald-500 text-black text-[10px] font-black uppercase rounded-full tracking-wider shadow-lg shadow-emerald-500/20">
               {musica.ritmo || 'Samba'}
             </span>
             <div className="h-px w-12 bg-zinc-800" />
             <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest italic">Contribuição de Mestre</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.85]">
            {musica.titulo}
          </h1>
          <h2 className="text-xl md:text-2xl font-light text-zinc-500 mt-4 tracking-tight">
            {musica.artista}
          </h2>
        </header>

        {/* Área de Texto da Cifra com efeito Neon nos Acordes */}
        <div 
          className="cifra-content bg-zinc-900/20 border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-sm"
          style={{ fontSize: `${fontSize}px` }}
        >
          <pre className="font-mono text-zinc-300 leading-[2.2] whitespace-pre-wrap overflow-x-auto selection:bg-emerald-500/30">
            {/* O conteúdo virá do banco de dados. Exemplo de renderização com realce: */}
            <span className="text-emerald-400 font-black drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">C7M          Am7</span><br />
            O amor é feito de paixões<br />
            <span className="text-emerald-400 font-black drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">Dm7          G7</span><br />
            E quando perde a razão...
          </pre>
        </div>
      </main>

      {/* COLUNA DIREITA: Dicionário de Acordes */}
      <aside className="lg:w-64 order-3 hidden xl:block">
        <div className="sticky top-24 space-y-6">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] px-2">Dicionário de Acordes</p>
          <div className="grid grid-cols-2 gap-3">
            {['C7M', 'Am7', 'Dm7', 'G7'].map(chord => (
              <div key={chord} className="bg-zinc-900/40 border border-white/[0.05] rounded-3xl p-4 flex flex-col items-center gap-3 hover:border-emerald-500/30 transition-all cursor-pointer group hover:bg-zinc-900/60">
                <span className="text-xs font-black text-zinc-500 group-hover:text-emerald-400 transition-colors uppercase tracking-tighter">{chord}</span>
                <div className="w-full aspect-[3/4] bg-zinc-950/50 rounded-2xl flex items-center justify-center border border-zinc-800 group-hover:border-emerald-500/20 transition-all">
                   <div className="text-[8px] text-zinc-700 font-bold uppercase tracking-widest group-hover:text-zinc-500">SVG Chord</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

    </div>
  );
}