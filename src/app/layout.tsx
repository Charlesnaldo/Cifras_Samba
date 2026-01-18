// src/app/layout.tsx

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RitmosNav from '@/components/layout/RitmosNav';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="dark"> 
      {/* Adicionei a classe "dark" para garantir que o navegador entenda o tema */}
      <body className="flex flex-col min-h-screen bg-black text-zinc-100 antialiased font-sans">
        
        {/* Header Fixo */}
        <Header />
        
        {/* Sub-menu de Ritmos */}
        <RitmosNav />

        {/* Conteúdo Principal: flex-1 faz ele ocupar o espaço entre header e footer */}
        <main className="flex-1">
          {children}
        </main>

        {/* Rodapé */}
        <Footer />
        
      </body>
    </html>
  );
}