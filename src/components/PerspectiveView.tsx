import React from 'react';
import { BookOpen, Workflow, ArrowRight, CheckCircle2, AlertTriangle, Scale } from 'lucide-react';
import { ACADEMIC_INFO, ACADEMIC_REFERENCES } from '../data/scrumData';

export const PerspectiveView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Marco Teórico y Prospectiva
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              Análisis Crítico, Escenarios de Evolución y Referencias
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {ACADEMIC_INFO.institution} · {ACADEMIC_INFO.program} · {ACADEMIC_INFO.course} · {ACADEMIC_INFO.professor}
            </p>
          </div>
        </div>

        {/* 3 Evolution Scenarios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Scenario 1 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-blue-700">ESCENARIO 1</span>
              <span className="text-[11px] font-semibold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                Sprint 2 (Continuidad)
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Persistencia y Búsqueda</h3>
            <p className="text-slate-600 leading-relaxed">
              Conserva el historial entre turnos mediante persistencia local y permite consultar casos por folio (PB04 y PB05).
            </p>
            <div className="pt-2 border-t border-slate-200 text-slate-500 text-[11px]">
              Reto: Evitar reutilizar folios al reabrir la herramienta.
            </div>
          </div>

          {/* Scenario 2 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-amber-700">ESCENARIO 2</span>
              <span className="text-[11px] font-semibold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                Sprints 3 y 4 (Crecimiento)
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Roles y Cierre de Casos</h3>
            <p className="text-slate-600 leading-relaxed">
              Restringe accesos (RBAC), asigna técnicos responsables y documenta motivos de cierre formal (PB06 a PB08).
            </p>
            <div className="pt-2 border-t border-slate-200 text-slate-500 text-[11px]">
              Riesgo: Mitigar fallas de autenticación (OWASP API Top 10) y cumplir Ley 1581 de 2012.
            </div>
          </div>

          {/* Scenario 3 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-emerald-700">ESCENARIO 3</span>
              <span className="text-[11px] font-semibold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                Producción (Madurez)
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Automatización con n8n</h3>
            <p className="text-slate-600 leading-relaxed">
              Flujo automatizado con colas de cuarentena para reintentos, minería de procesos (van der Aalst) y telemetría OpenTelemetry.
            </p>
            <div className="pt-2 border-t border-slate-200 text-slate-500 text-[11px]">
              Normativa: Régimen de protección de usuarios PQR (CRC Res. 5111 de 2017).
            </div>
          </div>
        </div>
      </div>

      {/* Production Workflow Diagram */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
            <Workflow className="w-4 h-4 text-blue-700" />
            <span>Flujo de Automatización en n8n (Escenario 3 de Madurez):</span>
          </div>
          <span className="text-xs text-slate-500">Pressman & Maxim (2020)</span>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-md overflow-x-auto">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 min-w-[700px] text-xs">
            <div className="flex-1 p-3 bg-white border border-slate-200 rounded space-y-1">
              <div className="text-[10px] font-bold text-blue-700 uppercase">1. Recepción</div>
              <div className="font-bold text-slate-900">Webhook Chat ISP</div>
              <p className="text-slate-500 text-[11px]">Mensaje entrante de WhatsApp o portal de soporte</p>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden lg:block" />

            <div className="flex-1 p-3 bg-white border border-blue-200 rounded space-y-1">
              <div className="text-[10px] font-bold text-blue-700 uppercase">2. Validación</div>
              <div className="font-bold text-blue-900">Módulo de Reglas .trim()</div>
              <p className="text-slate-500 text-[11px]">Revisa sector presente y descripción no vacía</p>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden lg:block" />

            <div className="flex-1 flex flex-col gap-2">
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-[11px]">
                <div className="font-bold text-emerald-900">Válido: INT-00x</div>
                <div className="text-emerald-800">Almacenamiento BD + SMS al cliente</div>
              </div>
              <div className="p-2 bg-amber-50 border border-amber-200 rounded text-[11px]">
                <div className="font-bold text-amber-900">Inválido: Rechazo</div>
                <div className="text-amber-800">Cola de cuarentena + Pide sector al chat</div>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden lg:block" />

            <div className="flex-1 p-3 bg-white border border-slate-200 rounded space-y-1">
              <div className="text-[10px] font-bold text-blue-700 uppercase">4. Trazabilidad</div>
              <div className="font-bold text-slate-900">Minería de Procesos</div>
              <p className="text-slate-500 text-[11px]">van der Aalst (2010): Detección de cuellos de botella</p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Analysis Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5 pb-2 border-b border-slate-100">
          <Scale className="w-4 h-4 text-blue-700" />
          <span>Análisis Crítico de la Simulación (Sección 10 del Informe):</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2">
            <span className="font-bold text-emerald-900 flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Aciertos Metodológicos:</span>
            </span>
            <ul className="space-y-1.5 text-slate-700 leading-relaxed">
              <li>
                <span className="font-semibold text-slate-900">1. Trazabilidad en rechazos: </span>
                Registrar los intentos inválidos permite saber qué intentaron los clientes y por qué fallaron.
              </li>
              <li>
                <span className="font-semibold text-slate-900">2. Criterios observables: </span>
                Permitieron traducir cada requisito en una aserción binaria de prueba sin ambigüedades.
              </li>
              <li>
                <span className="font-semibold text-slate-900">3. Revisión cruzada: </span>
                Astrid y Jesús probaron los casos antes de la Review, evitando el sesgo de desarrollador único.
              </li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2">
            <span className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Límites Identificados y Trabajo Futuro:</span>
            </span>
            <ul className="space-y-1.5 text-slate-700 leading-relaxed">
              <li>
                <span className="font-semibold text-slate-900">1. Datos sintéticos: </span>
                Falta probar cadenas muy largas, caracteres especiales o intentos concurrentes masivos.
              </li>
              <li>
                <span className="font-semibold text-slate-900">2. Limitación de sesión v0.1: </span>
                Al recargar se pierde el historial, riesgo prioritario a resolver en el Sprint 2 con PB04.
              </li>
              <li>
                <span className="font-semibold text-slate-900">3. Velocidad inicial: </span>
                13 puntos en un único Sprint es una referencia descriptiva, no una predicción definitiva (Monte Galiano, 2016).
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bibliographic references in APA format */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5 pb-2 border-b border-slate-100">
          <BookOpen className="w-4 h-4 text-blue-700" />
          <span>Referencias Bibliográficas (Formato APA 7.ª Edición):</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {ACADEMIC_REFERENCES.map((ref, idx) => (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-md space-y-1">
              <div className="font-bold text-blue-900">{ref.citation}</div>
              <div className="text-slate-800 font-medium italic">{ref.title}</div>
              <p className="text-slate-600 text-[11px]">{ref.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
