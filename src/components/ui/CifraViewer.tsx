'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { RotateCcw, ArrowUp, ArrowDown, Printer, Mic2, PlayCircle, EyeOff, Clock3, Youtube } from 'lucide-react';
import Image from 'next/image';
import ChordDiagram from '@/components/ui/ChordDiagram';
import { chordsData } from '@/data/chords';
import { transposeChord } from '@/utils/musicLogic';
import { Musica } from '@/components/music/musicas';

export default function CifraViewer({ musica }: { musica: Musica }) {
  const [fontSize, setFontSize] = useState(18);
  const [semitones, setSemitones] = useState(0);
  const [instrumento, setInstrumento] = useState<'cavaquinho' | 'violao'>('cavaquinho');
  const [bpm, setBpm] = useState(92);
  const [metronomoAtivo, setMetronomoAtivo] = useState(false);
  const [videoFlutuanteAberto, setVideoFlutuanteAberto] = useState(false);
  const [videoPos, setVideoPos] = useState({ x: 0, y: 0 });
  const [videoPosCustom, setVideoPosCustom] = useState(false);
  const [dragVideoAtivo, setDragVideoAtivo] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const metronomeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const beatRef = useRef(0);
  const dragVideoRef = useRef({
    dragging: false,
    moved: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const videoFloatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('toggle-autoscroll', { detail: { show: true } }));
    return () => {
      window.dispatchEvent(new CustomEvent('toggle-autoscroll', { detail: { show: false } }));
    };
  }, []);

  const toYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    try {
      const parsed = new URL(url);
      let videoId = '';
      if (parsed.hostname.includes('youtu.be')) {
        videoId = parsed.pathname.replace('/', '');
      } else if (parsed.pathname.includes('/embed/')) {
        videoId = parsed.pathname.split('/embed/')[1]?.split('/')[0] || '';
      } else {
        videoId = parsed.searchParams.get('v') || '';
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch {
      return null;
    }
  };

  const youtubeEmbedUrl = useMemo(
    () =>
      toYouTubeEmbedUrl(musica.youtubeUrl) ||
      `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(
        `${musica.titulo} ${musica.artista}`
      )}`,
    [musica.titulo, musica.artista, musica.youtubeUrl]
  );

  const tocarCliqueMetronomo = (accent = false) => {
    const Ctx = globalThis.AudioContext || (globalThis as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new Ctx();
    }

    const ctx = audioContextRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.value = accent ? 1800 : 1200;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(accent ? 0.25 : 0.18, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.055);
  };

  const toggleMetronomo = async () => {
    const Ctx = globalThis.AudioContext || (globalThis as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new Ctx();
    }
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    setMetronomoAtivo((v) => !v);
  };

  useEffect(() => {
    if (!metronomoAtivo) {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
      return;
    }

    const tocarBatida = () => {
      beatRef.current = (beatRef.current % 4) + 1;
      tocarCliqueMetronomo(beatRef.current === 1);
    };

    tocarBatida();
    metronomeIntervalRef.current = setInterval(tocarBatida, Math.round(60000 / bpm));

    return () => {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
    };
  }, [metronomoAtivo, bpm]);

  useEffect(() => {
    return () => {
      if (metronomeIntervalRef.current) clearInterval(metronomeIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (!videoPosCustom) return;
    const handleResize = () => {
      const panelWidth = videoFlutuanteAberto ? 360 : 140;
      const panelHeight = videoFlutuanteAberto ? 245 : 56;
      setVideoPos((prev) => ({
        x: Math.min(Math.max(16, prev.x), window.innerWidth - panelWidth - 16),
        y: Math.min(Math.max(16, prev.y), window.innerHeight - panelHeight - 16),
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [videoFlutuanteAberto, videoPosCustom]);

  const startDragVideo = (event: React.PointerEvent<HTMLDivElement | HTMLButtonElement>) => {
    const rect = videoFloatRef.current?.getBoundingClientRect();
    dragVideoRef.current.dragging = true;
    dragVideoRef.current.moved = false;
    dragVideoRef.current.startX = event.clientX;
    dragVideoRef.current.startY = event.clientY;
    dragVideoRef.current.offsetX = rect ? rect.left : videoPos.x;
    dragVideoRef.current.offsetY = rect ? rect.top : videoPos.y;
    setDragVideoAtivo(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onDragVideo = (event: React.PointerEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (!dragVideoRef.current.dragging) return;
    if (Math.abs(event.clientX - dragVideoRef.current.startX) > 3 || Math.abs(event.clientY - dragVideoRef.current.startY) > 3) {
      dragVideoRef.current.moved = true;
    }
    const panelWidth = videoFlutuanteAberto ? 360 : 140;
    const panelHeight = videoFlutuanteAberto ? 245 : 56;
    const nextX = dragVideoRef.current.offsetX + (event.clientX - dragVideoRef.current.startX);
    const nextY = dragVideoRef.current.offsetY + (event.clientY - dragVideoRef.current.startY);
    setVideoPos({
      x: Math.min(Math.max(16, nextX), window.innerWidth - panelWidth - 16),
      y: Math.min(Math.max(16, nextY), window.innerHeight - panelHeight - 16),
    });
  };

  const endDragVideo = (event: React.PointerEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (!dragVideoRef.current.dragging) return;
    dragVideoRef.current.dragging = false;
    if (dragVideoRef.current.moved) setVideoPosCustom(true);
    setDragVideoAtivo(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const isChordToken = (token: string) => /^[A-G](#|b)?/.test(token.trim());

  const cifraAtual = useMemo(() => {
    if (semitones === 0) return musica.cifra;
    return musica.cifra.replace(/\[([^\]]+)\]/g, (_, acorde: string) => {
      if (!isChordToken(acorde)) return `[${acorde}]`;
      return `[${transposeChord(acorde, semitones)}]`;
    });
  }, [musica.cifra, semitones]);

  const tomAtual = useMemo(() => transposeChord(musica.tom, semitones), [musica.tom, semitones]);

  const acordesDaMusica = useMemo(() => {
    const vistos = new Set<string>();
    const acordes: string[] = [];
    const regex = /\[([^\]]+)\]/g;

    for (const linha of cifraAtual.split('\n')) {
      let match: RegExpExecArray | null;
      while ((match = regex.exec(linha)) !== null) {
        const acorde = match[1].trim();
        if (acorde && isChordToken(acorde) && !vistos.has(acorde)) {
          vistos.add(acorde);
          acordes.push(acorde);
        }
      }
      regex.lastIndex = 0;
    }

    return acordes;
  }, [cifraAtual]);

  const acordesResolvidos = useMemo(() => {
    const dict = chordsData[instrumento].list as Record<string, number[]>;

    const resolveAcorde = (acordeOriginal: string): string | null => {
      const sharpToFlat = (value: string) =>
        value
          .replace(/^A#/, 'Bb')
          .replace(/^C#/, 'Db')
          .replace(/^D#/, 'Eb')
          .replace(/^F#/, 'Gb')
          .replace(/^G#/, 'Ab');

      const clean = acordeOriginal
        .replace(/Â/g, '')
        .replace(/º/g, '°')
        .replace(/\s+/g, '')
        .trim();

      const candidates = [
        clean,
        sharpToFlat(clean),
        clean.replace(/\(5-\)/g, '(b5)'),
        sharpToFlat(clean.replace(/\(5-\)/g, '(b5)')),
        clean.replace(/[°]/g, ''),
        clean.replace(/\/.*/, ''),
        sharpToFlat(clean.replace(/\/.*/, '')),
        clean.replace(/\([^)]*\)/g, ''),
        sharpToFlat(clean.replace(/\([^)]*\)/g, '')),
        clean.replace(/\/.*/, '').replace(/\([^)]*\)/g, ''),
        sharpToFlat(clean.replace(/\/.*/, '').replace(/\([^)]*\)/g, '')),
      ];

      for (const c of candidates) {
        if (c && dict[c]) return c;
      }
      return null;
    };

    return acordesDaMusica.map((original) => ({ original, shape: resolveAcorde(original) }));
  }, [acordesDaMusica, instrumento]);

  const acordesDisponiveis = useMemo(
    () => acordesResolvidos.filter((acorde) => Boolean(acorde.shape)),
    [acordesResolvidos]
  );

  const acordesSemDiagrama = useMemo(
    () => acordesResolvidos.filter((acorde) => !acorde.shape).map((acorde) => acorde.original),
    [acordesResolvidos]
  );

  const processarLinha = (linha: string, idx: number) => {
    if (linha.trim().startsWith('[') && !linha.includes('] ')) {
      return (
        <div className={`text-[13px] font-black text-zinc-600 uppercase tracking-[0.3em] ${idx === 0 ? 'mt-0' : 'mt-2'} mb-4 border-l-2 border-emerald-500 pl-4`}>
          {linha.replace(/[\[\]]/g, '')}
        </div>
      );
    }

    const regex = /(\[[^\]]+\][^\[]*)/g;
    const blocos = linha.split(regex).filter(Boolean);

    return (
      <div className={`flex flex-wrap items-end pl-2 ${idx === 0 ? 'mt-0' : 'mt-6'} min-h-[2.0rem]`}>
        {blocos.map((bloco: string, i: number) => {
          if (bloco.startsWith('[')) {
            const match = bloco.match(/\[([^\]]+)\](.*)/);
            if (match) {
              const [, nota, texto] = match;
              return (
                <div key={i} className="flex flex-col items-start leading-none">
                  <span className="text-emerald-300 font-black text-[0.95em] mb-3 h-4">{nota}</span>
                  <span className="text-zinc-100 whitespace-pre">{texto || '\u00A0'}</span>
                </div>
              );
            }
          }
          return (
            <span key={i} className="text-zinc-300 whitespace-pre leading-none pb-[2px]">
              {bloco}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto px-2 md:px-6 py-6 md:py-12">
      <aside className="lg:w-52 w-full order-2 lg:order-1 px-2 md:px-0">
        <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-4">
          <p className="hidden lg:block text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4 px-2 text-center">Ajustes</p>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-autoscroll', { detail: { show: true } }))}
              className="col-span-2 lg:col-span-1 flex items-center justify-center gap-2 p-3 bg-emerald-500 text-black rounded-xl text-[10px] cursor-pointer font-black uppercase shadow-lg shadow-emerald-500/20"
            >
              <EyeOff size={14} fill="currentColor " /> Rolagem Automatica
            </button>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-zinc-500 uppercase px-2 text-center">Tom</span>
              <div className="flex items-center justify-between bg-zinc-800/50 rounded-xl p-2">
                <button onClick={() => setSemitones((s) => s - 1)} className="p-2 hover:text-emerald-500">
                  <ArrowDown size={14} />
                </button>
                <span className="text-emerald-400 font-black text-sm">{tomAtual}</span>
                <button onClick={() => setSemitones((s) => s + 1)} className="p-2 hover:text-emerald-500">
                  <ArrowUp size={14} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-zinc-500 uppercase px-2 text-center">Fonte</span>
              <div className="flex items-center justify-between bg-zinc-800/50 rounded-xl p-2">
                <button onClick={() => setFontSize((s) => s - 1)} className="p-2 hover:text-emerald-500">-</button>
                <span className="text-zinc-300 font-bold text-xs">{fontSize}</span>
                <button onClick={() => setFontSize((s) => s + 1)} className="p-2 hover:text-emerald-500">+</button>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-1 flex gap-2">
              <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-2 p-3 bg-zinc-800/50 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:text-emerald-400 transition-all">
                <Printer size={14} /> <span className="hidden lg:inline">Imprimir</span>
              </button>
              <button
                onClick={() => {
                  setFontSize(16);
                  setSemitones(0);
                }}
                className="flex-1 flex items-center justify-center gap-2 p-3 bg-zinc-800/50 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:text-emerald-400 transition-all"
              >
                <RotateCcw size={14} /> <span className="hidden lg:inline">Reset</span>
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-3 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Metronomo</p>
                <Clock3 size={14} className="text-emerald-400" />
              </div>
              <button
                onClick={toggleMetronomo}
                className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${metronomoAtivo ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-300 hover:text-white'}`}
              >
                {metronomoAtivo ? 'Parar' : 'Iniciar'}
              </button>
              <div className="flex items-center justify-between bg-zinc-800/70 rounded-xl p-2">
                <button onClick={() => setBpm((v) => Math.max(40, v - 1))} className="p-2 text-zinc-400 hover:text-emerald-400">
                  <ArrowDown size={14} />
                </button>
                <span className="text-emerald-300 font-black text-sm tabular-nums">{bpm} BPM</span>
                <button onClick={() => setBpm((v) => Math.min(220, v + 1))} className="p-2 text-zinc-400 hover:text-emerald-400">
                  <ArrowUp size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 order-1 lg:order-2 w-full">
        <header className="mb-4 flex justify-between items-end px-3 md:px-0">
          <div className="space-y-2">
            <span className="text-[10px] font-black bg-emerald-500 text-black px-6 py-1 rounded-full uppercase italic">{musica.ritmo}</span>
            <h1 className="text-2xl text-white mt-4 uppercase tracking-tighter leading-none">{musica.titulo}</h1>
            <h2 className="text-xl font-light text-zinc-500 italic uppercase tracking-widest flex items-center gap-2">
              <Mic2 size={19} className="text-emerald-500" /> {musica.artista}
            </h2>
          </div>

          {musica.fotoArtista && (
            <div className="relative">
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-emerald-500/20 p-1">
                <Image
                  src={musica.fotoArtista}
                  alt={musica.artista}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-full grayscale"
                />
              </div>
            </div>
          )}
        </header>

        <section className="xl:hidden mb-4 bg-zinc-900/40 border border-white/5 rounded-[1.5rem] p-3">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3 text-center">Braco Do Instrumento</p>
          <div className="flex bg-zinc-900 p-1 rounded-xl border border-white/5 mb-3">
            <button
              onClick={() => setInstrumento('cavaquinho')}
              className={`flex-1 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${instrumento === 'cavaquinho' ? 'bg-emerald-500 text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              Cavaquinho
            </button>
            <button
              onClick={() => setInstrumento('violao')}
              className={`flex-1 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${instrumento === 'violao' ? 'bg-emerald-500 text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              Violao
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {acordesDisponiveis.map((acorde) => (
              <ChordDiagram
                key={`mobile-${instrumento}-${acorde.original}`}
                name={acorde.original}
                instrument={instrumento}
                frets={(chordsData[instrumento].list as Record<string, number[]>)[acorde.shape as string]}
              />
            ))}
          </div>
          {acordesSemDiagrama.length > 0 && (
            <p className="mt-2 text-[10px] text-zinc-600 font-bold uppercase tracking-wider text-center">Sem shape: {acordesSemDiagrama.join(' | ')}</p>
          )}
        </section>

        <div className="md:hidden cursor-pointer flex justify-center mb-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-autoscroll', { detail: { show: true } }))}
            className="flex items-center cursor-pointer gap-2 px-6 py-2 bg-emerald-500 text-black rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            <PlayCircle size={10} fill="currentColor " /> Iniciar Rolagem
          </button>
        </div>

        <div
          className="bg-zinc-800/70 border border-white/5 rounded-[2rem] md:rounded-[3rem] pt-2 px-1 pb-1 md:pt-2 md:px-8 md:pb-8 font-mono shadow-xl"
          style={{ fontSize: `${fontSize}px` }}
        >
          <div className="w-full break-words">
            {cifraAtual.split('\n').map((linha: string, idx: number) => (
              <div key={idx} className={idx === 0 ? 'mb-0' : 'mb-0'}>
                {processarLinha(linha, idx)}
              </div>
            ))}
          </div>
        </div>
      </main>

      <aside className="hidden xl:block xl:w-64 order-3">
        <div className="sticky top-28 bg-zinc-900/40 border border-white/5 rounded-[2rem] p-4">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 text-center">Braco Do Instrumento</p>

          <div className="flex bg-zinc-900 p-1 rounded-xl border border-white/5 mb-4">
            <button
              onClick={() => setInstrumento('cavaquinho')}
              className={`flex-1 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${instrumento === 'cavaquinho' ? 'bg-emerald-500 text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              Cavaquinho
            </button>
            <button
              onClick={() => setInstrumento('violao')}
              className={`flex-1 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${instrumento === 'violao' ? 'bg-emerald-500 text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              Violao
            </button>
          </div>

          <div className="max-h-[65vh] overflow-y-auto space-y-3 pr-1">
            {acordesDisponiveis.map((acorde) => (
              <ChordDiagram
                key={`${instrumento}-${acorde.original}`}
                name={acorde.original}
                instrument={instrumento}
                frets={(chordsData[instrumento].list as Record<string, number[]>)[acorde.shape as string]}
              />
            ))}
          </div>

          <div className="mt-4">
            {acordesSemDiagrama.length > 0 && (
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider text-center">Sem shape: {acordesSemDiagrama.join(' | ')}</p>
            )}
          </div>
        </div>
      </aside>

      <div
        ref={videoFloatRef}
        className={`hidden lg:block fixed z-[1200] ${videoPosCustom ? '' : 'right-6 bottom-6'}`}
        style={videoPosCustom ? { left: `${videoPos.x}px`, top: `${videoPos.y}px` } : undefined}
      >
        {videoFlutuanteAberto ? (
          <div className="w-[360px] rounded-2xl border border-white/10 bg-zinc-900/95 backdrop-blur-md shadow-2xl overflow-hidden">
            <div
              className={`flex items-center justify-between px-3 py-2 border-b border-white/10 cursor-grab ${dragVideoAtivo ? 'cursor-grabbing' : ''}`}
              onPointerDown={startDragVideo}
              onPointerMove={onDragVideo}
              onPointerUp={endDragVideo}
              onPointerCancel={endDragVideo}
            >
              <div className="flex items-center gap-2">
                <Youtube size={14} className="text-red-400" />
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-300">Video</span>
              </div>
              <button
                onClick={() => setVideoFlutuanteAberto(false)}
                className="text-[10px] font-black uppercase text-zinc-500 hover:text-white"
              >
                Recolher
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                src={youtubeEmbedUrl}
                title={`Video ${musica.titulo}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              if (dragVideoRef.current.moved) return;
              setVideoFlutuanteAberto(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-zinc-900/95 border border-white/10 text-zinc-200 hover:text-white"
            onPointerDown={startDragVideo}
            onPointerMove={onDragVideo}
            onPointerUp={endDragVideo}
            onPointerCancel={endDragVideo}
          >
            <Youtube size={14} className="text-red-400" />
            <span className="text-[10px] font-black uppercase tracking-wider">Video</span>
          </button>
        )}
      </div>
    </div>
  );
}
