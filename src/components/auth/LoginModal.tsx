'use client';

import { useState } from 'react';
import { Mail, Lock, LogIn, Mic2, X, Eye, EyeOff, Github, Chrome } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop com Blur Profundo */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose}
      />

      {/* Card Principal - O Luxo está nos Detalhes */}
      <div className="relative w-full max-w-[420px] bg-zinc-900/90 border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] p-7 md:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-8 duration-500 overflow-hidden">
        
        {/* Glows de Fundo Artísticos */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/15 blur-[60px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-600/10 blur-[60px] rounded-full" />

        {/* BOTÃO FECHAR - Grande, Lindo e Funcional */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-50 p-3 text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all active:scale-90 border border-white/5"
        >
          <X size={24} strokeWidth={2} />
        </button>

        {/* Header com Ícone Glow */}
        <div className="text-center mb-8 relative">
          <div className="inline-flex p-4 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-[2rem] border border-emerald-500/20 mb-4 shadow-2xl">
            <Mic2 size={32} className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
          <h1 className="text-3xl text-white uppercase italic tracking-tighter font-black leading-none">
            Cifra<span className="text-emerald-500">Samba</span>
          </h1>
          <div className="h-1 w-12 bg-emerald-500/40 mx-auto mt-3 rounded-full" />
        </div>

        <form className="space-y-4 relative" onSubmit={(e) => e.preventDefault()}>
          
          {/* E-mail com Focus Style */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-4 italic">E-mail</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                type="email"
                className="w-full bg-zinc-800/30 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/40 focus:bg-zinc-800/60 transition-all placeholder:text-zinc-700 shadow-inner"
                placeholder="sambista@exemplo.com"
              />
            </div>
          </div>

          {/* Senha com Eye Toggle */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-4">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Senha</label>
            </div>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                className="w-full bg-zinc-800/30 border border-white/5 rounded-2xl py-4 pl-14 pr-12 text-white text-sm focus:outline-none focus:border-emerald-500/40 focus:bg-zinc-800/60 transition-all placeholder:text-zinc-700 shadow-inner"
                placeholder="••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-emerald-500 transition-colors p-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Botão de Ação - Efeito de Brilho */}
          <button className="w-full mt-6 group relative">
            <div className="absolute inset-0 bg-emerald-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-2xl" />
            <div className="relative flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-xs py-4.5 rounded-2xl transition-all active:scale-95 shadow-xl">
              <span>Entrar na Roda de Samba</span>
              <LogIn size={18} />
            </div>
          </button>

          {/* Divisor Elegante */}
          <div className="flex items-center gap-4 py-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Social</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          {/* Social Logins - Minimalistas mas Premium */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-zinc-800/40 border border-white/5 py-3 rounded-xl hover:bg-zinc-800/80 hover:border-white/10 transition-all text-zinc-400 hover:text-white">
              <Chrome size={16} />
              <span className="text-[10px] font-bold uppercase">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-zinc-800/40 border border-white/5 py-3 rounded-xl hover:bg-zinc-800/80 hover:border-white/10 transition-all text-zinc-400 hover:text-white">
              <Github size={16} />
              <span className="text-[10px] font-bold uppercase">Github</span>
            </button>
          </div>
        </form>

        <p className="text-center mt-8 text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
          Novo por aqui? <button className="text-emerald-500 hover:text-emerald-400 underline underline-offset-4 decoration-emerald-500/20">Crie seu perfil</button>
        </p>
      </div>
    </div>
  );
}