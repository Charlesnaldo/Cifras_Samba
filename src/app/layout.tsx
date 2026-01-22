'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RitmosNav from '@/components/layout/RitmosNav';
import Hero3D from '@/components/layout/Hero3D';
import MobileNav from '@/components/layout/MobileNav';
import AutoScroll from '@/components/music/AutoScroll';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMusicPage = pathname.startsWith('/musica/');

  return (
    <html lang="pt-br" className="dark"> 
      <body className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 antialiased font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
        
        <Suspense fallback={<div className="fixed inset-0 bg-zinc-950 z-[999]" />}>
          {/* Header: Sumirá no mobile via hidden md:flex interno */}
          <Header isMinimized={isMusicPage} />

          {!isMusicPage ? (
            /* No Mobile: pt-0 (Hero cola no topo) | No Desktop: pt-44 (Espaço para Header + Nav) */
            <div className="pt-0 md:pt-44 flex flex-col">
              <RitmosNav />
              <Hero3D />
            </div>
          ) : (
            /* Na página de música: pt-0 no mobile para a cifra subir total */
            <div className="pt-0 md:pt-16" />
          )}

          <main className="flex-1 pb-24 md:pb-0">
            {children}
          </main>

          {isMusicPage && <AutoScroll />}
          <MobileNav />
          <Footer />
        </Suspense>
        
      </body>
    </html>
  );
}