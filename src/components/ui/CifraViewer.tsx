'use client';

import { useState } from 'react';
import { useMusic } from '@/hooks/useMusic';
import ChordDiagram from '@/components/ui/ChordDiagram';
import TransposeControl from '@/components/music/TransposeControl';

import { Guitar, Music2, Share2 } from 'lucide-react';

export default function CifraViewer({ musica }: { musica: any }) {
  const [instrumento, setInstrumento] = useState<'cavaquinho' | 'violao'>('cavaquinho');
  

  const { transposedContent, semitones, setSemitones } = useMusic(musica?.conteudo || "");

  // Extração básica de acordes (para os diagramas do topo)
  const extrairAcordes = (texto: string) => {
    const matches = texto.match(/\[(.*?)\]/g);
    return matches ? Array.from(new Set(matches.map(m => m.replace('[', '').replace(']', '')))) : [];
  };

  const acordesUnicos = extrairAcordes(musica?.conteudo || "");

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans">
      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Header da Música */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-zinc-800 pb-8">
          <div>
            <div className="flex items-center gap-2 text-yellow-500 mb-2 uppercase tracking-[0.2em] text-xs font-black">
              <Music2 size={14} /> Samba & Pagode
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase text-white">
              {musica?.titulo}
            </h1>
            <p className="text-zinc-400 text-xl font-medium mt-2">{musica?.artista}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Instrumento</span>
              <select 
                value={instrumento}
                onChange={(e) => setInstrumento(e.target.value as any)}
                className="bg-zinc-900 border border-zinc-800 text-white p-2.5 rounded-xl text-sm font-bold outline-none focus:border-yellow-500 transition-colors cursor-pointer"
              >
                <option value="cavaquinho">Cavaquinho</option>
                <option value="violao">Violão</option>
              </select>
            </div>
            <TransposeControl semitones={semitones} setSemitones={setSemitones} />
          </div>
        </div>

        {/* Grade de Acordes Moderna */}
        <div className="mb-12">
          <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
            <Guitar size={14} /> Acordes na música
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {acordesUnicos.map(ac => (
              <ChordDiagram key={ac} name={ac} instrument={instrumento} />
            ))}
          </div>
        </div>

        {/* Área da Cifra com Fonte Monospaced e Neon */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
          
          <pre className="font-mono text-xl md:text-2xl leading-[4rem] whitespace-pre-wrap text-zinc-400">
            {transposedContent.split(/(\[.*?\])/g).map((part, i) => {
              if (part.startsWith('[') && part.endsWith(']')) {
                return (
                  <span key={i} className="text-yellow-400 font-black drop-shadow-[0_0_10px_rgba(250,204,21,0.3)] mx-1">
                    {part.replace('[', '').replace(']', '')}
                  </span>
                );
              }
              return part;
            })}
          </pre>
        </div>

        {/* Rodapé de Ações */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3 rounded-2xl font-bold transition-all border border-zinc-800">
            <Share2 size={18} /> Compartilhar
          </button>
        </div>
      </div>
    </div>
  );
}