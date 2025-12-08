import React from 'react';
import { Eye } from 'lucide-react';
import { useVisitCounter } from '../hooks/useVisitCounter';

const VisitCounter: React.FC = () => {
  const visitCount = useVisitCounter();

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-8 py-3 flex items-center justify-center gap-3 w-fit mx-auto shadow-lg hover:bg-gray-800/50 transition-colors duration-300">
      <Eye className="w-5 h-5 text-emerald-400" />
      <div className="flex items-baseline gap-2">
        <span className="text-gray-200 font-bold font-mono text-xl">
          {visitCount.toLocaleString('es-ES')}
        </span>
        <span className="text-gray-200 text-sm uppercase tracking-wider font-medium">
          Visitas
        </span>
      </div>
    </div>
  );
};

export default VisitCounter;
