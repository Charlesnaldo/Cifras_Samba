'use client';

import { AULAS } from '@/data/aulas';
import { Play, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function NossasAulas() {
  return (
    <section className="py-16 w-full max-w-7xl mx-auto px-6 md:px-10">
      
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">
            Cursos Gratuitos
          </h2>
          <h3 className="text-4xl font-light text-white tracking-tighter">
            Nossas <span className="italic text-emerald-500 font-serif">aulas</span>
          </h3>
        </div>
        
        <Link 
          href="/aulas" 
          className="group flex items-center gap-2 text-[10px] font-black text-zinc-400 hover:text-emerald-400 transition-colors tracking-widest"
        >
          EXPLORAR ACADEMIA
          <GraduationCap size={14} className="group-hover:text-emerald-500 transition-colors" />
        </Link>
      </div>

      {/* Grid de Vídeo Aulas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {AULAS.map((aula) => (
          <Link 
            key={aula.id} 
            href={aula.urlYoutube} 
            target="_blank" 
            className="group flex flex-col gap-4"
          >
            {/* Container da Thumbnail com Aspect Ratio de Cinema */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-500 group-hover:border-emerald-500/30">
              {aula.thumbnail ? (
                <img 
                  src={aula.thumbnail} 
                  alt={aula.titulo}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Play size={32} className="text-zinc-800" />
                </div>
              )}
              
              {/* Overlay de Gradiente para legibilidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />

              {/* Botão de Play Minimalista no centro */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-zinc-950/40 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-emerald-500 group-hover:border-transparent group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-500">
                  <Play size={16} className="text-white group-hover:text-black fill-current ml-1" />
                </div>
              </div>
            </div>

            {/* Texto e Informações */}
            <div className="space-y-2 px-1">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                  {aula.nivel}
                </span>
                <div className="h-px flex-1 bg-zinc-800 group-hover:bg-emerald-500/20 transition-colors" />
              </div>
              
              <h4 className="text-lg font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors leading-snug">
                {aula.titulo}
              </h4>
              
              <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                {aula.descricao}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}