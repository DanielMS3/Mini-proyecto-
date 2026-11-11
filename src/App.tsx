import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { IncidentForm } from './components/IncidentForm';
import { AuditLog } from './components/AuditLog';
import { ScrumBoard } from './components/ScrumBoard';
import { CeremoniesView } from './components/CeremoniesView';
import { TestRunner } from './components/TestRunner';
import { PerspectiveView } from './components/PerspectiveView';
import { ChatSimulator } from './components/ChatSimulator';
import { IncidentAttempt, BacklogItem } from './types';
import { INITIAL_BACKLOG, ACADEMIC_INFO } from './data/scrumData';
import { processIncidentAttempt, ValidationOutcome } from './services/ticketEngine';
import { Headphones, BookOpen, Layers, CheckSquare, Calendar, Award, ArrowRight } from 'lucide-react';

const INITIAL_ATTEMPTS_SEED: IncidentAttempt[] = [
  {
    id: 'seed-1',
    folio: 'INT-001',
    timestamp: '8 de noviembre de 2026, 18:31:56',
    rawDate: 1794270716000,
    version: 'v0.1',
    sector: 'Sector A',
    description: 'Caída de enlace troncal de fibra óptica con pérdida total de ping hacia la OLT.',
    status: 'Registrado',
    channel: 'WhatsApp Chat'
  },
  {
    id: 'seed-2',
    folio: 'INT-002',
    timestamp: '8 de noviembre de 2026, 18:31:56',
    rawDate: 1794270716500,
    version: 'v0.1',
    sector: 'Sector A',
    description: '   ',
    status: 'Rechazado',
    rejectionReason: 'La descripción es obligatoria y no puede contener únicamente espacios en blanco.',
    channel: 'WhatsApp Chat'
  },
  {
    id: 'seed-3',
    folio: 'INT-003',
    timestamp: '8 de noviembre de 2026, 18:31:57',
    rawDate: 1794270717000,
    version: 'v0.1',
    sector: '',
    description: 'Luz LOS en rojo parpadeante en la ONT del cliente sin acceso a navegación.',
    status: 'Rechazado',
    rejectionReason: 'El campo sector es obligatorio para ubicar geográficamente el incidente.',
    channel: 'Llamada Soporte'
  }
];

