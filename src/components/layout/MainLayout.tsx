'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RitmosNav from '@/components/layout/RitmosNav';
import Hero3D from '@/components/layout/Hero3D';
import MobileNav from '@/components/layout/MobileNav';
import AutoScroll from '@/components/music/AutoScroll';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isMusicPage = pathname.startsWith('/musica/');
    const isHomePage = pathname === '/';

    return (
        <div className="flex flex-col min-h-screen">
            <Suspense fallback={<div className="fixed inset-0 bg-zinc-950 z-[999]" />}>
                {/* Header: Sumirá no mobile via hidden md:flex interno */}
                <Header isMinimized={isMusicPage} />

                {!isMusicPage ? (
                    <div className="flex flex-col">
                        <RitmosNav />
                        {isHomePage ? (
                            /* Home: Exibe Hero com ajuste sutil */
                            <div className="pt-0 md:pt-8">
                                <Hero3D />
                            </div>
                        ) : (
                            /* Internas: Apenas espaçamento para compensar Header fixo */
                            /* Mobile: Header (14) -> pt-20 | Desktop: Header(20)+Nav(12) -> pt-36 */
                            <div className="pt-20 md:pt-36" />
                        )}
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
        </div>
    );
}
