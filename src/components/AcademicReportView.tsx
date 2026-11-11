import React, { useState } from 'react';
import { Printer, Download, ExternalLink, Github, BookOpen, Check, Copy, ArrowLeft } from 'lucide-react';
import { ACADEMIC_INFO } from '../data/scrumData';

interface AcademicReportViewProps {
  onBackToMesa: () => void;
}

export const AcademicReportView: React.FC<AcademicReportViewProps> = ({ onBackToMesa }) => {
  const [repoUrl, setRepoUrl] = useState('https://github.com/daniellmoreno/Mini-proyecto-');
  const [isEditingRepo, setIsEditingRepo] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(repoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Control Toolbar (Hidden in Print) */}
      <div className="print:hidden bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToMesa}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a Mesa de Soporte</span>
          </button>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-bold text-slate-900">
            Informe Final del Sprint Simulado (Listo para Entrega y PDF)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* GitHub Repo Input */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1">
            <Github className="w-4 h-4 text-slate-700 shrink-0" />
            {isEditingRepo ? (
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                onBlur={() => setIsEditingRepo(false)}
                autoFocus
                className="bg-white border border-blue-400 rounded px-1.5 py-0.5 text-xs w-64 text-slate-900 focus:outline-none"
              />
            ) : (
              <span
                onClick={() => setIsEditingRepo(true)}
                className="font-mono text-blue-700 cursor-pointer hover:underline truncate max-w-[220px]"
                title="Haga clic para editar la URL de su repositorio"
              >
                {repoUrl}
              </span>
            )}
            <button
              onClick={handleCopyLink}
              className="text-slate-500 hover:text-slate-800 p-0.5"
              title="Copiar link"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar en PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Academic Paper Container (Standard APA 7 Layout, max 8 pages, clean typography) */}
      <article className="academic-report-container bg-white border border-slate-200 print:border-none rounded-lg p-8 sm:p-12 shadow-sm max-w-4xl mx-auto text-slate-900 font-serif leading-relaxed text-[13.5px] print:p-0 print:shadow-none print:text-black">
        
        {/* Document Header */}
        <header className="text-center pb-6 border-b border-slate-300 mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 font-sans mb-2">
            Simulación de un Sprint de Scrum para el Registro de Fallas de Internet
          </h1>
          <p className="text-sm font-sans font-medium text-slate-800">
            Daniel Ricardo Moreno Ortiz · Jesús Telmo Nene · Astrid Villota
          </p>
          <p className="text-xs font-sans text-slate-600 mt-1">
            Corporación Universitaria Tecnológica del Oriente · Facultad de Ingeniería · Ingeniería de Software
          </p>
          <p className="text-xs font-sans text-slate-600">
            Seminario de Actualización N6 Gr B · Docente: Leydi Johana Polo Amador · Noviembre de 2026
          </p>
          
          {/* GitHub Repository Bar in Document Header */}
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded font-sans text-xs text-slate-700 print:border-slate-400">
            <span className="font-semibold text-slate-900">Repositorio del Proyecto:</span>
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 font-mono underline hover:text-blue-900"
            >
              {repoUrl}
            </a>
          </div>
        </header>

        {/* Section 1: Contexto del proyecto */}
        <section className="space-y-3 mb-6">
          <h2 className="text-base font-bold text-slate-950 font-sans uppercase tracking-wide border-b border-slate-200 pb-1">
            1. Contexto del Proyecto Simulado
          </h2>
          <p className="text-justify">
            En un proveedor local de servicios de internet (ISP), los reportes de falla que llegan mediante canales no estructurados como mensajería instantánea (chat) quedan dispersos, sin trazabilidad o desprovistos de la ubicación física o sector donde ocurre la incidencia. Esta carencia operativa dificulta retomar los casos en cambios de turno, cuantificar tiempos de resolución y distinguir con precisión entre un reporte válido y un intento incompleto.
          </p>
          <p className="text-justify">
            A partir de la experiencia operativa documentada por los integrantes del equipo, se estructuró un sistema de registro que automatiza la validación de entrada y genera un folio correlativo inmutable para seguir cada intento. Al tratarse de una simulación académica, los datos son ficticios y en ningún momento se empleó información confidencial de clientes reales.
          </p>
          <p className="text-justify">
            <strong className="font-semibold text-slate-950">Objetivo del producto:</strong> Permitir que la mesa de soporte del ISP registre y consulte reportes de fallas de internet en un flujo unificado y trazable, garantizando la auditoría desde la recepción hasta el cierre del caso.
          </p>
          <p className="text-justify">
            <strong className="font-semibold text-slate-950">Alcance del primer Sprint:</strong> Probar la recepción de reportes, la validación estricta de campos obligatorios y la trazabilidad básica en memoria de sesión. Funcionalidades como el cierre definitivo de casos, el control de acceso por roles (RBAC) y la persistencia en base de datos quedan organizadas en el <em>Product Backlog</em> para iteraciones posteriores.
          </p>
          <p className="text-justify">
            De acuerdo con los lineamientos de la Unidad 2 (Tecnológica del Oriente, s. f., pp. 2–5), el diseño del flujo se fundamenta en criterios de aceptación observables y pruebas sistemáticas de casos válidos e inválidos. La trazabilidad se formaliza al asociar a cada intento un folio único, un resultado de evaluación, una marca temporal y la versión del motor de ejecución (IEEE Computer Society, 2014).
          </p>

          {/* Tabla 1: Acta de constitución */}
          <div className="my-4 font-sans text-xs">
            <div className="font-bold text-slate-900 mb-1">
              Tabla 1. <em>Acta de constitución resumida del proyecto</em>
            </div>
            <table className="w-full border-collapse border border-slate-300">
              <tbody>
                <tr className="border-b border-slate-300 bg-slate-50">
                  <td className="p-2 font-semibold border-r border-slate-300 w-1/3">Nombre del proyecto</td>
                  <td className="p-2">Registro trazable de fallas de internet para la mesa de soporte de un proveedor local (caso académico)</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-semibold border-r border-slate-300">Dueño del Producto (PO)</td>
                  <td className="p-2">Jesús Telmo Nene</td>
                </tr>
                <tr className="border-b border-slate-300 bg-slate-50">
                  <td className="p-2 font-semibold border-r border-slate-300">Scrum Master (SM)</td>
                  <td className="p-2">Astrid Villota</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-semibold border-r border-slate-300">Desarrollador (Dev)</td>
                  <td className="p-2">Daniel Ricardo Moreno Ortiz</td>
                </tr>
                <tr className="border-b border-slate-300 bg-slate-50">
                  <td className="p-2 font-semibold border-r border-slate-300">Duración del Sprint 1</td>
                  <td className="p-2">5 días hábiles (Día 1 a Día 5), con prototipo funcional v0.1 y datos sintéticos</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold border-r border-slate-300">Entregables del Sprint</td>
                  <td className="p-2">Aplicativo web interactivo, bitácora auditable de intentos correlacionados y matriz de pruebas automatizada</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Roles asumidos */}
        <section className="space-y-3 mb-6">
          <h2 className="text-base font-bold text-slate-950 font-sans uppercase tracking-wide border-b border-slate-200 pb-1">
            2. Roles Asumidos y Distribución del Trabajo
          </h2>
          <p className="text-justify">
            Siguiendo la <em>Guía Scrum</em> (Schwaber & Sutherland, 2020), cada integrante asumió un rol específico con responsabilidades delimitadas para maximizar el valor del incremento y asegurar la calidad del proceso. El Product Owner representa las necesidades del soporte técnico y prioriza el backlog; la Scrum Master custodia la disciplina de los eventos ágiles y elimina impedimentos; y el Desarrollador construye la solución técnica.
          </p>
          <p className="text-justify">
            Dado que el equipo de desarrollo cuenta con una sola persona, se implementó una <strong>revisión cruzada</strong>: Astrid y Jesús inspeccionan y ejecutan independientemente los casos de prueba antes del Sprint Review, evitando sesgos cognitivos individuales en la verificación de criterios de aceptación.
          </p>

          {/* Tabla 2: Roles */}
          <div className="my-4 font-sans text-xs">
            <div className="font-bold text-slate-900 mb-1">
              Tabla 2. <em>Distribución de roles y responsabilidades del equipo</em>
            </div>
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-800">
                  <th className="p-2 text-left border-r border-slate-300">Integrante</th>
                  <th className="p-2 text-left border-r border-slate-300">Rol Scrum</th>
                  <th className="p-2 text-left border-r border-slate-300">Responsabilidades Principales</th>
                  <th className="p-2 text-left">Secciones del Informe</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-medium border-r border-slate-300">Jesús Telmo Nene</td>
                  <td className="p-2 border-r border-slate-300">Product Owner</td>
                  <td className="p-2 border-r border-slate-300">Ordena el Product Backlog, especifica la problemática del ISP, define criterios de aceptación observables y acepta los incrementos en la Review.</td>
                  <td className="p-2">1, 3, 8 y visión prospectiva</td>
                </tr>
                <tr className="border-b border-slate-300 bg-slate-50">
                  <td className="p-2 font-medium border-r border-slate-300">Astrid Villota</td>
                  <td className="p-2 border-r border-slate-300">Scrum Master</td>
                  <td className="p-2 border-r border-slate-300">Facilita Planning, Daily Scrums, Review y Retrospectiva; gestiona impedimentos, elabora actas formales y vela por el cumplimiento de los acuerdos.</td>
                  <td className="p-2">4, 6, 9, 12 y normas APA</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium border-r border-slate-300">Daniel Moreno</td>
                  <td className="p-2 border-r border-slate-300">Desarrollador</td>
                  <td className="p-2 border-r border-slate-300">Construye el motor de validación, programa la generación correlacionada de folios, prepara las pruebas unitarias y actualiza las evidencias del Sprint.</td>
                  <td className="p-2">5, 7, 10 y referencias técnicas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Product Backlog */}
        <section className="space-y-3 mb-6">
          <h2 className="text-base font-bold text-slate-950 font-sans uppercase tracking-wide border-b border-slate-200 pb-1">
            3. Product Backlog y Estimación
          </h2>
          <p className="text-justify">
            El <em>Product Backlog</em> se ordenó priorizando el registro de reportes completos y la capacidad de reconstruir cualquier intento. Las historias de usuario siguen el formato estándar («Como…, quiero…, para…») y su esfuerzo relativo fue estimado mediante puntos de historia basados en la serie de Fibonacci (Heras del Dedo & Álvarez García, 2017).
          </p>

          {/* Tabla 3: Product Backlog */}
          <div className="my-4 font-sans text-xs">
            <div className="font-bold text-slate-900 mb-1">
              Tabla 3. <em>Product Backlog priorizado con historias de usuario y hoja de ruta</em>
            </div>
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-800">
                  <th className="p-2 text-left border-r border-slate-300 w-12">ID</th>
                  <th className="p-2 text-left border-r border-slate-300">Historia de Usuario</th>
                  <th className="p-2 text-left border-r border-slate-300">Criterio de Aceptación Observable</th>
                  <th className="p-2 text-center border-r border-slate-300 w-10">Pts</th>
                  <th className="p-2 text-center border-r border-slate-300 w-14">Prioridad</th>
                  <th className="p-2 text-center w-14">Sprint</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-300 bg-blue-50/40">
                  <td className="p-2 font-mono font-bold border-r border-slate-300">PB01</td>
                  <td className="p-2 border-r border-slate-300">Como agente de soporte, quiero registrar un reporte con sector y descripción, para obtener un folio con el cual seguir el caso.</td>
                  <td className="p-2 border-r border-slate-300">Un sector y una descripción válidos generan un folio correlativo y el estado Registrado.</td>
                  <td className="p-2 text-center font-bold border-r border-slate-300">5</td>
                  <td className="p-2 text-center border-r border-slate-300 font-semibold text-blue-900">Alta</td>
                  <td className="p-2 text-center font-bold">1</td>
                </tr>
                <tr className="border-b border-slate-300 bg-blue-50/40">
                  <td className="p-2 font-mono font-bold border-r border-slate-300">PB02</td>
                  <td className="p-2 border-r border-slate-300">Como agente de soporte, quiero que se rechacen los reportes incompletos y se indique qué falta, para no perder tiempo con intentos inválidos.</td>
                  <td className="p-2 border-r border-slate-300">Si falta un campo o solo hay espacios, el intento se rechaza y se especifica la información requerida.</td>
                  <td className="p-2 text-center font-bold border-r border-slate-300">3</td>
                  <td className="p-2 text-center border-r border-slate-300 font-semibold text-blue-900">Alta</td>
                  <td className="p-2 text-center font-bold">1</td>
                </tr>
                <tr className="border-b border-slate-300 bg-blue-50/40">
                  <td className="p-2 font-mono font-bold border-r border-slate-300">PB03</td>
                  <td className="p-2 border-r border-slate-300">Como supervisor, quiero consultar cada intento con su folio, fecha, versión y resultado, para reconstruir lo ocurrido.</td>
                  <td className="p-2 border-r border-slate-300">Cada intento muestra folio, fecha, versión y resultado; un rechazo incluye el motivo observable.</td>
                  <td className="p-2 text-center font-bold border-r border-slate-300">5</td>
                  <td className="p-2 text-center border-r border-slate-300 font-semibold text-blue-900">Alta</td>
                  <td className="p-2 text-center font-bold">1</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-mono font-bold border-r border-slate-300">PB04</td>
                  <td className="p-2 border-r border-slate-300">Como agente, quiero que el historial siga disponible al cerrar la herramienta, para retomar un caso otro día.</td>
                  <td className="p-2 border-r border-slate-300">Tras cerrar y abrir la herramienta, el historial y sus folios se conservan sin reutilizar identificadores guardados.</td>
                  <td className="p-2 text-center font-bold border-r border-slate-300">8</td>
                  <td className="p-2 text-center border-r border-slate-300">Alta</td>
                  <td className="p-2 text-center">2</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-mono font-bold border-r border-slate-300">PB05</td>
                  <td className="p-2 border-r border-slate-300">Como agente, quiero buscar un caso por su folio, para atender al cliente que lo menciona.</td>
                  <td className="p-2 border-r border-slate-300">Al consultar un folio existente se muestra su registro; si no existe, se informa con precisión.</td>
                  <td className="p-2 text-center font-bold border-r border-slate-300">3</td>
                  <td className="p-2 text-center border-r border-slate-300">Media</td>
                  <td className="p-2 text-center">2</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-mono font-bold border-r border-slate-300">PB06</td>
                  <td className="p-2 border-r border-slate-300">Como supervisor, quiero restringir el acceso al historial, para proteger los datos de los clientes.</td>
                  <td className="p-2 border-r border-slate-300">Solo usuarios con credencial autorizada de soporte pueden consultar la bitácora según Ley 1581.</td>
                  <td className="p-2 text-center font-bold border-r border-slate-300">5</td>
                  <td className="p-2 text-center border-r border-slate-300">Media</td>
                  <td className="p-2 text-center">3</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-mono font-bold border-r border-slate-300">PB07</td>
                  <td className="p-2 border-r border-slate-300">Como supervisor, quiero asignar un caso a una persona, para saber quién lo atiende.</td>
                  <td className="p-2 border-r border-slate-300">Al asignar un responsable técnico, se registra la persona asignada y la marca de tiempo exacta.</td>
                  <td className="p-2 text-center font-bold border-r border-slate-300">5</td>
                  <td className="p-2 text-center border-r border-slate-300">Media</td>
                  <td className="p-2 text-center">3</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono font-bold border-r border-slate-300">PB08</td>
                  <td className="p-2 border-r border-slate-300">Como agente, quiero cerrar un caso indicando el motivo, para saber qué fallas ya se resolvieron.</td>
                  <td className="p-2 border-r border-slate-300">El cierre exige ingresar un motivo técnico y registra la transición de estado en el historial.</td>
                  <td className="p-2 text-center font-bold border-r border-slate-300">5</td>
                  <td className="p-2 text-center border-r border-slate-300">Media</td>
                  <td className="p-2 text-center">4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 & 5: Sprint Planning, Backlog y Cronograma */}
        <section className="space-y-3 mb-6">
          <h2 className="text-base font-bold text-slate-950 font-sans uppercase tracking-wide border-b border-slate-200 pb-1">
            4. Planificación del Sprint y Cronograma de Ejecución
          </h2>
          <p className="text-justify">
            <strong>Acta del Sprint Planning (Día 1 · 35 min):</strong> El Product Owner planteó erradicar la recepción de reportes incompletos que saturan la mesa de ayuda. El equipo seleccionó PB01 a PB03 (13 puntos de historia), estableciendo la siguiente meta formal:
          </p>
          <div className="p-3 bg-slate-50 border-l-2 border-blue-700 font-sans text-xs text-slate-800">
            <strong>Objetivo del Sprint:</strong> «Permitir que la mesa de soporte del ISP registre reportes de falla completos y verifique, mediante un folio correlativo, si cada intento quedó registrado o fue rechazado con trazabilidad auditable.»
          </div>
          <p className="text-justify">
            <strong>Definición de Terminado (DoD):</strong> El incremento se ejecuta en navegador web, procesa datos sintéticos, muestra el estado inmediato de cada intento, genera un evento correlacionado en la bitácora y supera el 100% de los cuatro casos de prueba (CP01–CP04). Para acatar la <em>Ley 1581 de 2012</em> (protección de datos personales), la bitácora guarda metadatos del intento técnico omitiendo datos personales sensibles.
          </p>

          {/* Tabla 4: Sprint Backlog */}
          <div className="my-4 font-sans text-xs">
            <div className="font-bold text-slate-900 mb-1">
              Tabla 4. <em>Sprint Backlog detallado por tareas y evidencias de verificación</em>
            </div>
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-800">
                  <th className="p-2 text-left border-r border-slate-300 w-16">Ítem</th>
                  <th className="p-2 text-left border-r border-slate-300">Tarea de Desarrollo</th>
                  <th className="p-2 text-center border-r border-slate-300 w-10">Pts</th>
                  <th className="p-2 text-left border-r border-slate-300">Responsable</th>
                  <th className="p-2 text-left border-r border-slate-300">Evidencia de Prueba</th>
                  <th className="p-2 text-center w-20">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-mono font-bold border-r border-slate-300">PB01</td>
                  <td className="p-2 border-r border-slate-300">T1. Diseñar el formulario de captura, asignar folio INT-00x por intento y desplegar el resultado.</td>
                  <td className="p-2 text-center border-r border-slate-300 font-bold">5</td>
                  <td className="p-2 border-r border-slate-300">Daniel Moreno</td>
                  <td className="p-2 border-r border-slate-300 font-mono">CP01: Reporte completo</td>
                  <td className="p-2 text-center font-bold text-emerald-800 bg-emerald-50">Terminado</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-mono font-bold border-r border-slate-300">PB02</td>
                  <td className="p-2 border-r border-slate-300">T2. Validar sector y descripción, detectando entradas vacías o compuestas exclusivamente por espacios.</td>
                  <td className="p-2 text-center border-r border-slate-300 font-bold">3</td>
                  <td className="p-2 border-r border-slate-300">Daniel Moreno</td>
                  <td className="p-2 border-r border-slate-300 font-mono">CP02 y CP03: Rechazos</td>
                  <td className="p-2 text-center font-bold text-emerald-800 bg-emerald-50">Terminado</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-mono font-bold border-r border-slate-300">PB03</td>
                  <td className="p-2 border-r border-slate-300">T3. Construir la bitácora correlacionada por folio con marca de tiempo colombiana y versión.</td>
                  <td className="p-2 text-center border-r border-slate-300 font-bold">5</td>
                  <td className="p-2 border-r border-slate-300">Daniel Moreno</td>
                  <td className="p-2 border-r border-slate-300 font-mono">CP04: Consistencia de log</td>
                  <td className="p-2 text-center font-bold text-emerald-800 bg-emerald-50">Terminado</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono font-bold border-r border-slate-300">PB01–03</td>
                  <td className="p-2 border-r border-slate-300">T4. Integración del prototipo e inspección cruzada independiente de casos de prueba antes de la Review.</td>
                  <td className="p-2 text-center border-r border-slate-300">—</td>
                  <td className="p-2 border-r border-slate-300">Astrid y Jesús</td>
                  <td className="p-2 border-r border-slate-300 font-mono">Matriz de Resultados</td>
                  <td className="p-2 text-center font-bold text-emerald-800 bg-emerald-50">Terminado</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tabla 5: Cronograma */}
          <div className="my-4 font-sans text-xs">
            <div className="font-bold text-slate-900 mb-1">
              Tabla 5. <em>Cronograma del Sprint distribuido por fases y eventos</em>
            </div>
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-800">
                  <th className="p-2 text-center border-r border-slate-300 w-12">Día</th>
                  <th className="p-2 text-left border-r border-slate-300 w-36">Fase del Sprint</th>
                  <th className="p-2 text-left border-r border-slate-300">Actividades Técnicas Ejecutadas</th>
                  <th className="p-2 text-left">Eventos Scrum Realizados</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-2 text-center font-bold border-r border-slate-300">1</td>
                  <td className="p-2 border-r border-slate-300 font-medium">Análisis y Diseño</td>
                  <td className="p-2 border-r border-slate-300">Concretar objetivo, precisar criterios observables y diseñar el modelo de folio.</td>
                  <td className="p-2">Sprint Planning y Daily Scrum Día 1</td>
                </tr>
                <tr className="border-b border-slate-300 bg-slate-50">
                  <td className="p-2 text-center font-bold border-r border-slate-300">2</td>
                  <td className="p-2 border-r border-slate-300 font-medium">Desarrollo Base</td>
                  <td className="p-2 border-r border-slate-300">Estructurar formulario, lógica de estados y función de correlación INT-00x.</td>
                  <td className="p-2">Daily Scrum Día 2</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 text-center font-bold border-r border-slate-300">3</td>
                  <td className="p-2 border-r border-slate-300 font-medium">Desarrollo y Reglas</td>
                  <td className="p-2 border-r border-slate-300">Incorporar detección de espacios mediante .trim() y eventos para rechazos.</td>
                  <td className="p-2">Daily Scrum Día 3</td>
                </tr>
                <tr className="border-b border-slate-300 bg-slate-50">
                  <td className="p-2 text-center font-bold border-r border-slate-300">4</td>
                  <td className="p-2 border-r border-slate-300 font-medium">Validación Cruzada</td>
                  <td className="p-2 border-r border-slate-300">Revisión independiente por PO y SM de casos válidos, vacíos y con espacios.</td>
                  <td className="p-2">Daily Scrum Día 4</td>
                </tr>
                <tr>
                  <td className="p-2 text-center font-bold border-r border-slate-300">5</td>
                  <td className="p-2 border-r border-slate-300 font-medium">Cierre e Inspección</td>
                  <td className="p-2 border-r border-slate-300">Demostración en vivo ante soporte simulado y análisis de mejora continua.</td>
                  <td className="p-2">Daily Scrum, Sprint Review y Sprint Retrospective</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Evidencias de los Daily Scrums */}
        <section className="space-y-3 mb-6">
          <h2 className="text-base font-bold text-slate-950 font-sans uppercase tracking-wide border-b border-slate-200 pb-1">
            5. Evidencias de las Sesiones de Daily Scrum
          </h2>
          <p className="text-justify">
            Cada jornada inició con una reunión de inspección de máximo 15 minutos en la que el Desarrollador revisó el avance técnico frente al Sprint Goal y la Scrum Master despejó impedimentos (Kuz et al., 2018). Estas sesiones permitieron realizar ajustes clave sobre la marcha sin alterar el alcance convenido.
          </p>

          {/* Tabla 6: Daily Scrums */}
          <div className="my-4 font-sans text-xs">
            <div className="font-bold text-slate-900 mb-1">
              Tabla 6. <em>Registro sintético de los Daily Scrums simulados</em>
            </div>
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-800">
                  <th className="p-2 text-center border-r border-slate-300 w-10">Día</th>
                  <th className="p-2 text-left border-r border-slate-300 w-36">Voz Principal</th>
                  <th className="p-2 text-left">Inspección Realizada y Ajuste del Plan Técnico</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-2 text-center font-bold border-r border-slate-300">1</td>
                  <td className="p-2 border-r border-slate-300 font-medium">Jesús Telmo (PO)</td>
                  <td className="p-2">Se detectó la indefinición de qué sucede con los intentos inválidos. Decisión clave: los rechazos SÍ deben generar folio y rastro en la bitácora técnica para auditar qué intentan los usuarios y por qué fallan.</td>
                </tr>
                <tr className="border-b border-slate-300 bg-slate-50">
                  <td className="p-2 text-center font-bold border-r border-slate-300">2</td>
                  <td className="p-2 border-r border-slate-300 font-medium">Daniel Moreno (Dev)</td>
                  <td className="p-2">El flujo nominal produce el resultado esperado. Se mantiene la prioridad de conectar el módulo de rechazo con la numeración correlativa INT-00x.</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 text-center font-bold border-r border-slate-300">3</td>
                  <td className="p-2 border-r border-slate-300 font-medium">Daniel Moreno (Dev)</td>
                  <td className="p-2">Hallazgo crítico: un agente podía teclear solo espacios en blanco y burlar la validación básica. Se ajustó T2 incorporando la función de recorte <code>.trim()</code> y se actualizó el caso CP02.</td>
                </tr>
                <tr className="border-b border-slate-300 bg-slate-50">
                  <td className="p-2 text-center font-bold border-r border-slate-300">4</td>
                  <td className="p-2 border-r border-slate-300 font-medium">Astrid Villota (SM)</td>
                  <td className="p-2">Ejecución del plan de validación cruzada. Se ensayaron los casos CP01 a CP04 en entorno local y se redactó el guion de demostración técnica para la Review.</td>
                </tr>
                <tr>
                  <td className="p-2 text-center font-bold border-r border-slate-300">5</td>
                  <td className="p-2 border-r border-slate-300 font-medium">Astrid Villota (SM)</td>
                  <td className="p-2">Comprobación final del incremento. Se constató la limitación deliberada de persistencia volátil en v0.1, argumentando su paso como historia principal (PB04) para el Sprint 2.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 7: Incremento y Pruebas */}
        <section className="space-y-3 mb-6">
          <h2 className="text-base font-bold text-slate-950 font-sans uppercase tracking-wide border-b border-slate-200 pb-1">
            6. Incremento Técnico Entregado y Plan de Pruebas
          </h2>
          <p className="text-justify">
            El incremento resultante es un aplicativo web totalmente funcional estructurado en React, TypeScript y Tailwind CSS. El motor procesa solicitudes de falla asignando folios estrictamente secuenciales (<code>INT-001</code>, <code>INT-002</code>...), validando la obligatoriedad del sector geográfico y el contenido descriptivo no vacío, y manteniendo una bitácora técnica de auditoría que opera conforme a la <em>Ley 1581 de 2012</em>.
          </p>

          {/* Tabla 7: Plan de pruebas */}
          <div className="my-4 font-sans text-xs">
            <div className="font-bold text-slate-900 mb-1">
              Tabla 7. <em>Matriz de pruebas del incremento y comprobación de aserciones</em>
            </div>
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-800">
                  <th className="p-2 text-left border-r border-slate-300 w-16">Caso</th>
                  <th className="p-2 text-left border-r border-slate-300 w-24">Ítem / Regla</th>
                  <th className="p-2 text-left border-r border-slate-300">Acción de Entrada</th>
                  <th className="p-2 text-left border-r border-slate-300">Resultado Esperado</th>
                  <th className="p-2 text-left border-r border-slate-300">Resultado Actual Obtenido</th>
                  <th className="p-2 text-center w-16">¿Aprobado?</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-mono font-bold border-r border-slate-300">CP01</td>
                  <td className="p-2 font-mono border-r border-slate-300">PB01</td>
                  <td className="p-2 border-r border-slate-300">Sector A y descripción completa.</td>
                  <td className="p-2 border-r border-slate-300">Folio correlativo y estado Registrado.</td>
                  <td className="p-2 font-mono text-[11px] border-r border-slate-300">INT-001: Registrado.</td>
                  <td className="p-2 text-center font-bold text-emerald-800 bg-emerald-50">Sí</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-mono font-bold border-r border-slate-300">CP02</td>
                  <td className="p-2 font-mono border-r border-slate-300">PB02 (.trim)</td>
                  <td className="p-2 border-r border-slate-300">Sector A y descripción con solo espacios ("   ").</td>
                  <td className="p-2 border-r border-slate-300">Rechazo con motivo explícito de campos requeridos.</td>
                  <td className="p-2 font-mono text-[11px] border-r border-slate-300">INT-002: Rechazado, con motivo explícito.</td>
                  <td className="p-2 text-center font-bold text-emerald-800 bg-emerald-50">Sí</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-mono font-bold border-r border-slate-300">CP02</td>
                  <td className="p-2 font-mono border-r border-slate-300">PB02</td>
                  <td className="p-2 border-r border-slate-300">Sector vacío ("") y descripción completa.</td>
                  <td className="p-2 border-r border-slate-300">Rechazo con mensaje para ingresar sector.</td>
                  <td className="p-2 font-mono text-[11px] border-r border-slate-300">INT-003: Rechazado, exige ubicación física.</td>
                  <td className="p-2 text-center font-bold text-emerald-800 bg-emerald-50">Sí</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono font-bold border-r border-slate-300">CP04</td>
                  <td className="p-2 font-mono border-r border-slate-300">PB03</td>
                  <td className="p-2 border-r border-slate-300">Consultar los tres eventos en la bitácora técnica.</td>
                  <td className="p-2 border-r border-slate-300">Folios distintos, timestamp válido, versión y estado.</td>
                  <td className="p-2 font-mono text-[11px] border-r border-slate-300">3 folios únicos correlacionados, v0.1 y fecha válida.</td>
                  <td className="p-2 text-center font-bold text-emerald-800 bg-emerald-50">Sí</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-xs text-slate-800 space-y-0.5">
            <div className="text-[11px] font-bold text-slate-600 uppercase font-sans mb-1">
              Extracto de bitácora técnica auditable (Hora legal de Colombia):
            </div>
            <div>INT-001 · 8 de noviembre de 2026, 18:31:56 · v0.1 · Registrado.</div>
            <div>INT-002 · 8 de noviembre de 2026, 18:31:56 · v0.1 · Rechazado (Descripción compuesta únicamente por espacios).</div>
            <div>INT-003 · 8 de noviembre de 2026, 18:31:57 · v0.1 · Rechazado (Sector geográfico obligatorio para geolocalización).</div>
          </div>
        </section>

        {/* Section 8 & 9: Sprint Review y Retrospectiva */}
        <section className="space-y-3 mb-6">
          <h2 className="text-base font-bold text-slate-950 font-sans uppercase tracking-wide border-b border-slate-200 pb-1">
            7. Sprint Review y Resultados de la Retrospectiva
          </h2>
          <p className="text-justify">
            <strong>Sprint Review (Día 5 · 25 min):</strong> Se demostró el incremento ante un usuario que simuló ser agente de soporte. Tras ingresar un reporte nominal y luego forzar el rechazo por espacios, el agente constató la asignación de folios y planteó la necesidad de consultar casos al día siguiente. El Product Owner validó formalmente los <strong>13 puntos</strong> como velocidad de referencia y posicionó PB04 (persistencia) como máxima prioridad del Sprint 2, exigiendo que recargar no repita folios guardados.
          </p>
          <p className="text-justify">
            <strong>Sprint Retrospective (Día 5 · 20 min):</strong> El equipo analizó su dinámica de trabajo colaborativo. Se identificaron tres áreas de mejora que se convirtieron en acuerdos accionables con responsables asignados:
          </p>

          {/* Tabla 8: Acuerdos Retrospectiva */}
          <div className="my-4 font-sans text-xs">
            <div className="font-bold text-slate-900 mb-1">
              Tabla 8. <em>Acuerdos formales de mejora adoptados en la Retrospectiva</em>
            </div>
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-800">
                  <th className="p-2 text-left border-r border-slate-300 w-1/3">Observación del Escenario</th>
                  <th className="p-2 text-left border-r border-slate-300 w-1/3">Acuerdo de Mejora Convenido</th>
                  <th className="p-2 text-left">Seguimiento y Responsable Asignado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-2 border-r border-slate-300 font-medium">El folio común facilitó contrastar la salida en pantalla con la bitácora técnica.</td>
                  <td className="p-2 border-r border-slate-300">Mantener una trazabilidad estricta entre ítem de backlog, caso de prueba y evidencia.</td>
                  <td className="p-2">Daniel Moreno verifica esta correspondencia al actualizar el tablero Kanban.</td>
                </tr>
                <tr className="border-b border-slate-300 bg-slate-50">
                  <td className="p-2 border-r border-slate-300 font-medium">El caso de los espacios en blanco surgió a mitad de Sprint y no en la Planning.</td>
                  <td className="p-2 border-r border-slate-300">Redactar un ejemplo válido y uno inválido por cada historia crítica antes de codificarla.</td>
                  <td className="p-2">Jesús Telmo y Daniel Moreno revisan los ejemplos en la Planning del Sprint 2.</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-slate-300 font-medium">La pérdida de datos al recargar la página se comprende mejor probando el flujo en vivo.</td>
                  <td className="p-2 border-r border-slate-300">Demostrar tempranamente las limitaciones técnicas que impactan la operación de soporte.</td>
                  <td className="p-2">Astrid Villota facilita una sesión intermedia de inspección en el Día 3 del Sprint 2.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 10: Análisis crítico */}
        <section className="space-y-3 mb-6">
          <h2 className="text-base font-bold text-slate-950 font-sans uppercase tracking-wide border-b border-slate-200 pb-1">
            8. Análisis Crítico y Evaluación de Evidencias
          </h2>
          <p className="text-justify">
            La decisión arquitectónica de mayor valor fue registrar los intentos fallidos con folio y marca temporal. Un sistema que solo registra eventos exitosos responde a la pregunta descriptiva «qué ocurrió», pero ignora «qué intentaron los usuarios y por qué fallaron», aspecto indispensable para el rediseño de procesos asistido por minería de procesos (van der Aalst, 2010). Asimismo, formular criterios de aceptación observables evitó ambigüedades interpretativas al programar aserciones lógicas.
          </p>
          <p className="text-justify">
            No obstante, el equipo reconoce con honestidad académica los límites del ejercicio:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-justify">
            <li><strong>Muestra sintética reducida:</strong> Las pruebas se efectuaron con tres entradas nominales; no se evaluaron inyecciones de código malicioso (XSS/SQLi), cadenas de longitud extrema ni caracteres especiales incompatibles.</li>
            <li><strong>Entorno local de sesión:</strong> La volatilidad de la memoria en v0.1 obligará a diseñar esquemas de bloqueo y no-colisión de folios cuando se conecte una base de datos multiusuario persistente.</li>
            <li><strong>Velocidad preliminar:</strong> Una velocidad de 13 puntos en una única iteración sirve como dato inicial descriptivo, pero no constituye un indicador estadístico predictivo para planificaciones a largo plazo (Monte Galiano, 2016).</li>
          </ul>
        </section>

        {/* Section 11: Visión prospectiva */}
        <section className="space-y-3 mb-6">
          <h2 className="text-base font-bold text-slate-950 font-sans uppercase tracking-wide border-b border-slate-200 pb-1">
            9. Visión Prospectiva e Innovación
          </h2>
          <p className="text-justify">
            La proyección del producto se concibe en tres horizontes evolutivos coherentes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xs my-3">
            <div className="p-3 bg-slate-50 border border-slate-300 rounded">
              <div className="font-bold text-slate-900 mb-1">Horizonte 1: Continuidad (Sprint 2)</div>
              <p className="text-slate-700">Persistencia local sin colisión de folios y búsqueda indexada por identificador (PB04 y PB05) para soporte entre turnos.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded">
              <div className="font-bold text-slate-900 mb-1">Horizonte 2: Crecimiento (Sprints 3 y 4)</div>
              <p className="text-slate-700">Control de roles (RBAC), asignación formal de técnicos y cierre con motivo, mitigando riesgos de seguridad según OWASP API Top 10 (2023).</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded">
              <div className="font-bold text-slate-900 mb-1">Horizonte 3: Madurez (Producción)</div>
              <p className="text-slate-700">Orquestación mediante n8n con colas de cuarentena para fallas transitorias (Pressman & Maxim, 2020) y telemetría estándar OpenTelemetry (2025).</p>
            </div>
          </div>
          <p className="text-justify">
            En un escenario de despliegue real en Colombia, los folios de soporte técnico deben articularse con el Régimen de Protección de los Derechos de los Usuarios de Servicios de Comunicaciones (Comisión de Regulación de Comunicaciones [CRC], Resolución 5111 de 2017), garantizando el número de radicado único exigido para Peticiones, Quejas y Reclamos (PQR).
          </p>
        </section>

        {/* Section 12: Reflexión grupal */}
        <section className="space-y-3 mb-6">
          <h2 className="text-base font-bold text-slate-950 font-sans uppercase tracking-wide border-b border-slate-200 pb-1">
            10. Reflexión Grupal sobre el Uso de Metodologías Ágiles
          </h2>
          <p className="text-justify">
            La simulación evidenció que las ceremonias de Scrum no son meros actos protocolarios, sino herramientas activas de conversación e ingeniería. La Review permitió que el cliente simulado descubriera la necesidad de persistencia entre jornadas; el Daily Scrum facilitó incorporar la regla de espacios en blanco en pleno desarrollo sin alterar el compromiso del Sprint; y la Retrospectiva convirtió esos aprendizajes en reglas de trabajo preventivas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xs my-3">
            <div className="p-3 bg-slate-50 border border-slate-300 rounded">
              <div className="font-bold text-slate-900 mb-1">Jesús Telmo (PO):</div>
              <p className="text-slate-700">«Comprendí que priorizar es renunciar. Excluir el cierre de casos del primer Sprint fue difícil, pero garantizó entregar un producto robusto y verificable.»</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded">
              <div className="font-bold text-slate-900 mb-1">Astrid Villota (SM):</div>
              <p className="text-slate-700">«Facilitar no es ordenar, sino hacer las preguntas correctas y proteger el tiempo del equipo. Las reuniones breves y enfocadas ahorran semanas de reproceso.»</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded">
              <div className="font-bold text-slate-900 mb-1">Daniel Moreno (Dev):</div>
              <p className="text-slate-700">«Un criterio de aceptación bien delimitado ahorra más tiempo que cualquier atajo de programación. Los folios correlacionados dieron total certeza a las pruebas.»</p>
            </div>
          </div>
          <p className="text-justify">
            En conclusión, Scrum demostró ser un marco de trabajo que sustituye la presunción subjetiva por evidencia empírica verificable en cada iteración (Kuz et al., 2018).
          </p>
        </section>

        {/* References: APA 7ma Edición */}
        <section className="space-y-3 pt-4 border-t border-slate-300">
          <h2 className="text-base font-bold text-slate-950 font-sans uppercase tracking-wide">
            Referencias Bibliográficas
          </h2>
          <div className="space-y-2 text-xs font-sans text-justify pl-6 -indent-6 leading-relaxed text-slate-800">
            <p>
              Comisión de Regulación de Comunicaciones. (2017). <em>Resolución 5111 de 2017, por la cual se establece el Régimen de Protección de los Derechos de los Usuarios de Servicios de Comunicaciones</em> (Diario Oficial n.º 50.157). https://normograma.mintic.gov.co/mintic/compilacion/docs/resolucion_crc_5111_2017.htm
            </p>
            <p>
              Congreso de la República de Colombia. (2012). <em>Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales</em> (Diario Oficial n.º 48.587).
            </p>
            <p>
              Heras del Dedo, R. D. L., & Álvarez García, A. (2017). <em>Métodos ágiles: Scrum, Kanban, Lean</em>. Difusora Larousse - Anaya Multimedia.
            </p>
            <p>
              IEEE Computer Society. (2014). <em>Guide to the Software Engineering Body of Knowledge (SWEBOK Guide V3.0)</em>. IEEE.
            </p>
            <p>
              Kuz, A., Falco, M., & Giandini, R. S. (2018). Comprendiendo la aplicabilidad de Scrum en el aula: Herramientas y ejemplos. <em>Revista Iberoamericana de Tecnología en Educación y Educación en Tecnología</em>, (21), 62–70. https://doi.org/10.24215/18509959.21.e07
            </p>
            <p>
              Monte Galiano, J. (2016). <em>Implantar Scrum con éxito</em>. Editorial UOC.
            </p>
            <p>
              OpenTelemetry. (2025). <em>OpenTelemetry specification: Observability framework for cloud-native software</em>. https://opentelemetry.io/docs/specs/otel/
            </p>
            <p>
              OWASP. (2023). <em>OWASP API Security Top 10 — 2023</em>. Open Web Application Security Project. https://owasp.org/API-Security/editions/2023/en/0x11-t10/
            </p>
            <p>
              Pressman, R. S., & Maxim, B. R. (2020). <em>Software engineering: A practitioner's approach</em> (9.ª ed.). McGraw Hill.
            </p>
            <p>
              Schwaber, K., & Sutherland, J. (2020). <em>The Scrum guide: The definitive guide to Scrum: The rules of the game</em>. Scrum Guides. https://scrumguides.org/scrum-guide.html
            </p>
            <p>
              Tecnológica del Oriente. (s. f.). <em>Guía de estudio: Unidad 2. Seminario de Actualización</em> [Guía de estudio]. Corporación Universitaria Tecnológica del Oriente.
            </p>
            <p>
              van der Aalst, W. M. P. (2010). <em>Process mining: Discovery, conformance and enhancement of business processes</em>. Springer. https://doi.org/10.1007/978-3-642-19345-3
            </p>
          </div>
        </section>
      </article>
    </div>
  );
};
