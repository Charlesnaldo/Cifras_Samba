'use client';

import { Home, Search, Library, User, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Início', href: '/' },
    { icon: Search, label: 'Buscar', href: '/buscar' },
    { icon: PlusCircle, label: 'Criar', href: '/contribuir', primary: true },
    { icon: Library, label: 'Cifras', href: '/minha-biblioteca' },
    { icon: User, label: 'Perfil', href: '/perfil' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-6 pt-2 pointer-events-none">
      <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 h-16 rounded-2xl flex items-center justify-around px-2 shadow-2xl pointer-events-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.primary) {
            return (
              <Link key={item.label} href={item.href} className="relative -top-5">
                <div className="bg-emerald-500 p-3 rounded-full shadow-lg shadow-emerald-500/40 border-4 border-black active:scale-95 transition-transform">
                  <Icon size={24} className="text-black" />
                </div>
              </Link>
            );
          }

          return (
            <Link 
              key={item.label} 
              href={item.href} 
              className="flex flex-col items-center justify-center flex-1 gap-1 group active:scale-90 transition-transform"
            >
              <Icon 
                size={20} 
                className={isActive ? 'text-emerald-500' : 'text-zinc-500 group-hover:text-zinc-300'} 
              />
              <span className={`text-[10px] font-bold uppercase tracking-tighter ${
                isActive ? 'text-emerald-500' : 'text-zinc-500'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}