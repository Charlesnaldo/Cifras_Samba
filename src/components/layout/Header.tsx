'use client';
import { Search, Music2, User, Bell, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface HeaderProps {
  isMinimized?: boolean;
}

export default function Header({ isMinimized }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) params.set('q', term);
    else params.delete('q');
    router.push(`/?${params.toString()}`);
  };

  return (
    <header 
      className={`hidden md:flex fixed top-0 z-[60] w-full transition-all duration-500 ${
        isMinimized 
          ? 'h-14 bg-zinc-950/90 border-b border-zinc-900' 
          : 'h-20 bg-zinc-950/40 backdrop-blur-md border-b border-white/[0.05]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-8 w-full">
        
        {/* Logo / Botão Voltar */}
        <div className="flex items-center gap-4">
          {isMinimized && (
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-500 p-1.5 rounded-lg transition-transform group-hover:rotate-12">
              <Music2 className="text-black" size={isMinimized ? 16 : 20} strokeWidth={2.5} />
            </div>
            <span className={`font-black tracking-tighter text-white uppercase italic transition-all ${
              isMinimized ? 'text-base' : 'text-xl'
            }`}>
              Cifra<span className="text-emerald-500">Samba</span>
            </span>
          </Link>
        </div>

        {/* Barra de Pesquisa */}
        <div className={`flex-1 transition-all duration-500 ${isMinimized ? 'max-w-md' : 'max-w-xl'} relative group`}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="O que você quer tocar?" 
            defaultValue={searchParams.get('q')?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-zinc-900/40 border border-zinc-800/50 text-zinc-200 py-2.5 px-12 rounded-xl text-sm focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all"
          />
        </div>

        {/* Notificações e Perfil */}
        <div className="flex items-center gap-3">
          {!isMinimized && (
            <button className="hidden lg:flex text-zinc-500 hover:text-emerald-500 transition-colors relative p-2">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
            </button>
          )}
          
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center cursor-pointer hover:border-emerald-500/50 transition-all overflow-hidden">
            <User size={20} className="text-zinc-400" />
          </div>
        </div>
      </div>
    </header>
  );
}