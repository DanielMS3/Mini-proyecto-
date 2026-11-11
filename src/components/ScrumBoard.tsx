import React, { useState } from 'react';
import { Layers, CheckCircle2, Clock, ArrowRight, ArrowLeft, User, TrendingDown, FileText } from 'lucide-react';
import { BacklogItem } from '../types';

interface ScrumBoardProps {
  backlog: BacklogItem[];
  onUpdateStatus: (id: string, newStatus: BacklogItem['status']) => void;
}

export const ScrumBoard: React.FC<ScrumBoardProps> = ({ backlog, onUpdateStatus }) => {
  const [sprintFilter, setSprintFilter] = useState<'sprint1' | 'all'>('sprint1');

  const filteredItems = backlog.filter((item) => {
    if (sprintFilter === 'sprint1') return item.sprint === 1;
    return true;
  });

  const columns: { label: string; status: BacklogItem['status']; headerBg: string }[] = [
    { label: 'Por Hacer', status: 'Por Hacer', headerBg: 'bg-slate-100 text-slate-700' },
    { label: 'En Progreso', status: 'En Progreso', headerBg: 'bg-amber-100 text-amber-900' },
    { label: 'En Pruebas / Revisión', status: 'En Pruebas', headerBg: 'bg-blue-100 text-blue-900' },
    { label: 'Terminado (DoD)', status: 'Terminado', headerBg: 'bg-emerald-100 text-emerald-900' }
  ];

  const advanceStatus = (item: BacklogItem) => {
    const sequence: BacklogItem['status'][] = ['Por Hacer', 'En Progreso', 'En Pruebas', 'Terminado'];
    const idx = sequence.indexOf(item.status);
    if (idx < sequence.length - 1) {
      onUpdateStatus(item.id, sequence[idx + 1]);
    }
  };

  const regressedStatus = (item: BacklogItem) => {
    const sequence: BacklogItem['status'][] = ['Por Hacer', 'En Progreso', 'En Pruebas', 'Terminado'];
    const idx = sequence.indexOf(item.status);
    if (idx > 0) {
      onUpdateStatus(item.id, sequence[idx - 1]);
    }
  };

  const s1Items = backlog.filter((i) => i.sprint === 1);
  const s1TotalPoints = s1Items.reduce((acc, i) => acc + i.points, 0);
  const s1CompletedPoints = s1Items.filter((i) => i.status === 'Terminado').reduce((acc, i) => acc + i.points, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner & Sprint Metrics */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Sprint Backlog & Product Backlog
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              Tablero de Desarrollo Ágil (Scrum)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Estimación en serie de Fibonacci (Heras del Dedo & Álvarez García, 2017) · Daniel Moreno, Jesús Telmo Nene, Astrid Villota
            </p>
          </div>

          {/* Sprint Filter */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-md border border-slate-200">
            <button
              onClick={() => setSprintFilter('sprint1')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                sprintFilter === 'sprint1'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sprint 1 (13 Pts Comprometidos)
            </button>
            <button
              onClick={() => setSprintFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                sprintFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Product Backlog Completo (Sprints 1–4)
            </button>
          </div>
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
            <div className="text-[11px] font-medium text-slate-500">Velocidad Sprint 1</div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
              {s1CompletedPoints} / {s1TotalPoints} pts
            </div>
            <div className="text-[11px] text-emerald-700 mt-0.5 font-medium">100% completado</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
            <div className="text-[11px] font-medium text-slate-500">Duración del Timebox</div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">5 días hábiles</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Día 1 a Día 5</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
            <div className="text-[11px] font-medium text-slate-500">Equipo Scrum</div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">3 roles</div>
            <div className="text-[11px] text-slate-500 mt-0.5">PO, SM y Desarrollador</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
            <div className="text-[11px] font-medium text-slate-500">Curva Burndown</div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5 flex items-center gap-1">
              <TrendingDown className="w-5 h-5 text-emerald-700" />
              <span>13 → 0 pts</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Completado a tiempo</div>
          </div>
        </div>

        {/* Burndown strip */}
        <div className="mt-4 p-3 bg-slate-50 rounded-md border border-slate-200">
          <div className="text-xs font-semibold text-slate-700 mb-2">
            Seguimiento de Quemado Diario (Burndown):
          </div>
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {[
              { day: 'Día 1', pts: '13 pts', note: 'Planning' },
              { day: 'Día 2', pts: '10 pts', note: 'Formulario base' },
              { day: 'Día 3', pts: '5 pts', note: 'Validación .trim()' },
              { day: 'Día 4', pts: '2 pts', note: 'Pruebas CP01-04' },
              { day: 'Día 5', pts: '0 pts', note: 'Review & Retro' }
            ].map((d, i) => (
              <div key={i} className="p-2 bg-white rounded border border-slate-200">
                <div className="text-[11px] text-slate-500">{d.day}</div>
                <div className="font-mono font-bold text-slate-900 my-0.5">{d.pts}</div>
                <div className="text-[10px] text-slate-500">{d.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const itemsInCol = filteredItems.filter((i) => i.status === col.status);
          const colPoints = itemsInCol.reduce((acc, i) => acc + i.points, 0);

          return (
            <div
              key={col.status}
              className="bg-slate-100/70 border border-slate-200 rounded-lg p-3 flex flex-col min-h-[460px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${col.headerBg}`}>
                  {col.label}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {itemsInCol.length} ({colPoints} pts)
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {itemsInCol.length === 0 ? (
                  <div className="h-28 flex items-center justify-center border border-dashed border-slate-300 rounded text-slate-400 text-xs">
                    Sin historias
                  </div>
                ) : (
                  itemsInCol.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-md p-3 shadow-xs space-y-2 hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                          {item.id}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                          <span className="font-semibold text-slate-700">{item.points} pts</span>
                          <span>·</span>
                          <span>Sprint {item.sprint}</span>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {item.title}
                      </h4>

                      <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 italic">
                        "{item.userStory}"
                      </p>

                      <div className="text-[11px] text-slate-700">
                        <span className="font-semibold text-slate-600 block text-[10px] uppercase">
                          Criterio de Aceptación:
                        </span>
                        <p className="mt-0.5 text-slate-800">{item.acceptanceCriteria}</p>
                      </div>

                      {item.testCaseRef && (
                        <div className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Evidencia: {item.testCaseRef}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-[11px]">
                        <span className="text-slate-500 flex items-center gap-1 truncate">
                          <User className="w-3 h-3 text-slate-400" />
                          <span>{item.assignee}</span>
                        </span>

                        <div className="flex items-center gap-1 shrink-0">
                          {col.status !== 'Por Hacer' && (
                            <button
                              onClick={() => regressedStatus(item)}
                              title="Mover columna previa"
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}
                          {col.status !== 'Terminado' && (
                            <button
                              onClick={() => advanceStatus(item)}
                              title="Avanzar columna"
                              className="p-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
