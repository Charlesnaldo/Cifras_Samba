'use client'; // Necessário para usar usePathname

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
  
  // Verifica se o usuário está na página de uma música específica
  const isMusicPage = pathname.startsWith('/musica/');

  return (
    <html lang="pt-br" className="dark"> 
      <body className="flex flex-col min-h-screen bg-black text-zinc-100 antialiased font-sans">
        
        <Suspense fallback={<div className="fixed inset-0 bg-black z-[999]" />}>
          
          {/* Header agora recebe a prop para saber se deve ser menor */}
          <Header isMinimized={isMusicPage} />

          {/* Só mostra a navegação de ritmos e o Hero se NÃO for página de música */}
          {!isMusicPage && (
            <>
              <RitmosNav />
              <Hero3D />
            </>
          )}

          {/* Ajuste de padding: Se for música, o conteúdo sobe (pt-16), se não, segue normal */}
          <main className={`flex-1 pb-24 md:pb-0 ${isMusicPage ? 'pt-16' : 'pt-0'}`}>
            {children}
          </main>

          {/* AutoScroll fixo apenas na página de música para não poluir a Home */}
          {isMusicPage && <AutoScroll />}
          
          <MobileNav />
          <Footer />
        </Suspense>
        
      </body>
    </html>
  );
}