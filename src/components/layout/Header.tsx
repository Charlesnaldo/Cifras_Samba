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
      className={`fixed top-0 z-[60] w-full transition-all duration-500 ${
        isMinimized 
          ? 'h-14 bg-black/90 backdrop-blur-md border-b border-zinc-900' 
          : 'h-20 bg-black/40 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-8">
        
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
            <div className={`
              bg-yellow-500 rounded-lg transition-all duration-500 flex items-center justify-center
              ${isMinimized ? 'w-7 h-7 rotate-0' : 'w-9 h-9 group-hover:rotate-12'}
            `}>
              <Music2 className="text-black" size={isMinimized ? 16 : 20} strokeWidth={2.5} />
            </div>
            <span className={`font-black tracking-tighter text-white uppercase italic transition-all ${
              isMinimized ? 'text-base' : 'text-xl'
            }`}>
              Cifra<span className="text-yellow-500">Samba</span>
            </span>
          </Link>
        </div>

        {/* Barra de Pesquisa Minimalista */}
        <div className={`flex-1 transition-all duration-500 ${isMinimized ? 'max-w-md' : 'max-w-xl'} relative group`}>
          <Search 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-yellow-500 transition-colors" 
            size={isMinimized ? 14 : 16} 
          />
          <input 
            type="text" 
            placeholder="O que você quer tocar?" 
            defaultValue={searchParams.get('q')?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
            className={`
              w-full bg-zinc-900/40 border border-zinc-800/50 text-zinc-200 rounded-xl transition-all
              focus:outline-none focus:border-yellow-500/40 focus:ring-1 focus:ring-yellow-500/20
              ${isMinimized ? 'py-1.5 px-10 text-xs' : 'py-2.5 px-12 text-sm'}
            `}
          />
        </div>

        {/* Notificações e Perfil (Escondemos notificações no modo minimizado para foco) */}
        <div className="flex items-center gap-3">
          {!isMinimized && (
            <button className="hidden sm:flex text-zinc-500 hover:text-yellow-500 transition-colors relative p-2">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
            </button>
          )}
          
          <div className={`
            rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center 
            cursor-pointer hover:border-yellow-500/50 transition-all overflow-hidden
            ${isMinimized ? 'w-8 h-8' : 'w-10 h-10'}
          `}>
            <User size={isMinimized ? 16 : 20} className="text-zinc-400" />
          </div>
        </div>
      </div>
    </header>
  );
}