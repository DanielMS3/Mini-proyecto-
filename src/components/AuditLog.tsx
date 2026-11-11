import React, { useState, useMemo } from 'react';
import { Search, Download, Trash2, CheckCircle2, XCircle, UserCheck, CheckSquare, Filter, FileSpreadsheet, Shield } from 'lucide-react';
import { IncidentAttempt } from '../types';
import { TECH_STAFF } from '../data/scrumData';

interface AuditLogProps {
  attempts: IncidentAttempt[];
  onClearSession: () => void;
  version: 'v0.1' | 'v0.2';
  onToggleVersion: (newVer: 'v0.1' | 'v0.2') => void;
  onAssignTech: (folio: string, technician: string) => void;
  onCloseCase: (folio: string, resolutionNote: string) => void;
}

export const AuditLog: React.FC<AuditLogProps> = ({
  attempts,
  onClearSession,
  version,
  onToggleVersion,
  onAssignTech,
  onCloseCase
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Registrado' | 'Rechazado'>('all');
  const [assignModalFolio, setAssignModalFolio] = useState<string | null>(null);
  const [closeModalFolio, setCloseModalFolio] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState(TECH_STAFF[0]);
  const [closeReason, setCloseReason] = useState('');

  const filteredAttempts = useMemo(() => {
    return attempts.filter((att) => {
      const matchSearch =
        att.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        att.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        att.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (att.rejectionReason && att.rejectionReason.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchStatus = statusFilter === 'all' || att.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [attempts, searchTerm, statusFilter]);

  const registeredCount = attempts.filter((a) => a.status === 'Registrado').length;
  const rejectedCount = attempts.filter((a) => a.status === 'Rechazado').length;

  const handleExportCSV = () => {
    if (attempts.length === 0) return;
    const headers = ['Folio', 'Fecha y Hora', 'Version', 'Sector', 'Estado', 'Motivo Rechazo', 'Asignado', 'Notas Cierre'];
    const rows = attempts.map((a) => [
      a.folio,
      `"${a.timestamp}"`,
      a.version,
      `"${a.sector || 'N/A'}"`,
      a.status,
      `"${a.rejectionReason || ''}"`,
      `"${a.assignedTo || 'Sin asignar'}"`,
      `"${a.resolutionNotes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bitacora_soporte_isp_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    if (attempts.length === 0) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(attempts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bitacora_auditoria_isp_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const submitAssign = (folio: string) => {
    onAssignTech(folio, selectedTech);
    setAssignModalFolio(null);
  };

  const submitClose = (folio: string) => {
    if (!closeReason.trim()) return;
    onCloseCase(folio, closeReason.trim());
    setCloseModalFolio(null);
    setCloseReason('');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 md:p-6 shadow-xs space-y-5">
      {/* Top Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Bitácora de Trazabilidad y Casos
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              ({attempts.length} intentos procesados)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Registro unificado conforme a IEEE SWEBOK (2014) y principio de protección de datos (Ley 1581 de 2012)
          </p>
        </div>

        {/* Engine mode switcher & actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode switch */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-md border border-slate-200">
            <button
              onClick={() => onToggleVersion('v0.1')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                version === 'v0.1'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Sprint 1: Almacenamiento en memoria de sesión (se reinicia al recargar)"
            >
              v0.1 (Memoria de Sesión)
            </button>
            <button
              onClick={() => onToggleVersion('v0.2')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                version === 'v0.2'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Sprint 2: Persistencia en navegador (PB04)"
            >
              v0.2 (Persistente)
            </button>
          </div>

          <button
            onClick={onClearSession}
            className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-300 rounded-md transition-colors"
            title="Reiniciar numeración y limpiar la sesión"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Reiniciar</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={handleExportCSV}
              disabled={attempts.length === 0}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-50 disabled:opacity-40 text-slate-700 text-xs font-medium border border-slate-300 rounded-md transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-blue-700" />
              <span>CSV</span>
            </button>
            <button
              onClick={handleExportJSON}
              disabled={attempts.length === 0}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-50 disabled:opacity-40 text-slate-700 text-xs font-medium border border-slate-300 rounded-md transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-blue-700" />
              <span>JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Operational Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
          <div className="text-[11px] font-medium text-slate-500">Total de Intentos</div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">{attempts.length}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Generaron folio INT-00x</div>
        </div>

        <div className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-md">
          <div className="text-[11px] font-medium text-emerald-800">Casos Registrados</div>
          <div className="text-xl font-bold font-mono text-emerald-900 mt-0.5">{registeredCount}</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">
            {attempts.length > 0 ? Math.round((registeredCount / attempts.length) * 100) : 0}% de efectividad
          </div>
        </div>

        <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-md">
          <div className="text-[11px] font-medium text-amber-900">Intentos Rechazados</div>
          <div className="text-xl font-bold font-mono text-amber-950 mt-0.5">{rejectedCount}</div>
          <div className="text-[11px] text-amber-800 mt-0.5">Incompletos o solo espacios</div>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
          <div className="text-[11px] font-medium text-slate-500">Último Folio Asignado</div>
          <div className="text-xl font-bold font-mono text-blue-700 mt-0.5">
            {attempts.length > 0 ? attempts[0].folio : 'Ninguno'}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Secuencial correlativo</div>
        </div>
      </div>

      {/* Search and Filter Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        {/* Search input (PB05) */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por folio (ej: INT-001) o sector..."
            className="w-full bg-white border border-slate-300 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-md border border-slate-200 w-full sm:w-auto justify-end">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              statusFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todos ({attempts.length})
          </button>
          <button
            onClick={() => setStatusFilter('Registrado')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              statusFilter === 'Registrado'
                ? 'bg-emerald-100 text-emerald-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Registrados ({registeredCount})
          </button>
          <button
            onClick={() => setStatusFilter('Rechazado')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              statusFilter === 'Rechazado'
                ? 'bg-amber-100 text-amber-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rechazados ({rejectedCount})
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-slate-200 rounded-md bg-white">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
              <th className="py-2.5 px-3 whitespace-nowrap">Folio</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Fecha y Hora</th>
              <th className="py-2.5 px-2.5 whitespace-nowrap">Versión</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Sector</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Resultado</th>
              <th className="py-2.5 px-3">Detalle / Motivo de Rechazo</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Gestión (PB07/PB08)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredAttempts.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <span className="font-medium text-slate-700">No hay registros para mostrar.</span>
                    <span className="text-[11px] text-slate-500">
                      Use el formulario superior para procesar un reporte de falla.
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredAttempts.map((attempt) => (
                <tr key={attempt.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Folio */}
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {attempt.folio}
                  </td>

                  {/* Timestamp */}
                  <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap font-mono text-[11px]">
                    {attempt.timestamp}
                  </td>

                  {/* Version */}
                  <td className="py-2.5 px-2.5 font-mono text-slate-500 whitespace-nowrap">
                    {attempt.version}
                  </td>

                  {/* Sector */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    {attempt.sector ? (
                      <span className="font-semibold text-slate-900">{attempt.sector}</span>
                    ) : (
                      <span className="text-slate-400 italic font-normal">(Sin sector)</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                        attempt.status === 'Registrado'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}
                    >
                      {attempt.status === 'Registrado' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-amber-700" />
                      )}
                      <span>{attempt.status}</span>
                    </span>
                  </td>

                  {/* Details / Motive */}
                  <td className="py-2.5 px-3 text-slate-700 max-w-sm">
                    {attempt.status === 'Rechazado' ? (
                      <span className="text-amber-900 font-medium">
                        {attempt.rejectionReason}
                      </span>
                    ) : (
                      <div className="space-y-0.5">
                        <p className="line-clamp-2 text-slate-800 text-[11px]">{attempt.description}</p>
                        {attempt.resolutionNotes && (
                          <p className="text-[11px] text-blue-800">
                            <span className="font-semibold">Resolución:</span> {attempt.resolutionNotes}
                          </p>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Management actions */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    {attempt.status === 'Registrado' ? (
                      <div className="flex items-center gap-1.5">
                        {attempt.assignedTo ? (
                          <span className="text-[11px] text-slate-600 font-medium truncate max-w-[90px]" title={attempt.assignedTo}>
                            {attempt.assignedTo.split(' ')[0]}
                          </span>
                        ) : (
                          <button
                            onClick={() => setAssignModalFolio(attempt.folio)}
                            className="px-2 py-0.5 text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-300 transition-colors"
                          >
                            Asignar
                          </button>
                        )}

                        {attempt.resolutionNotes ? (
                          <span className="text-[11px] text-emerald-700 font-medium">Resuelto</span>
                        ) : (
                          <button
                            onClick={() => setCloseModalFolio(attempt.folio)}
                            className="px-2 py-0.5 text-[11px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded border border-emerald-300 transition-colors font-medium"
                          >
                            Cerrar
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Asignar Técnico (PB07) */}
      {assignModalFolio && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-lg max-w-sm w-full p-5 shadow-lg">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-700" />
              <span>Asignar Técnico de Soporte</span>
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Seleccione el responsable para atender el folio <span className="font-mono font-bold text-slate-900">{assignModalFolio}</span>:
            </p>

            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-900 mb-4 focus:outline-none focus:border-blue-600"
            >
              {TECH_STAFF.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setAssignModalFolio(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => submitAssign(assignModalFolio)}
                className="px-4 py-1.5 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-md transition-colors"
              >
                Guardar Asignación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Cerrar Caso con Motivo (PB08) */}
      {closeModalFolio && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-lg max-w-sm w-full p-5 shadow-lg">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-700" />
              <span>Cierre de Caso de Soporte</span>
            </h3>
            <p className="text-xs text-slate-600 mb-2">
              Documente la solución técnica aplicada al folio <span className="font-mono font-bold text-slate-900">{closeModalFolio}</span>:
            </p>

            <textarea
              rows={3}
              value={closeReason}
              onChange={(e) => setCloseReason(e.target.value)}
              placeholder="Ej. Se reempalmó fibra en caja de dispersión sector A. Potencia óptica normalizada a -19dBm..."
              className="w-full bg-white border border-slate-300 rounded-md p-2.5 text-xs text-slate-900 mb-4 focus:outline-none focus:border-blue-600 resize-none"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setCloseModalFolio(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => submitClose(closeModalFolio)}
                disabled={!closeReason.trim()}
                className="px-4 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-md transition-colors"
              >
                Registrar Cierre
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
