import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { ThemeProvider } from '@/components/layout/ThemeContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'CifraSamba - Cifras de Samba e Pagode',
  description: 'O melhor acervo de cifras de samba e pagode simplificadas para cavaco e violão.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Removendo a classe 'dark' hardcoded para ser gerenciada pelo ThemeProvider
    <html lang="pt-br" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased font-sans selection:bg-emerald-500/30 selection:text-emerald-200 transition-colors duration-300">
        <ThemeProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}