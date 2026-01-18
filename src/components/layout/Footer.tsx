import { Github, Instagram, Youtube, Music } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/5 bg-[#050505] pt-16 pb-8 overflow-hidden">
      {/* Luz de fundo roxa no footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-emerald-600/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Music className="text-emerald-500" />
              <span className="text-xl font-black text-white italic">CIFRASAMBA</span>
            </div>
            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed">
              A maior e mais moderna plataforma de cifras para sambistas e pagodeiros. 
              Feito de músico para músico.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Navegação</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Novas Cifras</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Mais Tocadas</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Dicionário de Acordes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Social</h4>
            <div className="flex gap-4">
              <Github className="text-zinc-500 hover:text-white cursor-pointer transition-colors" size={20} />
              <Instagram className="text-zinc-500 hover:text-emerald-400 cursor-pointer transition-colors" size={20} />
              <Youtube className="text-zinc-500 hover:text-red-500 cursor-pointer transition-colors" size={20} />
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:row items-center justify-between gap-4 text-zinc-600 text-[11px] font-medium uppercase tracking-[0.2em]">
          <p>© 2026 CIFRASAMBA - TODOS OS DIREITOS RESERVADOS</p>
          <p className="flex items-center gap-1">
            DESENVOLVIDO COM <span className="text-emerald-500">💜</span> PARA A COMUNIDADE
          </p>
        </div>
      </div>
    </footer>
  );
}