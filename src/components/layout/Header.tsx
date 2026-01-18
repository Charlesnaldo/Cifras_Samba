'use client';
import { Search, Music2, User, Bell } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) params.set('q', term);
    else params.delete('q');
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="hidden md:flex sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8 w-full">
        
        {/* Logo com Roxo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-emerald-600 p-1.5 rounded-lg transition-transform group-hover:rotate-12">
            <Music2 className="text-white" size={20} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-black tracking-tighter text-white uppercase italic">
            Cifra<span className="text-emerald-500">Samba</span>
          </span>
        </Link>

        {/* Barra de Pesquisa */}
        <div className="flex-1 max-w-2xl relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="O que você quer tocar hoje?" 
            defaultValue={searchParams.get('q')?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-200 py-2 px-12 rounded-xl text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
        </div>

        {/* Notificações e Perfil */}
        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-emerald-400 transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
          </button>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-600 to-indigo-600 flex items-center justify-center cursor-pointer border border-white/10 hover:scale-105 transition-transform">
            <User size={18} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}