// src/components/layout/RitmosNav.tsx
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
    <nav className="w-full bg-black border-b border-zinc-900 overflow-x-auto scrollbar-hide sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center gap-8 whitespace-nowrap">
        {RITMOS.map((ritmo) => (
          <Link
            key={ritmo.id}
            href={ritmo.slug}
            onClick={() => setAtivo(ritmo.id)}
            className={`text-xs font-bold uppercase tracking-[0.15em] transition-all relative h-full flex items-center ${
              ativo === ritmo.id ? 'text-yellow-500' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {ritmo.label}
            {ativo === ritmo.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 shadow-[0_-2px_8px_rgba(234,179,8,0.4)]" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}