'use client';
import { useState } from 'react';
import { Search, Music2, User, Bell, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginModal from '@/components/auth/LoginModal';

interface HeaderProps {
  isMinimized?: boolean;
}

export default function Header({ isMinimized }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) params.set('q', term);
    else params.delete('q');
    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      {/* Estilo Injetado para a animação (Caso o Tailwind não tenha o keyframe) */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
        .animate-shimmer {
          animation: shimmer 10s infinite linear;
        }
        .animate-shimmer-fast {
          animation: shimmer 2s infinite linear;
        }
      `}</style>

      <header
        className={`hidden md:flex fixed top-0 z-[60] w-full transition-all duration-500 overflow-hidden ${isMinimized
            ? 'h-14 bg-zinc-950/90 border-b border-zinc-900'
            : 'h-20 bg-zinc-950/40 backdrop-blur-md border-b border-white/[0.05]'
          }`}
      >
        {/* Camada de Luz Espelhada passando por trás de tudo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent animate-shimmer"
            style={{ width: '50%' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-8 w-full relative z-10">

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
              <div className="bg-emerald-500 p-1.5 rounded-lg transition-transform group-hover:rotate-12 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Music2 className="text-black" size={isMinimized ? 16 : 20} strokeWidth={2.5} />
              </div>
              <span className={`font-black tracking-tighter text-white uppercase italic transition-all ${isMinimized ? 'text-base' : 'text-xl'
                }`}>
                Cifra<span className="text-emerald-500">Samba</span>
              </span>
            </Link>
          </div>

          {/* Barra de Pesquisa Atualizada */}
          <div className={`flex-1 transition-all duration-500 ${isMinimized ? 'max-w-md' : 'max-w-xl'} relative group`}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" size={16} />
            <input
              type="text"
              placeholder="O que você quer tocar?"
              className="w-full bg-zinc-900/40 border border-zinc-800/50 text-zinc-200 py-2.5 px-12 rounded-xl text-sm focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all"
              // ADICIONE ESTAS DUAS LINHAS ABAIXO:
              onChange={(e) => handleSearch(e.target.value)}
              defaultValue={searchParams.get('q') || ''}
            />
          </div>

          {/* Perfil / Login com Luz Própria */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="relative overflow-hidden flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl hover:border-emerald-500/50 transition-all group"
            >
              {/* Luz extra no botão de login quando passa o mouse */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer-fast pointer-events-none" />

              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-emerald-500 transition-colors relative z-10">Entrar</span>
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center relative z-10">
                <User size={14} className="text-zinc-500 group-hover:text-emerald-500 transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}