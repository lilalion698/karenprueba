import React from 'react';
import { AnalysisResult } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { XCircle, CheckCircle, AlertTriangle, X } from 'lucide-react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult | null;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose, result }) => {
  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-rose-50 rounded-t-2xl">
          <h2 className="text-2xl font-serif text-stone-800 flex items-center gap-2">
            Resultados de la Evaluación IA
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-rose-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-stone-600" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Status Header */}
          <div className={`flex items-center gap-4 p-4 rounded-xl border ${
            result.safeToProceed 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {result.safeToProceed ? (
              <CheckCircle className="w-10 h-10" />
            ) : (
              <XCircle className="w-10 h-10" />
            )}
            <div>
              <h3 className="font-bold text-lg">
                {result.safeToProceed ? 'Apto para Tratamiento' : 'Precaución Requerida'}
              </h3>
              <p className="text-sm opacity-90">Nivel de Riesgo: <strong>{result.riskLevel}</strong></p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Chart Section */}
            <div className="h-64 w-full bg-stone-50 rounded-xl p-2 relative">
               <h4 className="absolute top-2 left-4 text-xs font-bold text-stone-400 uppercase tracking-widest">Métricas de Aptitud</h4>
               <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={result.suitabilityMetrics}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#78716c', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Cliente"
                    dataKey="A"
                    stroke="#fb7185"
                    strokeWidth={3}
                    fill="#fb7185"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Recommendations Section */}
            <div className="space-y-4">
              <h4 className="font-serif text-xl text-stone-800">Recomendaciones</h4>
              <ul className="space-y-3">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-stone-600 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
            <h4 className="font-bold text-stone-700 mb-2">Análisis Detallado</h4>
            <p className="text-stone-600 text-sm leading-relaxed">{result.reasoning}</p>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
