'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, Play, Pause } from 'lucide-react';

export default function AutoScroll() {
  const [active, setActive] = useState(false);
  const [speed, setSpeed] = useState(0.5);
  const [showControls, setShowControls] = useState(false);
  const [position, setPosition] = useState(() => {
    if (typeof window === 'undefined') return { x: 16, y: 16 };
    return {
      x: Math.max(16, window.innerWidth - 96),
      y: Math.max(16, window.innerHeight - 140),
    };
  });
  const [isDragging, setIsDragging] = useState(false);

  const scrollAccumulator = useRef(0);
  const speedRef = useRef(speed);
  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (active) {
      interval = setInterval(() => {
        scrollAccumulator.current += speedRef.current;

        if (scrollAccumulator.current >= 1) {
          const pixelsToScroll = Math.floor(scrollAccumulator.current);
          window.scrollBy({ top: pixelsToScroll, behavior: 'auto' });
          scrollAccumulator.current -= pixelsToScroll;
        }
      }, 20);
    } else {
      scrollAccumulator.current = 0;
    }

    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    const handleToggle = () => setShowControls((prev) => !prev);
    window.addEventListener('toggle-autoscroll', handleToggle);
    return () => window.removeEventListener('toggle-autoscroll', handleToggle);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(Math.max(16, prev.x), window.innerWidth - 72),
        y: Math.min(Math.max(16, prev.y), window.innerHeight - 72),
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('button')) return;

    dragRef.current.dragging = true;
    dragRef.current.startX = event.clientX;
    dragRef.current.startY = event.clientY;
    dragRef.current.offsetX = position.x;
    dragRef.current.offsetY = position.y;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.dragging) return;

    const nextX = dragRef.current.offsetX + (event.clientX - dragRef.current.startX);
    const nextY = dragRef.current.offsetY + (event.clientY - dragRef.current.startY);

    setPosition({
      x: Math.min(Math.max(16, nextX), window.innerWidth - 72),
      y: Math.min(Math.max(16, nextY), window.innerHeight - 72),
    });
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  if (!showControls) return null;

  return (
    <div
      className={`fixed z-[2000] pointer-events-auto flex flex-col items-end gap-3 ${isDragging ? '' : 'animate-in fade-in slide-in-from-right-4'}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onPointerDown={startDrag}
      onPointerMove={onDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div
        className={`
        bg-zinc-950/10 backdrop-blur-2xl border border-white/10 shadow-3xl transition-all duration-500
        ${active ? 'p-1.3 rounded-full' : 'p-3 rounded-[2rem]'}
      `}
      >
        <div className={`flex flex-col items-center gap-4 ${active ? 'opacity-40 hover:opacity-100 transition-opacity' : ''}`}>
          {!active && (
            <div className="flex flex-col items-center border-b border-white/10 pb-2 w-full">
              <button
                onClick={() => setSpeed((s) => Number((Math.min(s + 0.1, 5)).toFixed(1)))}
                className="p-1 text-zinc-400 hover:text-emerald-400"
              >
                <ChevronUp size={20} />
              </button>

              <div className="flex flex-col items-center -my-1">
                <span className="text-xs font-black text-emerald-500 tabular-nums">{speed.toFixed(1)}</span>
                <span className="text-[7px] font-bold text-zinc-600 uppercase italic">vel</span>
              </div>

              <button
                onClick={() => setSpeed((s) => Number((Math.max(s - 0.1, 0.1)).toFixed(1)))}
                className="p-1 text-zinc-400 hover:text-emerald-400"
              >
                <ChevronDown size={20} />
              </button>
            </div>
          )}

          <button
            onClick={() => setActive(!active)}
            className={`flex cursor-pointer items-center justify-center transition-all ${active ? 'w-8 h-8 bg-emerald-500/20 text-emerald-500 rounded-full' : 'w-12 h-12 bg-emerald-500 text-black rounded-2xl'}`}
          >
            {active ? <Pause size={20} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-1" />}
          </button>
        </div>
      </div>
    </div>
  );
}
