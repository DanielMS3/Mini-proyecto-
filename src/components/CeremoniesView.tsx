import React, { useState } from 'react';
import { Target, CheckCircle2, AlertCircle, Award, ListChecks, Calendar, MessageSquare } from 'lucide-react';
import { DAILY_SCRUM_LOGS, RETROSPECTIVE_AGREEMENTS, TEAM_MEMBERS } from '../data/scrumData';

export const CeremoniesView: React.FC = () => {
  const [activeCeremony, setActiveCeremony] = useState<'planning' | 'daily' | 'review' | 'retro'>('planning');
  const [selectedDailyDay, setSelectedDailyDay] = useState(1);
  const [agreements, setAgreements] = useState(RETROSPECTIVE_AGREEMENTS);

  const toggleAgreement = (index: number) => {
    setAgreements((prev) =>
      prev.map((item, i) => (i === index ? { ...item, verified: !item.verified } : item))
    );
  };

  const currentDaily = DAILY_SCRUM_LOGS.find((d) => d.day === selectedDailyDay) || DAILY_SCRUM_LOGS[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Eventos y Ceremonias Ágiles
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              Inspección y Adaptación en el Sprint 1 (Día 1 a Día 5)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Actas formales del equipo: Jesús Telmo Nene (PO), Astrid Villota (SM) y Daniel Moreno (Desarrollo)
            </p>
          </div>

          {/* Ceremony Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-0.5 bg-slate-100 rounded-md border border-slate-200">
            <button
              onClick={() => setActiveCeremony('planning')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeCeremony === 'planning'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Sprint Planning
            </button>
            <button
              onClick={() => setActiveCeremony('daily')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeCeremony === 'daily'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Daily Scrums (1–5)
            </button>
            <button
              onClick={() => setActiveCeremony('review')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeCeremony === 'review'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. Sprint Review
            </button>
            <button
              onClick={() => setActiveCeremony('retro')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeCeremony === 'retro'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4. Retrospectiva
            </button>
          </div>
        </div>

        {/* Roles Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="p-3 bg-slate-50 border border-slate-200 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{member.name}</span>
                <span className="text-[11px] font-medium text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {member.role}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">{member.bio}</p>
              <div className="mt-2 text-[10px] text-slate-500">
                A cargo de: <span className="text-slate-700 font-medium">{member.reportSections}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ceremony Content */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        {/* 1. SPRINT PLANNING */}
        {activeCeremony === 'planning' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-semibold text-blue-700">ACTA MODELO · DÍA 1 · 35 MINUTOS</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">Planificación del Sprint</h3>
              </div>
              <div className="text-xs text-slate-500">
                Asisten: <span className="text-slate-800 font-semibold">Jesús (PO), Astrid (SM), Daniel (Dev)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wide">
                  <Target className="w-4 h-4" />
                  <span>Objetivo del Sprint (Sprint Goal)</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  "Permitir que la mesa de soporte del ISP registre un reporte de falla completo y que pueda verificar, mediante un folio, si cada intento quedó registrado o fue rechazado."
                </p>
                <p className="text-[11px] text-slate-600 pt-1">
                  Se seleccionaron <span className="font-semibold text-slate-900">PB01, PB02 y PB03 (13 puntos)</span> porque permiten recorrer el flujo de principio a fin de forma autónoma.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Definición de Terminado (DoD)</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  "El incremento se abre localmente, funciona con datos ficticios, muestra el resultado de cada intento, deja un evento correlacionado y permite reproducir los cuatro casos de prueba CP01–CP04."
                </p>
                <p className="text-[11px] text-slate-600 pt-1">
                  Protege los datos personales según la <span className="font-semibold text-slate-900">Ley 1581 de 2012</span> guardando metadatos del evento sin exponer datos sensibles.
                </p>
              </div>
            </div>

            {/* Task plan table */}
            <div>
              <div className="text-xs font-bold text-slate-700 mb-2">
                Plan de Trabajo y Tareas Comprometidas (Tabla 4 del Documento):
              </div>
              <div className="space-y-2">
                {[
                  {
                    code: 'T1 · PB01 (5 pts)',
                    desc: 'Crear formulario, asignar folio por intento y mostrar resultado.',
                    evidence: 'CP01: Reporte completo',
                    status: 'Terminado'
                  },
                  {
                    code: 'T2 · PB02 (3 pts)',
                    desc: 'Validar sector y descripción, incluidos valores vacíos o con espacios (recorte .trim()).',
                    evidence: 'CP02 y CP03: Rechazos controlados',
                    status: 'Terminado'
                  },
                  {
                    code: 'T3 · PB03 (5 pts)',
                    desc: 'Mostrar bitácora correlacionada por folio, con versión y fecha.',
                    evidence: 'CP04: Consistencia de bitácora',
                    status: 'Terminado'
                  },
                  {
                    code: 'T4 · PB01–03',
                    desc: 'Integrar flujo y verificar casos antes de la Review (revisión cruzada Astrid y Jesús).',
                    evidence: 'Prototipo y matriz de resultados',
                    status: 'Terminado'
                  }
                ].map((t, i) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-mono font-bold text-blue-700 mr-2">{t.code}</span>
                      <span className="text-slate-800">{t.desc}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 text-[11px]">
                      <span className="text-slate-500 font-mono">{t.evidence}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold">
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. DAILY SCRUMS */}
        {activeCeremony === 'daily' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-semibold text-blue-700">SESIONES DIARIAS DE 15 MINUTOS</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">Seguimiento Diario de Daily Scrum</h3>
              </div>
              <p className="text-xs text-slate-500">
                Inspección frente al Sprint Goal y retiro de impedimentos
              </p>
            </div>

            {/* Day buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {DAILY_SCRUM_LOGS.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setSelectedDailyDay(d.day)}
                  className={`p-3 rounded-md border text-left transition-all ${
                    selectedDailyDay === d.day
                      ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">Día {d.day}</span>
                    <span className="text-[10px] text-slate-500">{d.phase}</span>
                  </div>
                  <span className="text-[11px] block mt-1 truncate">{d.mainVoice}</span>
                </button>
              ))}
            </div>

            {/* Daily Card */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <span className="text-xs font-mono text-blue-700 font-semibold">Día {currentDaily.day} · Fase: {currentDaily.phase}</span>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">Voz principal: {currentDaily.mainVoice}</div>
                </div>
                <span className="text-xs text-slate-500 font-mono bg-white px-2 py-1 rounded border border-slate-200">
                  Timebox: 15 min
                </span>
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-700 uppercase">Resumen del Trabajo:</div>
                <p className="text-xs text-slate-800 mt-0.5 leading-relaxed">{currentDaily.summary}</p>
              </div>

              <div className="p-3 bg-blue-50/80 border border-blue-200 rounded text-xs text-blue-950">
                <span className="font-bold">Inspección y Ajuste del Plan: </span>
                {currentDaily.inspectionAndAdjustment}
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-700 uppercase mb-2">Registro del Diálogo:</div>
                <div className="space-y-1.5 bg-white p-3 rounded border border-slate-200 text-xs">
                  {currentDaily.dialogue.map((line, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="font-bold text-slate-900 shrink-0">{line.speaker}:</span>
                      <span className="text-slate-700">{line.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. SPRINT REVIEW */}
        {activeCeremony === 'review' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-semibold text-blue-700">ACTA MODELO · DÍA 5 · 25 MINUTOS</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">Revisión del Sprint (Sprint Review)</h3>
              </div>
              <div className="text-xs text-slate-500">
                Participan: Jesús (PO), Astrid (SM), Daniel (Dev) y Representante de Soporte
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-3">
              <div className="text-xs font-bold text-blue-700 uppercase flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Demostración del Incremento v0.1</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed">
                Daniel abrió el prototipo ante el equipo y el representante de soporte. Registró un reporte nominal válido con Sector A, luego borró la descripción y envió un intento con solo espacios.
              </p>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-950">
                <span className="font-bold">Aprobación del Incremento: </span>
                Se verificó que ambos intentos generan folio correlativo (<span className="font-mono">INT-001</span> e <span className="font-mono">INT-002</span>). Se validaron los 13 puntos de PB01–PB03 dentro de la sesión.
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2 text-xs text-slate-800">
              <div className="font-bold text-slate-900 uppercase text-[11px]">Adaptación del Product Backlog para el Sprint 2:</div>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li><span className="font-semibold text-slate-900">PB04 (Persistencia)</span> se fija como máxima prioridad: cerrar el navegador no debe borrar la bitácora ni permitir reutilizar folios previos.</li>
                <li><span className="font-semibold text-slate-900">PB05 (Búsqueda por Folio)</span> queda justo después de PB04, pues buscar requiere conservar el historial entre turnos.</li>
              </ul>
            </div>
          </div>
        )}

        {/* 4. SPRINT RETROSPECTIVE */}
        {activeCeremony === 'retro' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-semibold text-blue-700">ACTA MODELO · DÍA 5 · 20 MINUTOS</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">Retrospectiva del Sprint (Sprint Retrospective)</h3>
              </div>
              <div className="text-xs text-slate-500">
                Equipo Scrum: acuerdos de mejora verificables
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                <ListChecks className="w-4 h-4 text-blue-700" />
                <span>Acuerdos de Mejora (Tabla 8 del Documento):</span>
              </div>

              {agreements.map((agr, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900">
                      Observación: "{agr.observation}"
                    </span>
                    <button
                      onClick={() => toggleAgreement(idx)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold border transition-colors ${
                        agr.verified
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-white text-slate-600 border-slate-300'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{agr.verified ? 'Acuerdo Verificado' : 'Por verificar'}</span>
                    </button>
                  </div>

                  <p className="text-slate-800">
                    <span className="font-semibold text-slate-700">Acuerdo de mejora: </span>
                    {agr.agreement}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                    <div>Responsable: <span className="font-medium text-slate-800">{agr.responsible}</span></div>
                    <div>Seguimiento: <span className="font-medium text-slate-800">{agr.tracking}</span></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reflection cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs">
                <div className="font-bold text-slate-900 mb-1">Product Owner (Jesús):</div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  "Priorizar es renunciar: dejar el cierre de casos fuera del primer Sprint permitió entregar algo completo y medible."
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs">
                <div className="font-bold text-slate-900 mb-1">Scrum Master (Astrid):</div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  "Facilitar es hacer preguntas y proteger el foco del equipo; el Daily permitió ajustar la validación de espacios sin desviarnos."
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs">
                <div className="font-bold text-slate-900 mb-1">Desarrollo (Daniel):</div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  "Un criterio de aceptación observable ahorra tiempo de programación; los folios conectaron formulario y bitácora perfectamente."
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
