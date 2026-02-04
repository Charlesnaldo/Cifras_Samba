'use client';

import BandRegistrationForm from '@/components/music/BandRegistrationForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CadastroBandaPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

            {/* Header com botão voltar */}
            <div className="space-y-6">
                <Link
                    href="/bandas-locais"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-500 transition-colors text-xs font-bold uppercase tracking-widest bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800 hover:border-emerald-500/30"
                >
                    <ArrowLeft size={14} /> Voltar
                </Link>

                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black text-foreground italic tracking-tighter uppercase leading-none">
                        Cadastre <span className="text-emerald-500">Sua Banda</span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        Faça parte do maior catálogo de samba e pagode do Brasil. Preencha o formulário abaixo para divulgar seu trabalho.
                    </p>
                </div>
            </div>

            {/* Formulário */}
            <BandRegistrationForm />
        </div>
    );
}
