'use client';

import { useState } from 'react';
import Link from 'next/link';

const RITMOS = [
  { id: 'todos', label: 'Todos', slug: '/' },
  { id: 'pagode-90', label: 'Pagode 90', slug: '/ritmos/pagode-90' },
  { id: 'samba-raiz', label: 'Samba de Raiz', slug: '/ritmos/samba-raiz' },
  { id: 'partido-alto', label: 'Partido Alto', slug: '/ritmos/partido-alto' },
  { id: 'samba-enredo', label: 'Samba-Enredo', slug: '/ritmos/samba-enredo' },
  { id: 'pagode-atual', label: 'Pagode Atual', slug: '/ritmos/pagode-atual' },
  { id: 'chorinho', label: 'Chorinho', slug: '/ritmos/chorinho' },
];

export default function RitmosNav() {
  const [ativo, setAtivo] = useState('todos');

  return (
    <nav className="hidden md:flex fixed top-20 left-0 w-full z-40 bg-zinc-950/40 backdrop-blur-md border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center gap-8 overflow-x-auto scrollbar-hide">
        {RITMOS.map((ritmo) => (
          <Link
            key={ritmo.id}
            href={ritmo.slug}
            onClick={() => setAtivo(ritmo.id)}
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative h-full flex items-center shrink-0 ${
              ativo === ritmo.id ? 'text-accent-strong' : 'text-zinc-500 hover:text-zinc-200'
            }`}
          >
            {ritmo.label}

            {ativo === ritmo.id && (
              <div className="absolute bottom-0 left-0 w-full flex justify-center">
                <span className="w-full h-[2px] bg-accent z-10" />
                <span className="absolute bottom-0 w-full h-[6px] bg-accent-strong/30 blur-md" />
              </div>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
