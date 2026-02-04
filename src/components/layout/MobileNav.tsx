'use client';

import { useState, useEffect } from 'react';
import { Home, Search, Library, User, Guitar, X, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MUSICAS } from "../music";
import LoginModal from '@/components/auth/LoginModal'; // Certifique-se que o caminho está correto

export default function MobileNav() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Novo estado para o Modal
  const [termo, setTermo] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Estados do Auto Scroll
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(30); // Velocidade (ms)

  // Lógica do Auto Scroll
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScrolling) {
      interval = setInterval(() => {
        window.scrollBy({ top: 1, behavior: 'auto' });
      }, scrollSpeed);
    }
    return () => clearInterval(interval);
  }, [isScrolling, scrollSpeed]);

  // Lógica para esconder/mostrar ao scrollar (Desativa se o Auto Scroll estiver ligado)
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined' && !isScrolling) {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, isScrolling]);

  const resultados = MUSICAS.filter(m =>
    m.titulo.toLowerCase().includes(termo.toLowerCase()) ||
    m.artista.toLowerCase().includes(termo.toLowerCase())
  );

  // Verificamos se estamos em uma página de cifra para mostrar o botão de scroll
  const isCifraPage = pathname.includes('/musica/');

  return (
    <>
      {/* Botões Flutuantes de Velocidade (Só aparecem se o Auto Scroll estiver ativo) */}
      {isScrolling && (
        <div className="fixed right-6 bottom-28 z-[1000] flex flex-col gap-2 animate-in fade-in slide-in-from-right">
          <button
            onClick={() => setScrollSpeed(prev => Math.max(5, prev - 5))}
            className="p-3 bg-emerald-500 text-black rounded-full shadow-lg"
          >
            <ChevronUp size={20} strokeWidth={3} />
          </button>
          <button
            onClick={() => setScrollSpeed(prev => prev + 5)}
            className="p-3 bg-zinc-800 text-white rounded-full shadow-lg border border-white/10"
          >
            <ChevronDown size={20} strokeWidth={3} />
          </button>
        </div>
      )}

      {/* Overlay de Busca */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md p-6 flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black italic uppercase text-emerald-500">Buscar</h2>
            <button onClick={() => setIsSearchOpen(false)} className="p-2 bg-zinc-800 rounded-full text-white">
              <X size={24} />
            </button>
          </div>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input
              autoFocus
              type="text"
              placeholder="Música ou artista..."
              className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
              onChange={(e) => setTermo(e.target.value)}
            />
          </div>
          <div className="flex-1 overflow-y-auto space-y-3">
            {termo.length > 0 && resultados.map(musica => (
              <Link
                key={musica.id}
                href={`/musica/${musica.slug}`}
                onClick={() => setIsSearchOpen(false)}
                className="block bg-zinc-900/50 p-4 rounded-xl border border-white/5"
              >
                <p className="font-bold text-white uppercase italic text-sm">{musica.titulo}</p>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{musica.artista}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Barra de Navegação */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 z-[999] px-4 pb-6 pt-2 pointer-events-none transition-all duration-500 ease-in-out ${isVisible || isScrolling ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
          }`}
      >
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 h-16 rounded-2xl flex items-center justify-around px-2 shadow-2xl pointer-events-auto">

          <Link href="/" className="flex flex-col items-center justify-center flex-1 h-full gap-1">
            <Home size={20} className={pathname === '/' ? 'text-emerald-500' : 'text-zinc-500'} />
            <span className={`text-[10px] font-black uppercase ${pathname === '/' ? 'text-emerald-500' : 'text-zinc-500'}`}>Início</span>
          </Link>

          <button onClick={() => setIsSearchOpen(true)} className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-zinc-500">
            <Search size={20} />
            <span className="text-[10px] font-black uppercase">Buscar</span>
          </button>

          {/* Botão Central */}
          {isCifraPage ? (
            <button
              onClick={() => setIsScrolling(!isScrolling)}
              className="relative -top-5"
            >
              <div className={`${isScrolling ? 'bg-red-500' : 'bg-emerald-500'} p-3 rounded-full border-4 border-[#09090b] shadow-lg transition-colors`}>
                {isScrolling ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-black ml-1" />}
              </div>
            </button>
          ) : (
            <Link href="/contribuir" className="relative -top-5">
              <div className="bg-emerald-500 p-3 rounded-full border-4 border-[#09090b] shadow-lg shadow-emerald-500/40">
                <Guitar size={24} className="text-black" />
              </div>
            </Link>
          )}

          <Link href="/cifras" className="flex flex-col items-center justify-center flex-1 h-full gap-1">
            <Library size={20} className={pathname === '/cifras' ? 'text-emerald-500' : 'text-zinc-500'} />
            <span className={`text-[10px] font-black uppercase ${pathname === '/cifras' ? 'text-emerald-500' : 'text-zinc-500'}`}>Cifras</span>
          </Link>

          {/* Botão de Login que abre o Modal */}
          <button
            onClick={() => setIsLoginOpen(true)}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-zinc-500"
          >
            <User size={20} />
            <span className="text-[10px] font-black uppercase">Login</span>
          </button>
        </div>
      </nav>

      {/* Renderização do Modal de Login */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}