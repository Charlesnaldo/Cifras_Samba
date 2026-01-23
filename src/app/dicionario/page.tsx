'use client';

import React, { useState } from 'react';
import ChordDiagram from '@/components/ui/ChordDiagram';
import { Search, Guitar } from 'lucide-react';
import { chordsData } from '@/data/chords';

export default function DicionarioPage() {
  const [busca, setBusca] = useState('');
  const [instrumento, setInstrumento] = useState<'cavaquinho' | 'violao'>('cavaquinho');
  
  const nomesAcordes = Object.keys(chordsData[instrumento].list);
  const filtrados = nomesAcordes.filter(n => n.toLowerCase().includes(busca.toLowerCase()));

  return (
    <main className="min-h-screen bg-zinc-950 pt-44 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header e Seletor de Instrumento */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-black text-white uppercase italic tracking-tighter">
              Chord<span className="text-emerald-500">Lib</span>
            </h1>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.4em]">Biblioteca de Acordes Profissional</p>
          </div>

          <div className="flex bg-zinc-900 p-1 rounded-2xl border border-white/5">
            <button 
              onClick={() => setInstrumento('cavaquinho')}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${instrumento === 'cavaquinho' ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-zinc-500 hover:text-white'}`}
            >
              Cavaquinho
            </button>
            <button 
              onClick={() => setInstrumento('violao')}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${instrumento === 'violao' ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-zinc-500 hover:text-white'}`}
            >
              Violão
            </button>
          </div>
        </div>

        {/* Barra de Busca */}
        <div className="relative group max-w-xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input 
            type="text"
            placeholder={`Buscar em ${instrumento}...`}
            className="w-full bg-zinc-900/50 border border-white/5 p-5 pl-14 rounded-2xl text-white outline-none focus:border-emerald-500/50 transition-all shadow-2xl"
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {/* Grid de Resultados */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filtrados.length > 0 ? (
            filtrados.map((nome) => (
              <div key={`${instrumento}-${nome}`} className="flex justify-center">
                <ChordDiagram name={nome} instrument={instrumento} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-zinc-800 rounded-[3rem]">
              <p className="text-zinc-600 italic">Nenhum acorde encontrado para "{busca}"</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}