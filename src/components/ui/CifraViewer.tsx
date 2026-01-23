'use client';

import { useState, useEffect } from 'react';
import { RotateCcw, ArrowUp, ArrowDown, Printer, Mic2, PlayCircle, EyeOff } from 'lucide-react';
import { Musica } from '@/components/music/musicas';

export default function CifraViewer({ musica }: { musica: Musica }) {
  const [fontSize, setFontSize] = useState(16);
  const [tom, setTom] = useState(musica.tom);

  // Mantém a comunicação com o componente AutoScroll
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('toggle-autoscroll', { detail: { show: true } }));
    return () => {
      window.dispatchEvent(new CustomEvent('toggle-autoscroll', { detail: { show: false } }));
    };
  }, []);

  const processarLinha = (linha: string, idx: number) => {
    if (linha.trim().startsWith('[') && !linha.includes('] ')) {
      return (
        <div className={`text-[13px] font-black text-zinc-600 uppercase tracking-[0.3em] ${idx === 0 ? 'mt-0' : 'mt-2'} mb-4 border-l-2 border-emerald-500 pl-4`}>
          {linha.replace(/[\[\]]/g, '')}
        </div>
      );
    }

    const regex = /(\[[^\]]+\][^\[]*)/g;
    const blocos = linha.split(regex).filter(Boolean);

    return (
      /* ADICIONADO mt-6 APENAS PARA O RESPIRO ENTRE AS LINHAS DE NOTAS */
      <div className={`flex flex-wrap items-end pl-2 ${idx === 0 ? 'mt-0' : 'mt-6'} min-h-[2.0rem]`}>
        {blocos.map((bloco: string, i: number) => {
          if (bloco.startsWith('[')) {
            const match = bloco.match(/\[([^\]]+)\](.*)/);
            if (match) {
              const [_, nota, texto] = match;
              return (
                <div key={i} className="flex flex-col items-start leading-none">
                  <span className="text-emerald-400 font-black text-[0.75em] mb-3 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] h-4">
                    {nota}
                  </span>

                  {/* Fonte da musica letra */}
                  <span className="text-zinc-100 whitespace-pre">{texto || '\u00A0'}</span>
                  {/* -----------------------*/}

                </div>
              );
            }
          }
          return <span key={i} className="text-zinc-300 whitespace-pre leading-none pb-[2px]">{bloco}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto px-2 md:px-6 py-6 md:py-12">

      {/* Sidebar de Ferramentas */}
      <aside className="lg:w-52 w-full order-2 lg:order-1 px-2 md:px-0">
        <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-4">
          <p className="hidden lg:block text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4 px-2 text-center">Ajustes</p>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">



            {/* --------------------------------------------------- */}
            {/* BOTÃO  de Rolagem */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-autoscroll', { detail: { show: true } }))}
              className="col-span-2 lg:col-span-1 flex items-center justify-center gap-2 p-3 bg-emerald-500 text-black rounded-xl text-[10px] cursor-pointer font-black uppercase shadow-lg shadow-emerald-500/20"
            >
              <EyeOff size={14} fill="currentColor " /> Rolagem Automatica
            </button>

            {/* --------------------------------------------------- */}


            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-zinc-500 uppercase px-2 text-center">Tom</span>
              <div className="flex items-center justify-between bg-zinc-800/50 rounded-xl p-2">
                <button className="p-2 hover:text-emerald-500"><ArrowDown size={14} /></button>
                <span className="text-emerald-400 font-black text-sm">{tom}</span>
                <button className="p-2 hover:text-emerald-500"><ArrowUp size={14} /></button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-zinc-500 uppercase px-2 text-center">Fonte</span>
              <div className="flex items-center justify-between bg-zinc-800/50 rounded-xl p-2">
                <button onClick={() => setFontSize(s => s - 1)} className="p-2 hover:text-emerald-500">-</button>
                <span className="text-zinc-300 font-bold text-xs">{fontSize}</span>
                <button onClick={() => setFontSize(s => s + 1)} className="p-2 hover:text-emerald-500">+</button>
              </div>
            </div>

            {/* Botão de imprimir */}

            <div className="col-span-2 lg:col-span-1 flex gap-2">
              <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-2 p-3 bg-zinc-800/50 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:text-emerald-400 transition-all">
                <Printer size={14} /> <span className="hidden lg:inline">Imprimir</span>

                {/* Botão da Fonte */}
              </button>
              <button onClick={() => setFontSize(16)} className="flex-1 flex items-center justify-center gap-2 p-3 bg-zinc-800/50 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:text-emerald-400 transition-all">
                <RotateCcw size={14} /> <span className="hidden lg:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Área da Música */}
      <main className="flex-1 order-1 lg:order-2 w-full">
        <header className="mb-4 flex justify-between items-end px-3 md:px-0">
          <div className="space-y-2">
            <span className="text-[10px] font-black bg-emerald-500 text-black px-6 py-1 rounded-full uppercase italic">
              {musica.ritmo}
            </span>

            {/* Aqui altera o titulo da musica */}

            <h1 className="text-2xl text-white mt-4 uppercase tracking-tighter leading-none">
              {musica.titulo}
            </h1>
            {/* Aqui altera o nome da banda */}


            <h2 className="text-xl font-light text-zinc-500 italic uppercase tracking-widest flex items-center gap-2">

              {/* Aqui altera o microfone  */}

              <Mic2 size={19} className="text-emerald-500" /> {musica.artista}

              {/* Aqui altera o microfone  */}
            </h2>
          </div>

          {musica.fotoArtista && (
            <div className="relative">
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-emerald-500/20 p-1">
                <img src={musica.fotoArtista} className="w-full h-full object-cover rounded-full grayscale" alt={musica.artista} />
              </div>
            </div>
          )}
        </header>

        {/* BOTÃO MOBILE ADICIONADO AQUI ACIMA DA CIFRA */}
        <div className="md:hidden cursor-pointer flex justify-center mb-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-autoscroll', { detail: { show: true } }))}
            className="flex items-center cursor-pointer gap-2 px-6 py-2 bg-emerald-500 text-black rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            <PlayCircle size={10} fill="currentColor " /> Iniciar Rolagem
          </button>
        </div>

        <div
          /* MANTIDAS SUAS MARGENS ORIGINAIS ABAIXO */
          className="bg-zinc-800/70 border border-white/5 rounded-[2rem] md:rounded-[3rem] pt-2 px-1 pb-1 md:pt-2 md:px-8 md:pb-8 font-mono shadow-xl"
          style={{ fontSize: `${fontSize}px` }}
        >
          <div className="w-full break-words">
            {musica.cifra.split('\n').map((linha: string, idx: number) => (
              <div
                key={idx}
                className={idx === 0 ? "mb-0" : "mb-0"}
              >
                {processarLinha(linha, idx)}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}