import React, { useState } from 'react';
import { AnamnesisData } from '../types';
import { Loader2, Send } from 'lucide-react';

interface AnamnesisFormProps {
  onSubmit: (data: AnamnesisData) => Promise<void>;
  isSubmitting: boolean;
}

const initialData: AnamnesisData = {
  fullName: '',
  phone: '',
  email: '',
  birthDate: '',
  wearContacts: false,
  eyeConditions: false,
  recentEyeSurgery: false,
  pregnant: false,
  allergies: '',
  medications: '',
  previousReactions: false,
  hormonalImbalance: false
};

export const AnamnesisForm: React.FC<AnamnesisFormProps> = ({ onSubmit, isSubmitting }) => {
  const [data, setData] = useState<AnamnesisData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name: keyof AnamnesisData) => {
    setData(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  const ToggleBtn = ({ name, label, value }: { name: keyof AnamnesisData; label: string; value: boolean }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-rose-100 shadow-sm hover:border-rose-300 transition-colors cursor-pointer" onClick={() => handleToggle(name)}>
      <span className="text-stone-700 font-medium">{label}</span>
      <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${value ? 'bg-rose-500' : 'bg-stone-200'}`}>
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-0'}`} />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white/50 backdrop-blur-sm p-6 md:p-10 rounded-3xl shadow-xl border border-white">
      
      <div className="space-y-6">
        <h3 className="text-2xl font-serif text-rose-950 border-b border-rose-200 pb-2">Datos Personales</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-stone-600">Nombre Completo</label>
            <input 
              required
              type="text" 
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none bg-white/80"
              placeholder="Ej. María Pérez"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-stone-600">Fecha de Nacimiento</label>
            <input 
              required
              type="date" 
              name="birthDate"
              value={data.birthDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none bg-white/80"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-stone-600">Teléfono</label>
            <input 
              required
              type="tel" 
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none bg-white/80"
              placeholder="+56 9 1234 5678"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-stone-600">Email</label>
            <input 
              required
              type="email" 
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none bg-white/80"
              placeholder="cliente@email.com"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-serif text-rose-950 border-b border-rose-200 pb-2">Historial Médico & Ocular</h3>
        <p className="text-stone-500 text-sm italic">Por favor, responda con sinceridad para garantizar su seguridad durante el procedimiento.</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <ToggleBtn name="wearContacts" label="¿Usa lentes de contacto?" value={data.wearContacts} />
          <ToggleBtn name="eyeConditions" label="¿Tiene infecciones oculares (glaucoma, conjuntivitis)?" value={data.eyeConditions} />
          <ToggleBtn name="recentEyeSurgery" label="¿Cirugía ocular reciente (últimos 6 meses)?" value={data.recentEyeSurgery} />
          <ToggleBtn name="pregnant" label="¿Está embarazada o lactando?" value={data.pregnant} />
          <ToggleBtn name="hormonalImbalance" label="¿Desórdenes hormonales?" value={data.hormonalImbalance} />
          <ToggleBtn name="previousReactions" label="¿Reacción previa a lifting o tintes?" value={data.previousReactions} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-stone-600">Alergias Conocidas</label>
          <input 
            type="text" 
            name="allergies"
            value={data.allergies}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none bg-white/80"
            placeholder="Látex, acrílicos, adhesivos, tintes..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-stone-600">Medicamentos Actuales</label>
          <input 
            type="text" 
            name="medications"
            value={data.medications}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none bg-white/80"
            placeholder="Vitaminas, antibióticos, gotas para ojos..."
          />
        </div>
      </div>

      <div className="pt-6">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold text-lg hover:bg-stone-800 transition-all transform hover:scale-[1.01] shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Analizando Perfil...
            </>
          ) : (
            <>
              Enviar y Evaluar Aptitud
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
        <p className="text-center text-xs text-stone-400 mt-4">
          Al enviar este formulario, usted confirma que la información proporcionada es verídica.
          Una IA analizará sus respuestas para sugerir precauciones.
        </p>
      </div>
    </form>
  );
};
