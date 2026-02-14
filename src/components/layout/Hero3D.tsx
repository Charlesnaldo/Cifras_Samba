'use client';

import { Play, ArrowRight, Headphones, Music2, Sparkles } from 'lucide-react';
import Link from 'next/link';

const highlights = [
  { label: 'Cifras no catalogo', value: '1000+' },
  { label: 'Ritmos de samba', value: '12' },
  { label: 'Aulas selecionadas', value: '120+' },
];

const quickLinks = [
  { href: '/musica/ta-escrito-revelacao', label: 'Ta Escrito' },
  { href: '/musica/o-show-tem-que-continuar', label: 'O Show Tem Que Continuar' },
  { href: '/musica/iracema', label: 'Iracema' },
];

export default function Hero3D() {
  return (
    <section className="relative min-h-[88vh] md:min-h-[92vh] overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_18%,rgba(16,185,129,0.20),transparent_35%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_80%_78%,rgba(16,185,129,0.10),transparent_35%)]" />

      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-end">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-black/30 backdrop-blur-md">
              <Sparkles size={14} className="text-emerald-400" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-zinc-300 font-bold">Samba sem enrolacao</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[6.2rem] leading-[0.85] tracking-[-0.03em] uppercase font-black italic text-white">
              Toque
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">Samba</span>
              <span className="block text-zinc-200 font-serif font-light normal-case not-italic text-3xl sm:text-4xl md:text-5xl tracking-normal mt-2">
                com cifra clara e ritmo certo
              </span>
            </h1>

            <p className="max-w-xl text-zinc-300/95 text-sm md:text-base leading-relaxed">
              Repertorio pronto para roda de samba: cifra organizada, transposicao rapida e diagramas de braco para cavaquinho e violao.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/musica/ta-escrito-revelacao"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 text-zinc-950 font-black uppercase tracking-wider text-xs md:text-sm shadow-[0_16px_40px_rgba(16,185,129,0.35)] hover:bg-emerald-400 transition-all"
              >
                Comecar agora
                <Play size={15} fill="currentColor" />
              </Link>

              <button
                onClick={() => {
                  const el = document.getElementById('search-results');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/20 bg-black/20 text-white font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-white/5 transition-all"
              >
                Explorar cifras
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-2xl">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur-sm px-4 py-4">
                  <p className="text-xl md:text-2xl font-black text-emerald-300 leading-none">{item.value}</p>
                  <p className="text-[10px] md:text-xs uppercase tracking-wider text-zinc-400 mt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-black/35 backdrop-blur-md p-5 md:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-zinc-100 uppercase tracking-[0.2em] text-[10px] font-black">Prontas pra tocar</h2>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 border border-emerald-500/30">
                <Headphones size={14} />
              </div>
            </div>

            <div className="space-y-3">
              {quickLinks.map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-zinc-900/55 px-4 py-3 hover:border-emerald-500/50 hover:bg-zinc-900 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-300 text-[11px] font-black flex items-center justify-center">{idx + 1}</span>
                    <span className="text-sm text-zinc-100 font-semibold truncate">{item.label}</span>
                  </div>
                  <Music2 size={15} className="text-zinc-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                </Link>
              ))}
            </div>

            <p className="mt-5 text-xs text-zinc-400 leading-relaxed">
              Dica: use os botoes de tom na pagina da musica para ajustar ao seu alcance vocal sem perder o shape.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
