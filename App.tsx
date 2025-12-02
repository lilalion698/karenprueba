import React, { useState, useRef } from 'react';
import { AnamnesisForm } from './components/AnamnesisForm';
import { AnalysisModal } from './components/AnalysisModal';
import { AnamnesisData, AnalysisResult } from './types';
import { analyzeClientForm } from './services/geminiService';
import { Sparkles, Eye, ShieldCheck, Clock, Check } from 'lucide-react';

const App: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (data: AnamnesisData) => {
    setIsSubmitting(true);
    try {
      const result = await analyzeClientForm(data);
      setAnalysisResult(result);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error analyzing form:', error);
      alert('Hubo un error al procesar el formulario. Por favor intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-stone-800 bg-stone-50 selection:bg-rose-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-8 h-8 text-rose-500" />
            <span className="font-serif text-2xl font-bold tracking-tight">LashLift<span className="text-rose-500">.</span>Pro</span>
          </div>
          <button 
            onClick={scrollToForm}
            className="hidden md:block px-6 py-2 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            Reservar Cita
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-rose-100 to-transparent -z-10 opacity-50" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-full border border-rose-100 text-rose-800 text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Tecnología AI para tu seguridad</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif leading-tight">
              Realza tu mirada natural con <span className="text-rose-500 italic">Lifting de Pestañas</span>
            </h1>
            <p className="text-lg text-stone-600 max-w-md leading-relaxed">
              Un tratamiento profesional que eleva, curva y estira tus pestañas naturales para crear una mirada despierta y radiante sin necesidad de extensiones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToForm}
                className="px-8 py-4 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 hover:shadow-xl"
              >
                Completar Anamnesis
              </button>
              <button className="px-8 py-4 bg-white text-stone-700 border border-stone-200 rounded-full font-medium hover:bg-stone-50 transition-colors">
                Ver Procedimiento
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://picsum.photos/800/1000?grayscale" 
                alt="Lash Lift Result" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-200 rounded-full blur-3xl opacity-50 -z-0" />
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-yellow-100 rounded-full blur-3xl opacity-50 -z-0" />
          </div>
        </div>
      </header>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">¿Por qué elegir Lash Lifting?</h2>
            <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Duración Prolongada",
                desc: "Disfruta de pestañas perfectas durante 6 a 8 semanas, dependiendo de tu ciclo natural."
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Seguro y Natural",
                desc: "Utilizamos productos de alta gama con keratina que nutren tus pestañas en lugar de dañarlas."
              },
              {
                icon: <Check className="w-6 h-6" />,
                title: "Bajo Mantenimiento",
                desc: "Olvídate del rizador y la máscara diaria. Despierta lista cada mañana."
              }
            ].map((benefit, i) => (
              <div key={i} className="p-8 rounded-2xl bg-stone-50 hover:bg-rose-50 transition-colors border border-stone-100 group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif">{benefit.title}</h3>
                <p className="text-stone-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className="py-24 bg-gradient-to-b from-rose-50 to-white relative">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-bold tracking-widest text-sm uppercase">Paso 1</span>
            <h2 className="text-4xl font-serif mt-2 mb-4 text-stone-900">Ficha de Anamnesis</h2>
            <p className="text-stone-600">
              Para garantizar un procedimiento seguro y resultados óptimos, necesitamos conocer su historial.
              Nuestra IA evaluará sus respuestas al instante.
            </p>
          </div>

          <AnamnesisForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-rose-500" />
            <span className="font-serif text-xl font-bold text-white tracking-tight">LashLift.Pro</span>
          </div>
          <p className="text-sm">© 2024 LashLift Pro. Todos los derechos reservados.</p>
        </div>
      </footer>

      <AnalysisModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        result={analysisResult} 
      />
    </div>
  );
};

export default App;
