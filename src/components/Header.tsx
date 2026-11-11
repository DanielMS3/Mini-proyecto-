import React from 'react';
import { Headphones, BookOpen, PlusCircle, Play, Layers } from 'lucide-react';

interface HeaderProps {
  mainSection: 'mesa' | 'scrum_doc';
  setMainSection: (section: 'mesa' | 'scrum_doc') => void;
  onNewRecordClick: () => void;
  onRunTestsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mainSection,
  setMainSection,
  onNewRecordClick,
  onRunTestsClick
}) => {
  return (
    <header className="bg-white border-b border-slate-250 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-md bg-blue-700 flex items-center justify-center text-white font-bold shadow-xs">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-slate-900 tracking-tight leading-none">
                Mesa de Soporte <span className="text-blue-700 font-semibold">ISP</span>
              </div>
              <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                Registro y Trazabilidad de Fallas
              </div>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-4 text-sm font-medium">
            <button
              onClick={() => setMainSection('mesa')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md transition-colors text-sm ${
                mainSection === 'mesa'
                  ? 'bg-blue-50 text-blue-800 font-semibold border border-blue-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Headphones className="w-4 h-4 text-blue-700" />
              <span>Mesa de Soporte</span>
            </button>

            <button
              onClick={() => setMainSection('scrum_doc')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md transition-colors text-sm ${
                mainSection === 'scrum_doc'
                  ? 'bg-blue-50 text-blue-800 font-semibold border border-blue-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-600" />
              <span>Documentación del Sprint & Scrum</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            {mainSection === 'mesa' ? (
              <button
                onClick={onNewRecordClick}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors shadow-xs active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Nuevo Reporte</span>
              </button>
            ) : (
              <button
                onClick={onRunTestsClick}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors shadow-xs active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Ejecutar CP01–CP04</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
