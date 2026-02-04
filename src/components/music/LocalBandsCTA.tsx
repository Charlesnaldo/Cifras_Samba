'use client';

import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LocalBandsCTA() {
    return (
        <section className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-zinc-900/40 backdrop-blur-sm p-8 md:p-12">
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                        <MapPin size={12} />
                        <span>Na sua região</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-foreground italic tracking-tighter ">
                        Encontre rodas de samba <br />
                        <span className="text-emerald-500">perto de você</span>
                    </h2>

                    <p className="text-zinc-400 font-medium">
                        Descubra grupos locais, verifique a agenda e prestigie o samba da sua cidade.
                    </p>
                </div>

                <Link
                    href="/bandas-locais"
                    className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-8 py-4 rounded-full font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"
                >
                    <span>Buscar Bandas</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
}
