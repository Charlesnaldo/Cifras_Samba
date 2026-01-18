'use client';

import { Search, Music2, User, Bell } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Função de busca que atualiza a URL em tempo real
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    // Faz a navegação para a home com o parâmetro de busca ?q=...
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-black/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-white p-1 rounded-md transition-transform group-hover:scale-105">
            <Music2 className="text-black" size={20} strokeWidth={3} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white uppercase italic hidden sm:block">
            Cifras<span className="text-zinc-500">Samba</span>
          </span>
        </Link>

        {/* Barra de Pesquisa */}
        <div className="flex-1 max-w-2xl relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="O que você quer tocar hoje?" 
            defaultValue={searchParams.get('q')?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-zinc-900/40 border border-zinc-800 text-zinc-200 py-2.5 px-12 rounded-xl text-sm transition-all focus:outline-none focus:bg-zinc-900 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
          />
        </div>

        {/* Perfil (Simplificado) */}
        <div className="flex items-center gap-5 shrink-0">
          <button className="text-zinc-500 hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full border-2 border-black"></span>
          </button>
          <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center cursor-pointer">
            <User size={16} className="text-zinc-400" />
          </div>
        </div>

      </div>
    </header>
  );
}