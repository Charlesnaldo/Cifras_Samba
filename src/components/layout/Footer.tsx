// src/components/layout/Footer.tsx
import { Instagram, Youtube, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-10 mt-20 border-t-4 border-orange-600">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sobre */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 italic uppercase">CifraSamba</h3>
          <p className="text-sm leading-relaxed">
            A maior base de dados de acordes para Cavaquinho, Banjo e Violão focada 100% no mundo do Samba e Pagode.
          </p>
        </div>

        {/* Links Rápidos */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Instrumentos</h3>
          <ul className="text-sm space-y-2">
            <li className="hover:text-orange-500 cursor-pointer">Dicionário de Cavaquinho</li>
            <li className="hover:text-orange-500 cursor-pointer">Dicionário de Banjo</li>
            <li className="hover:text-orange-500 cursor-pointer">Dicionário de Violão</li>
            <li className="hover:text-orange-500 cursor-pointer">Afinações</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Comunidade</h3>
          <div className="flex gap-4">
            <Instagram className="hover:text-pink-500 cursor-pointer" />
            <Youtube className="hover:text-red-500 cursor-pointer" />
            <Github className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
      
      <div className="text-center text-xs mt-10 border-t border-zinc-800 pt-6">
        © {new Date().getFullYear()} CifraSamba - Feito por quem ama o cavaco.
      </div>
    </footer>
  );
}