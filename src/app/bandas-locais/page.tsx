'use client';

import { useState } from 'react';
import { LOCAL_BANDS } from '@/data/localBands';
import { MapPin, Search, Star, Instagram } from 'lucide-react';
import Image from 'next/image';

import Link from 'next/link';

export default function BandasLocaisPage() {
    return (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
            <div className="bg-zinc-900/50 p-8 rounded-full border border-white/5">
                <div className="animate-spin text-emerald-500">
                    <Search size={40} />
                </div>
            </div>
            <div className="space-y-2">
                <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Em Manutenção</h1>
                <p className="text-zinc-500 max-w-md mx-auto">
                    Estamos atualizando nossa base de dados de bandas. Músicos estão afinando os instrumentos...
                </p>
            </div>
            <Link href="/" className="bg-emerald-500 text-black px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
                Voltar ao Início
            </Link>
        </div>
    );
}
