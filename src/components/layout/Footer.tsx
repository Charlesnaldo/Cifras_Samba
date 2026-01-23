'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone, Music2, Instagram, Youtube, Facebook } from 'lucide-react';

// --- CONSTANTES DEFINIDAS DIRETAMENTE PARA CORRIGIR O ERRO DE IMPORTAÇÃO ---
const NAV_LINKS = [
  { label: 'Cifras', href: '/' },
  { label: 'Dicionário', href: '/dicionario' },
  { label: 'Aulas', href: '#aulas' },
  { label: 'Ranking', href: '#ranking' },
];

const SOCIAL_LINKS = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Youtube, href: '#', label: 'Youtube' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
];

const LEGAL_LINKS = [
  { label: 'Termos de Uso', href: '#' },
  { label: 'Privacidade', href: '#' },
  { label: 'Cookies', href: '#' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e: React.MouseEvent) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#home' || href === '/') {
      scrollToTop(e);
      return;
    }
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-zinc-950 pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Linha de luz Esmeralda */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* COLUNA 1: LOGO E REDES */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group" onClick={scrollToTop}>
              <div className="bg-emerald-500 p-1.5 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Music2 className="text-black" size={20} strokeWidth={2.5} />
              </div>
              <span className="font-black tracking-tighter text-white uppercase italic text-xl">
                Cifra<span className="text-emerald-500">Samba</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Transformando o aprendizado de samba e pagode através de inteligência e didática musical.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ Icon, href, label }, i) => (
                <Link 
                  key={i} 
                  href={href} 
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-emerald-500 transition-all"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* COLUNA 2: NAVEGAÇÃO */}
          <div>
            <h4 className="text-emerald-500 font-bold uppercase text-[11px] tracking-[0.3em] mb-8">Navegação</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-zinc-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA 3: CONTATO E DOWNLOAD APPS */}
          <div className="space-y-10">
            <div>
              <h4 className="text-emerald-500 font-bold uppercase text-[11px] tracking-[0.3em] mb-8">Contato</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Phone size={16} className="text-emerald-500" />
                  <span className="text-sm">(85) 9.8888-7777</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <Mail size={16} className="text-emerald-500" />
                  <span className="text-sm">comercial@cifrasamba.com.br</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <h4 className="text-emerald-500 font-bold uppercase text-[11px] tracking-[0.3em] mb-8">Nosso Aplicativo</h4>
              <div className="flex flex-col gap-3">
                <Link href="#" className="transition-transform hover:scale-105 active:scale-95 w-fit">
                  <Image 
                    src="/app/rnk-aplicativo-google-play.png" 
                    alt="Disponível na Google Play" 
                    width={135} 
                    height={40} 
                    className="h-9 w-auto object-contain"
                  />
                </Link>
                <Link href="#" className="transition-transform hover:scale-105 active:scale-95 w-fit">
                  <Image 
                    src="/app/rnk-aplicativo-app-store.png" 
                    alt="Disponível na App Store" 
                    width={135} 
                    height={40} 
                    className="h-9 w-auto object-contain"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* COLUNA 4: COMUNIDADE */}
          <div>
            <h4 className="text-emerald-500 font-bold uppercase text-[11px] tracking-[0.3em] mb-8">Comunidade</h4>
            <div className="flex gap-3">
              <MapPin size={16} className="text-emerald-500 shrink-0" />
              <p className="text-zinc-400 text-sm leading-relaxed">
                Fortaleza, Ceará<br /> Brasil
              </p>
            </div>
          </div>
        </div>

        {/* BARRA FINAL */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              © {currentYear} CIFRASAMBA ACADEMY.
            </p>
            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
              CNPJ: 00.000.000/0001-00
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-emerald-500 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}