export default function App() {
  // Main section: 'mesa' (Center Stage) vs 'scrum_doc' (Sprint Documentation)
  const [mainSection, setMainSection] = useState<'mesa' | 'scrum_doc'>('mesa');
  const [docSubTab, setDocSubTab] = useState<'scrum' | 'ceremonias' | 'pruebas' | 'vision'>('scrum');
  const [version, setVersion] = useState<'v0.1' | 'v0.2'>('v0.1');
  const [attempts, setAttempts] = useState<IncidentAttempt[]>(INITIAL_ATTEMPTS_SEED);
  const [backlog, setBacklog] = useState<BacklogItem[]>(INITIAL_BACKLOG);
  const [lastOutcome, setLastOutcome] = useState<ValidationOutcome | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPreset, setChatPreset] = useState<{ sector: string; description: string } | null>(null);

  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (version === 'v0.2') {
      const saved = localStorage.getItem('sprintlab_isp_attempts_v02');
      if (saved) {
        try {
          setAttempts(JSON.parse(saved));
        } catch (e) {
          // ignore
        }
      }
    }
  }, [version]);

  const handleProcessAttempt = (
    sector: string,
    description: string,
    channel: 'WhatsApp Chat' | 'Llamada Soporte' | 'Portal Web' | 'Directo Agente'
  ): ValidationOutcome => {
    const outcome = processIncidentAttempt(sector, description, attempts, version, channel);
    const updatedAttempts = [outcome.attempt, ...attempts];
    setAttempts(updatedAttempts);
    setLastOutcome(outcome);

    if (version === 'v0.2') {
      localStorage.setItem('sprintlab_isp_attempts_v02', JSON.stringify(updatedAttempts));
    }

    return outcome;
  };

  const handleClearSession = () => {
    setAttempts([]);
    setLastOutcome(null);
    if (version === 'v0.2') {
      localStorage.removeItem('sprintlab_isp_attempts_v02');
    }
  };

  const handleToggleVersion = (newVer: 'v0.1' | 'v0.2') => {
    setVersion(newVer);
    if (newVer === 'v0.2') {
      const saved = localStorage.getItem('sprintlab_isp_attempts_v02');
      if (saved) {
        try {
          setAttempts(JSON.parse(saved));
        } catch (e) {
          // keep
        }
      }
    }
  };

  const handleAssignTech = (folio: string, technician: string) => {
    const updated = attempts.map((a) =>
      a.folio === folio
        ? {
            ...a,
            assignedTo: technician,
            assignedAt: new Date().toLocaleTimeString('es-CO')
          }
        : a
    );
    setAttempts(updated);
    if (version === 'v0.2') {
      localStorage.setItem('sprintlab_isp_attempts_v02', JSON.stringify(updated));
    }
  };

  const handleCloseCase = (folio: string, resolutionNote: string) => {
    const updated = attempts.map((a) =>
      a.folio === folio
        ? {
            ...a,
            resolutionNotes: resolutionNote,
            closedAt: new Date().toLocaleTimeString('es-CO')
          }
        : a
    );
    setAttempts(updated);
    if (version === 'v0.2') {
      localStorage.setItem('sprintlab_isp_attempts_v02', JSON.stringify(updated));
    }
  };

  const handleUpdateBacklogStatus = (id: string, newStatus: BacklogItem['status']) => {
    setBacklog((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const scrollToForm = () => {
    if (mainSection !== 'mesa') {
      setMainSection('mesa');
    }
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleGoToTests = () => {
    setMainSection('scrum_doc');
    setDocSubTab('pruebas');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        mainSection={mainSection}
        setMainSection={setMainSection}
        onNewRecordClick={scrollToForm}
        onRunTestsClick={handleGoToTests}
      />

      {/* Subheader Academic & Institutional Metadata Bar (Clean unboxed text, no pills) */}
      <div className="bg-white border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-900">{ACADEMIC_INFO.institution}</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>{ACADEMIC_INFO.program}</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>{ACADEMIC_INFO.course}</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-slate-500">
            <span className="text-slate-800 font-medium">Daniel Moreno · Jesús Telmo Nene · Astrid Villota</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="text-blue-700 font-medium">{ACADEMIC_INFO.professor}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* SECTION 1: MESA DE SOPORTE (PRIORITARIA Y DESTACADA) */}
        {mainSection === 'mesa' && (
          <div className="space-y-6">
            {/* Operational Banner with Quick Bridge to Documentation */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-slate-900 tracking-tight">
                    Mesa de Soporte de Telecomunicaciones · Registro de Fallas
                  </h1>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Flujo de atención al abonado. Todo intento ingresado recibe un folio único correlativo (<span className="font-mono font-medium text-slate-900">INT-00x</span>) y genera un evento de auditoría.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setMainSection('scrum_doc')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md border border-blue-200 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Ver Memoria Scrum & Pruebas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Registration Form Component */}
            <IncidentForm
              formRef={formRef}
              onProcessAttempt={handleProcessAttempt}
              version={version}
              lastOutcome={lastOutcome}
              onSelectChat={() => setIsChatOpen(true)}
              quickFillPreset={chatPreset}
            />

            {/* Audit Log and Records Table Component */}
            <AuditLog
              attempts={attempts}
              onClearSession={handleClearSession}
              version={version}
              onToggleVersion={handleToggleVersion}
              onAssignTech={handleAssignTech}
              onCloseCase={handleCloseCase}
            />
          </div>
        )}

        {/* SECTION 2: DOCUMENTACIÓN DEL SPRINT & METODOLOGÍA SCRUM (SEPARADA Y ORDENADA) */}
        {mainSection === 'scrum_doc' && (
          <div className="space-y-6">
            {/* Navigation Bar inside the Documentation Section */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMainSection('mesa')}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 mr-2 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <span>← Volver a Mesa de Soporte</span>
                </button>
                <span className="text-xs font-bold text-slate-900 hidden sm:inline">
                  Memoria del Sprint 1:
                </span>
              </div>

              {/* Sub-tabs */}
              <div className="flex flex-wrap items-center gap-1 p-0.5 bg-slate-100 rounded-md border border-slate-200">
                <button
                  onClick={() => setDocSubTab('scrum')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    docSubTab === 'scrum'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tablero Scrum (13 pts)
                </button>
                <button
                  onClick={() => setDocSubTab('ceremonias')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    docSubTab === 'ceremonias'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ceremonias del Sprint
                </button>
                <button
                  onClick={() => setDocSubTab('pruebas')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    docSubTab === 'pruebas'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Matriz de Pruebas (CP01–04)
                </button>
                <button
                  onClick={() => setDocSubTab('vision')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    docSubTab === 'vision'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Marco & Referencias APA
                </button>
              </div>
            </div>

            {/* Sub-tab view switch */}
            {docSubTab === 'scrum' && (
              <ScrumBoard backlog={backlog} onUpdateStatus={handleUpdateBacklogStatus} />
            )}

            {docSubTab === 'ceremonias' && <CeremoniesView />}

            {docSubTab === 'pruebas' && <TestRunner />}

            {docSubTab === 'vision' && <PerspectiveView />}
          </div>
        )}
      </main>

      {/* Customer WhatsApp Chat Simulator Drawer */}
      <ChatSimulator
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onSelectChatPreset={(preset) => {
          setChatPreset(preset);
          setMainSection('mesa');
        }}
      />

      {/* Clean Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            <span>Seminario de Actualización N6 Gr B · Tecnológica del Oriente</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>Simulación de Sprint de Scrum (2026)</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span>IEEE SWEBOK V3.0</span>
            <span aria-hidden="true">·</span>
            <span>Scrum Guide 2020</span>
            <span aria-hidden="true">·</span>
            <span>Ley 1581 de 2012</span>
            <span aria-hidden="true">·</span>
            <span>CRC Resolución 5111/2017</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
