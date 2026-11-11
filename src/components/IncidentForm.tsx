import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Copy, Check, MessageSquare, MapPin, FileText, CornerDownRight } from 'lucide-react';
import { ISP_SECTORS } from '../data/scrumData';
import { ValidationOutcome } from '../services/ticketEngine';

interface IncidentFormProps {
  onProcessAttempt: (
    sector: string,
    description: string,
    channel: 'WhatsApp Chat' | 'Llamada Soporte' | 'Portal Web' | 'Directo Agente'
  ) => ValidationOutcome;
  version: 'v0.1' | 'v0.2';
  lastOutcome: ValidationOutcome | null;
  onSelectChat?: () => void;
  quickFillPreset?: { sector: string; description: string } | null;
  formRef?: React.RefObject<HTMLDivElement | null>;
}

export const IncidentForm: React.FC<IncidentFormProps> = ({
  onProcessAttempt,
  version,
  lastOutcome,
  onSelectChat,
  quickFillPreset,
  formRef
}) => {
  const [sector, setSector] = useState('Sector A');
  const [description, setDescription] = useState('Caída de enlace troncal de fibra óptica con pérdida de sincronismo en la ONT.');
  const [channel, setChannel] = useState<'WhatsApp Chat' | 'Llamada Soporte' | 'Portal Web' | 'Directo Agente'>('WhatsApp Chat');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (quickFillPreset) {
      setSector(quickFillPreset.sector);
      setDescription(quickFillPreset.description);
    }
  }, [quickFillPreset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProcessAttempt(sector, description, channel);
  };

  const loadPreset = (preset: 'CP01' | 'CP02' | 'CP03' | 'clear') => {
    if (preset === 'CP01') {
      setSector('Sector A');
      setDescription('Caída total de enlace troncal de fibra óptica con pérdida de ping hacia la OLT.');
    } else if (preset === 'CP02') {
      setSector('Sector A');
      setDescription('   ');
    } else if (preset === 'CP03') {
      setSector('');
      setDescription('Alarma óptica LOS parpadeando en rojo en equipo de abonado.');
    } else {
      setSector('');
      setDescription('');
    }
  };

  const handleCopyFolio = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasOnlySpaces = description.length > 0 && description.trim().length === 0;

  return (
    <div ref={formRef} className="bg-white border border-slate-200 rounded-lg p-5 md:p-6 shadow-xs">
      {/* Header of the Form */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Registrar Falla de Servicio
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ingreso de reportes para asignación de folio único y validación de criterios
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onSelectChat && (
            <button
              type="button"
              onClick={onSelectChat}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-200 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-700" />
              <span>Cargar desde Chat de Cliente</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Test Cases Bar */}
      <div className="mb-4 bg-slate-50 border border-slate-200/80 rounded-md p-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-[11px] font-semibold text-slate-600">
            Casos de prueba rápida (Sprint 1):
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => loadPreset('CP01')}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded transition-colors"
            >
              CP01 · Válido
            </button>
            <button
              type="button"
              onClick={() => loadPreset('CP02')}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded transition-colors"
            >
              CP02 · Solo Espacios
            </button>
            <button
              type="button"
              onClick={() => loadPreset('CP03')}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded transition-colors"
            >
              CP03 · Sin Sector
            </button>
            <button
              type="button"
              onClick={() => loadPreset('clear')}
              className="px-2 py-1 text-xs font-normal text-slate-500 hover:text-slate-800 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sector input */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Sector Geográfico del Reporte <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                list="sector-suggestions"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="Ej. Sector A, Sector B, Sector Centro..."
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
              <datalist id="sector-suggestions">
                {ISP_SECTORS.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-slate-500">
              <span className="font-medium text-slate-600">Sectores habituales:</span>
              {['Sector A', 'Sector B', 'Sector Centro', 'Sector Norte'].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSector(s)}
                  className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Channel selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Canal de Recepción
            </label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value as any)}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <option value="WhatsApp Chat">WhatsApp Soporte</option>
              <option value="Llamada Soporte">Llamada Telefónica</option>
              <option value="Portal Web">Portal Web de Clientes</option>
              <option value="Directo Agente">Recepción en Oficina</option>
            </select>
          </div>
        </div>

        {/* Description textarea */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700">
              Descripción de la Falla <span className="text-red-600">*</span>
            </label>
            <span className="text-[11px] text-slate-500 font-mono">
              {description.length} caracteres
              {hasOnlySpaces && (
                <span className="text-red-600 font-semibold ml-1">
                  (¡Advertencia: solo espacios en blanco!)
                </span>
              )}
            </span>
          </div>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describa el comportamiento técnico observado (luces ONT, pérdida de enlace, lentitud o intermitencia)..."
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none font-sans"
          />
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            El sistema registrará un folio numérico secuencial INT-00x y guardará evento de auditoría.
          </span>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-md transition-colors shadow-xs ml-auto active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Procesar y Generar Folio</span>
          </button>
        </div>
      </form>

      {/* Outcome Banner (Clean enterprise design, no candy pills) */}
      {lastOutcome && (
        <div
          className={`mt-5 p-4 rounded-md border text-sm transition-all ${
            lastOutcome.isValid
              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
              : 'bg-amber-50/80 border-amber-300 text-amber-950'
          }`}
        >
          <div className="flex items-start gap-3">
            {lastOutcome.isValid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
            )}

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 font-mono text-base">
                    Folio: {lastOutcome.folio}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span
                    className={`font-semibold text-xs px-2 py-0.5 rounded ${
                      lastOutcome.isValid
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    Estado: {lastOutcome.attempt.status}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs text-slate-600">
                    Versión motor {lastOutcome.attempt.version}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyFolio(lastOutcome.folio)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado' : 'Copiar folio'}</span>
                </button>
              </div>

              {lastOutcome.isValid ? (
                <p className="text-xs text-emerald-900 mt-1">
                  Reporte verificado y almacenado correctamente para el sector{' '}
                  <span className="font-bold">{lastOutcome.attempt.sector}</span>. Ya está disponible en la bitácora de trazabilidad inferior.
                </p>
              ) : (
                <p className="text-xs text-amber-950 mt-1">
                  <span className="font-bold">Motivo del Rechazo: </span>
                  {lastOutcome.rejectionReason}
                </p>
              )}

              <div className="text-[11px] text-slate-500 mt-1.5 font-mono">
                Marca temporal: {lastOutcome.attempt.timestamp} · Canal: {lastOutcome.attempt.channel}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
