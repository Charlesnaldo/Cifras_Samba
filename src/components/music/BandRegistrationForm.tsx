'use client';

import { useState } from 'react';
import { Upload, Youtube, Users, Phone, Music, MapPin, CheckCircle2, Loader2, Image as ImageIcon, ChevronRight, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BandRegistrationForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState({
        name: '',
        city: '',
        state: '',
        phone: '',
        members: '',
        genre: '',
        videoUrl: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        // Lógica de manipulação de arquivo iria aqui
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulação de envio para API
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsLoading(false);
        setIsSuccess(true);

        // Redirecionar após sucesso (opcional)
        setTimeout(() => {
            router.push('/bandas-locais');
        }, 3000);
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 size={48} className="text-emerald-500" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-foreground italic uppercase tracking-tighter">Cadastro Realizado!</h2>
                    <p className="text-zinc-400 max-w-md mx-auto">
                        Sua banda foi enviada para análise e em breve estará disponível em nossa plataforma.
                    </p>
                </div>
                <button
                    onClick={() => router.push('/bandas-locais')}
                    className="mt-8 px-8 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-emerald-500/50 transition-all uppercase text-xs font-bold tracking-widest"
                >
                    Voltar para Bandas
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Stepper Wizard */}
            <div className="flex items-center justify-between relative mb-12 px-4">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-zinc-800 -z-10" />

                {[1, 2, 3].map((step) => (
                    <div
                        key={step}
                        className={`flex flex-col items-center gap-2 ${currentStep >= step ? 'text-emerald-500' : 'text-zinc-600'}`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all duration-500 bg-background ${currentStep >= step
                                ? 'border-emerald-500 bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                                : 'border-zinc-800 bg-background text-zinc-600'
                            }`}>
                            {step}
                        </div>
                        <span className="text-[10px] uppercase tracking-widest font-bold bg-background px-2">
                            {step === 1 && 'Dados'}
                            {step === 2 && 'Mídia'}
                            {step === 3 && 'Final'}
                        </span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 min-h-[400px]">

                {/* Passo 1: Informações Básicas */}
                {currentStep === 1 && (
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 backdrop-blur-sm space-y-6 animate-in slide-in-from-right-8 duration-300">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                <Music size={20} />
                            </div>
                            <h3 className="text-xl font-black text-foreground uppercase italic tracking-tighter">Quem são vocês?</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Nome da Banda</label>
                                <input
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ex: Grupo Revelação"
                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-700 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Estilo Principal</label>
                                <select
                                    required
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-zinc-200 outline-none transition-all appearance-none"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Samba de Raiz">Samba de Raiz</option>
                                    <option value="Pagode 90">Pagode 90</option>
                                    <option value="Pagode Atual">Pagode Atual</option>
                                    <option value="Partido Alto">Partido Alto</option>
                                    <option value="Samba Enredo">Samba Enredo</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Nº Integrantes</label>
                                <input
                                    type="number"
                                    required
                                    name="members"
                                    value={formData.members}
                                    onChange={handleChange}
                                    placeholder="Ex: 5"
                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-700 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">WhatsApp Contato</label>
                                <input
                                    required
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="(00) 00000-0000"
                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-700 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Descrição Curta</label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Conte um pouco sobre a história e repertório da banda..."
                                className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-700 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                )}

                {/* Passo 2: Localização e Mídia */}
                {currentStep === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 backdrop-blur-sm space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                    <MapPin size={20} />
                                </div>
                                <h3 className="text-xl font-black text-foreground uppercase italic tracking-tighter">Onde vocês tocam?</h3>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Cidade</label>
                                    <input
                                        required
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="São Paulo"
                                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-700 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">UF</label>
                                    <input
                                        required
                                        name="state"
                                        maxLength={2}
                                        value={formData.state}
                                        onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value.toUpperCase() }))}
                                        placeholder="SP"
                                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-700 outline-none transition-all text-center"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 backdrop-blur-sm space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                    <Youtube size={20} />
                                </div>
                                <h3 className="text-xl font-black text-foreground uppercase italic tracking-tighter">Mostre seu som</h3>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Link do Youtube / Instagram</label>
                                <input
                                    name="videoUrl"
                                    type="url"
                                    value={formData.videoUrl}
                                    onChange={handleChange}
                                    placeholder="https://youtube.com/..."
                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-700 outline-none transition-all"
                                />
                                <p className="text-[10px] text-zinc-600 pl-1">Cole um link de uma apresentação da banda</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Passo 3: Foto e Finalização */}
                {currentStep === 3 && (
                    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 backdrop-blur-sm space-y-6 animate-in slide-in-from-right-8 duration-300">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                <ImageIcon size={20} />
                            </div>
                            <h3 className="text-xl font-black text-foreground uppercase italic tracking-tighter">Foto de Capa</h3>
                        </div>

                        <div
                            className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${dragActive ? 'border-emerald-500 bg-emerald-500/5' : 'border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-900'
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <div className="w-20 h-20 rounded-full bg-zinc-950 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg border border-white/5">
                                <Upload size={32} className="text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <p className="text-foreground font-bold text-lg">Clique ou arraste a melhor foto da banda</p>
                            <p className="text-zinc-500 text-sm mt-2">Formatos: JPG, PNG ou WEBP (Max. 5MB)</p>
                            <input type="file" className="hidden" accept="image/*" />
                        </div>
                    </div>
                )}

                {/* Navegação entre Passos */}
                <div className="flex justify-between pt-4 border-t border-white/5">
                    {currentStep > 1 ? (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all font-bold text-xs uppercase tracking-widest"
                        >
                            <ChevronLeft size={16} /> Voltar
                        </button>
                    ) : <div />}

                    {currentStep < 3 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="flex items-center gap-2 px-8 py-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all"
                        >
                            Próximo <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>Divulgar Meu Trabalho</> // Microcopy melhorada
                            )}
                        </button>
                    )}
                </div>

            </form>
        </div>
    );
}
