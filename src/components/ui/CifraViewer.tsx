'use client';

import { useState } from 'react';
import { 
  Maximize2, 
  Settings2, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown,
  Printer,
  Share2
} from 'lucide-react';

export default function CifraViewer({ musica }: any) {
  const [tom, setTom] = useState(musica.tom);
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto px-6 py-12">
      
      {/* COLUNA ESQUERDA: Ferramentas (Inspirado no Sidebar do Cifra Club, mas Moderno) */}
      <aside className="lg:w-48 order-2 lg:order-1 flex lg:flex-col gap-3 flex-wrap">
        <div className="w-full space-y-4">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Ferramentas</p>
          
          {/* Controle de Tom */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-2 flex flex-col gap-1">
            <button className="flex items-center justify-between p-3 hover:bg-zinc-800 rounded-xl transition-colors group">
              <span className="text-xs font-medium text-zinc-400">Tom</span>
              <span className="text-sm font-bold text-yellow-500">{tom}</span>
            </button>
            <div className="flex gap-1 px-1 pb-1">
              <button onClick={() => {}} className="flex-1 py-2 bg-zinc-800 rounded-lg flex justify-center hover:text-yellow-500 transition-colors">
                <ArrowDown size={14} />
              </button>
              <button onClick={() => {}} className="flex-1 py-2 bg-zinc-800 rounded-lg flex justify-center hover:text-yellow-500 transition-colors">
                <ArrowUp size={14} />
              </button>
            </div>
          </div>

          {/* Controle de Fonte */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-2 flex items-center justify-around">
            <button onClick={() => setFontSize(f => f - 1)} className="p-2 text-zinc-400 hover:text-white">-A</button>
            <span className="text-[10px] text-zinc-600 font-bold">{fontSize}px</span>
            <button onClick={() => setFontSize(f => f + 1)} className="p-2 text-zinc-400 hover:text-white">+A</button>
          </div>

          {/* Botões de Ação Rápida */}
          <button className="w-full flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-xs font-medium text-zinc-400 hover:border-yellow-500/50 hover:text-white transition-all">
            <RotateCcw size={16} /> Exibição Simples
          </button>
          <button className="w-full flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-xs font-medium text-zinc-400 hover:border-yellow-500/50 hover:text-white transition-all">
            <Printer size={16} /> Imprimir
          </button>
        </div>
      </aside>

      {/* COLUNA CENTRAL: A Cifra (O Coração da página) */}
      <main className="flex-1 order-1 lg:order-2">
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-4">
             <span className="px-3 py-1 bg-yellow-500 text-black text-[10px] font-black uppercase rounded-full tracking-tighter">
               {musica.ritmo}
             </span>
             <span className="text-zinc-600 text-xs font-medium italic">Sugerida por @MestreDoSamba</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
            {musica.titulo}
          </h1>
          <h2 className="text-xl md:text-2xl font-light text-zinc-500 mt-2">{musica.artista}</h2>
        </header>

        {/* Área de Texto da Cifra */}
        <div 
          className="cifra-content bg-zinc-950/30 border border-zinc-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
          style={{ fontSize: `${fontSize}px` }}
        >
          <pre className="font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap overflow-x-auto">
            {/* Exemplo de como os acordes devem aparecer destacados */}
            <span className="text-yellow-500 font-bold block mb-1">C7M       Am7</span>
            O amor é feito de paixões<br />
            <span className="text-yellow-500 font-bold block mt-4 mb-1">Dm7       G7</span>
            E quando perde a razão...
          </pre>
        </div>
      </main>

      {/* COLUNA DIREITA: Dicionário de Acordes (Inspirado no modal do Cifra Club) */}
      <aside className="lg:w-64 order-3 hidden xl:block">
        <div className="sticky top-24 space-y-6">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Acordes utilizados</p>
          <div className="grid grid-cols-2 gap-4">
            {/* Mock de Acordes */}
            {['C7M', 'Am7', 'Dm7', 'G7'].map(chord => (
              <div key={chord} className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-yellow-500/30 transition-all cursor-pointer group">
                <span className="text-sm font-bold text-zinc-400 group-hover:text-yellow-500">{chord}</span>
                <div className="w-20 h-24 bg-zinc-800/50 rounded-lg flex items-center justify-center border border-zinc-700/50">
                   {/* Aqui entraria o seu componente SVG de ChordDiagram */}
                   <div className="text-[8px] text-zinc-600 uppercase">Diagrama</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

    </div>
  );
}