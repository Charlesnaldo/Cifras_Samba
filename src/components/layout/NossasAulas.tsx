'use client';

import { AULAS } from '@/data/aulas';
import { Play, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function NossasAulas() {
  return (
    <section className="py-10 w-full max-w-7xl mx-auto px-6">
      
      {/* Cabeçalho Refinado e Simétrico */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-900">
        <div className="flex items-center gap-4">
          <div className="w-1 h-8 bg-emerald-500 rounded-full" />
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Aulas <span className="text-zinc-500 font-normal">de Samba & Pagode</span>
          </h3>
        </div>
        
        <Link 
          href="/aulas" 
          className="group flex items-center gap-2 text-[11px] font-bold text-zinc-500 hover:text-white transition-all tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-md"
        >
          Ver catálogo completo
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid com espaçamento equilibrado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {AULAS.map((aula) => (
          <Link 
            key={aula.id} 
            href={aula.urlYoutube} 
            target="_blank" 
            className="group relative bg-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            {/* Thumbnail Minimalista */}
            <div className="relative aspect-video overflow-hidden">
              {aula.thumbnail ? (
                <Image
                  src={aula.thumbnail}
                  alt={aula.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
                   <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800" />
                </div>
              )}
              
              {/* Badge de Nível Discreta */}
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-sm border border-white/5 text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">
                  {aula.nivel}
                </span>
              </div>
            </div>

            {/* Conteúdo com Tipografia Equilibrada */}
            <div className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-base font-semibold text-zinc-100 group-hover:text-emerald-500 transition-colors leading-tight">
                  {aula.titulo}
                </h4>
                <div className="mt-1 w-8 h-8 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={12} fill="currentColor" className="text-emerald-500 ml-0.5" />
                </div>
              </div>
              
              <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed font-normal">
                {aula.descricao}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
