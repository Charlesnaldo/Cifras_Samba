'use client';

import { useState } from 'react';
import { ChevronLeft, Music, BookOpen } from 'lucide-react';
import Link from 'next/link';
import ChordDiagram from '@/components/ui/ChordDiagram';

const NOTAS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function DicionarioPage() {
  const [notaSelecionada, setNotaSelecionada] = useState('C');

  // Mock de dados mais realístico para Cavaco (4 cordas)
  const acordesExemplo = [
    { nome: `${notaSelecionada}`, posicoes: [2, 0, 1, 0] },
    { nome: `${notaSelecionada}m`, posicoes: [1, 0, 1, 1] },
    { nome: `${notaSelecionada}7`, posicoes: [3, 0, 1, 2] },
    { nome: `${notaSelecionada}m7`, posicoes: [1, 0, 1, 0] },
    { nome: `${notaSelecionada}6`, posicoes: [2, 2, 1, 2] },
    { nome: `${notaSelecionada}dim`, posicoes: [1, 2, 1, 2] },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-20">
      {/* Header Minimalista (Sem Hero) */}
      <nav className="border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-emerald-500 transition-all group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Voltar</span>
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-emerald-500" />
            <span className="text-xs font-black uppercase tracking-tighter italic">Dicionário de Acordes</span>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* Seletor de Notas - Compacto e Elegante */}
        <div className="text-center mb-10">
          <p className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.4em] mb-4">Selecione a Tônica</p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {NOTAS.map((nota) => (
              <button
                key={nota}
                onClick={() => setNotaSelecionada(nota)}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full text-sm font-black transition-all duration-300 border ${
                  notaSelecionada === nota 
                  ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                  : 'bg-zinc-900 text-zinc-500 border-white/5 hover:border-emerald-500/30 hover:text-zinc-300'
                }`}
              >
                {nota}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Acordes - Com mais clareza e espaçamento */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
          {acordesExemplo.map((acorde) => (
            <ChordDiagram 
              key={acorde.nome} 
              nome={acorde.nome} 
              posicoes={acorde.posicoes} 
            />
          ))}
        </div>
      </div>
    </main>
  );
}