'use client';

import { useState, useEffect } from 'react';
import { Search, Music2, User, ChevronLeft, Instagram, Youtube, Facebook } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginModal from '@/components/auth/LoginModal';
import { useDebounce } from '@/hooks/useDebounce';

interface HeaderProps {
  isMinimized?: boolean;
}

export default function Header({ isMinimized }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [term, setTerm] = useState(searchParams.get('q') || '');
  const debouncedTerm = useDebounce(term, 500);

  useEffect(() => {
    const currentQuery = new URLSearchParams(window.location.search).get('q') || '';

    if (debouncedTerm !== currentQuery) {
      if (!debouncedTerm && window.location.pathname !== '/') return;

      const params = new URLSearchParams(window.location.search);
      if (debouncedTerm) {
        params.set('q', debouncedTerm);
        router.push(`/?${params.toString()}`);
      } else {
        params.delete('q');
        if (window.location.pathname === '/') {
          router.push('/');
        }
      }
    }
  }, [debouncedTerm, router]);

  return (
    <>
      <header
        className={`hidden md:flex fixed top-0 z-[60] w-full transition-all duration-500 overflow-hidden ${isMinimized
          ? 'h-14 bg-zinc-950/90 border-b border-zinc-900'
          : 'h-20 bg-zinc-950/40 backdrop-blur-md border-b border-white/[0.05]'
          }`}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent animate-shimmer"
            style={{ width: '50%' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-8 w-full relative z-10">
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
              <div className="bg-accent p-1.5 rounded-lg transition-transform group-hover:rotate-12 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Music2 className="text-black" size={isMinimized ? 16 : 20} strokeWidth={2.5} />
              </div>
              <span className={`font-black tracking-tighter text-foreground uppercase italic transition-all ${isMinimized ? 'text-base' : 'text-xl'}`}>
                Cifra<span className="text-accent">Samba</span>
              </span>
            </Link>
          </div>

          <div className={`flex-1 transition-all duration-500 ${isMinimized ? 'max-w-md' : 'max-w-xl'} relative group`}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-accent transition-colors" size={16} />
            <input
              type="text"
              placeholder="O que voce quer tocar?"
              className="w-full bg-zinc-900/40 border border-zinc-800/50 text-zinc-200 py-2.5 px-12 rounded-xl text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
              onChange={(e) => setTerm(e.target.value)}
              value={term}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 pr-4 border-r border-zinc-800">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-pink-500 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
                <Youtube size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-blue-500 transition-colors">
                <Facebook size={18} />
              </a>
            </div>

            <button
              onClick={() => setIsLoginOpen(true)}
              className="relative overflow-hidden flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl hover:border-accent/50 transition-all group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer-fast pointer-events-none" />

              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-accent transition-colors relative z-10">Entrar</span>
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center relative z-10">
                <User size={14} className="text-zinc-500 group-hover:text-accent transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
