// src/app/layout.tsx
import { Suspense } from 'react'; // Importação necessária
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RitmosNav from '@/components/layout/RitmosNav';
import './globals.css';
import AutoScroll from '@/components/music/AutoScroll';
import Hero3D from '@/components/layout/Hero3D';
import MobileNav from '@/components/layout/MobileNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="dark"> 
      <body className="flex flex-col min-h-screen bg-black text-zinc-100 antialiased font-sans">
        
        {/* O Suspense envolve tudo o que pode usar hooks de busca/navegação */}
        <Suspense fallback={<div className="fixed inset-0 bg-black z-[999]" />}>
          <Header />
          <RitmosNav />
          <Hero3D />

          <main className="flex-1 pb-24 md:pb-0">
            {children}
          </main>

          <AutoScroll />
          <MobileNav />
          <Footer />
        </Suspense>
        
      </body>
    </html>
  );
}