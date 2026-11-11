import { IncidentAttempt, TestCaseResult } from '../types';

/**
 * Formats a timestamp in Colombia standard format:
 * e.g. "8 de noviembre de 2026, 18:31:56"
 */
export function formatColombiaTimestamp(date: Date = new Date()): string {
  const day = date.getDate();
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day} de ${month} de ${year}, ${hours}:${minutes}:${seconds}`;
}

/**
 * Generates the next sequential folio.
 * e.g. INT-001, INT-002, etc.
 */
export function generateNextFolio(existingAttempts: IncidentAttempt[]): string {
  if (existingAttempts.length === 0) {
    return 'INT-001';
  }

  // Extract numeric components to guarantee strict sequential integrity
  const numbers = existingAttempts
    .map((att) => {
      const match = att.folio.match(/INT-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter((n) => !isNaN(n));

  const maxNum = numbers.length > 0 ? Math.max(...numbers) : 0;
  const nextNum = maxNum + 1;
  return `INT-${String(nextNum).padStart(3, '0')}`;
}

export interface ValidationOutcome {
  isValid: boolean;
  folio: string;
  rejectionReason?: string;
  attempt: IncidentAttempt;
}

/**
 * Core validation engine created by Daniel Moreno (PB01, PB02, PB03).
 * Trims inputs to detect whitespace-only strings (Day 3 Daily Scrum resolution).
 * Both accepted and rejected attempts generate a correlated folio and trace record.
 */
export function processIncidentAttempt(
  sectorInput: string,
  descInput: string,
  existingAttempts: IncidentAttempt[],
  version: 'v0.1' | 'v0.2' = 'v0.1',
  channel: 'WhatsApp Chat' | 'Llamada Soporte' | 'Portal Web' | 'Directo Agente' = 'Directo Agente'
): ValidationOutcome {
  const folio = generateNextFolio(existingAttempts);
  const now = new Date();
  const timestamp = formatColombiaTimestamp(now);

  const cleanSector = sectorInput ? sectorInput.trim() : '';
  const cleanDesc = descInput ? descInput.trim() : '';

  let isValid = true;
  let rejectionReason: string | undefined = undefined;

  if (!cleanSector && !cleanDesc) {
    isValid = false;
    rejectionReason = 'El sector y la descripción son obligatorios para registrar la falla.';
  } else if (!cleanSector) {
    isValid = false;
    rejectionReason = 'El campo sector es obligatorio para ubicar geográficamente el incidente.';
  } else if (!cleanDesc) {
    isValid = false;
    rejectionReason = 'La descripción es obligatoria y no puede contener únicamente espacios en blanco.';
  }

  const attempt: IncidentAttempt = {
    id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    folio,
    timestamp,
    rawDate: now.getTime(),
    version,
    sector: sectorInput, // preserves original input for inspection
    description: descInput,
    status: isValid ? 'Registrado' : 'Rechazado',
    rejectionReason,
    channel
  };

  return {
    isValid,
    folio,
    rejectionReason,
    attempt
  };
}

/**
 * Runs the exact test cases documented in the paper (Table 7):
 * CP01: PB01 -> Sector A y descripción completa -> INT-001: Registrado
 * CP02: PB02 -> Sector A y descripción con solo espacios -> INT-002: Rechazado
 * CP03: PB02 -> Sector vacío y descripción completa -> INT-003: Rechazado
 * CP04: PB03 -> Revisar los tres eventos en bitácora -> Tres folios distintos, fecha, versión y estado
 */
export function executeOfficialTestPlan(): {
  results: TestCaseResult[];
  mockAttempts: IncidentAttempt[];
  allPassed: boolean;
} {
  const mockAttempts: IncidentAttempt[] = [];
  const results: TestCaseResult[] = [];

  // CP01
  const out1 = processIncidentAttempt('Sector A', 'Caída total de enlace de fibra óptica.', mockAttempts, 'v0.1');
  mockAttempts.push(out1.attempt);
  const cp01Pass = out1.attempt.folio === 'INT-001' && out1.attempt.status === 'Registrado';
  results.push({
    id: 'CP01',
    backlogRef: 'PB01',
    action: 'Sector A y descripción completa.',
    expectedResult: 'Folio y estado Registrado.',
    actualResult: `${out1.attempt.folio}: ${out1.attempt.status}.`,
    passed: cp01Pass,
    details: 'Valida la generación de folio correlativo y registro exitoso de caso nominal.'
  });

  // CP02
  const out2 = processIncidentAttempt('Sector A', '   ', mockAttempts, 'v0.1');
  mockAttempts.push(out2.attempt);
  const cp02Pass =
    out2.attempt.folio === 'INT-002' &&
    out2.attempt.status === 'Rechazado' &&
    out2.attempt.rejectionReason?.includes('espacios en blanco');
  results.push({
    id: 'CP02',
    backlogRef: 'PB02',
    action: 'Sector A y descripción con solo espacios en blanco.',
    expectedResult: 'Rechazo con mensaje para completar los campos.',
    actualResult: `${out2.attempt.folio}: Rechazado, con mensaje: "${out2.attempt.rejectionReason}".`,
    passed: !!cp02Pass,
    details: 'Valida la regla incorporada en el Daily Scrum Día 3 mediante .trim().'
  });

  // CP03
  const out3 = processIncidentAttempt('', 'Falla en nodo principal con intermitencia.', mockAttempts, 'v0.1');
  mockAttempts.push(out3.attempt);
  const cp03Pass =
    out3.attempt.folio === 'INT-003' &&
    out3.attempt.status === 'Rechazado' &&
    out3.attempt.rejectionReason?.includes('sector');
  results.push({
    id: 'CP03',
    backlogRef: 'PB02',
    action: 'Sector vacío y descripción completa.',
    expectedResult: 'Rechazo con mensaje para completar los campos.',
    actualResult: `${out3.attempt.folio}: Rechazado, con mensaje: "${out3.attempt.rejectionReason}".`,
    passed: !!cp03Pass,
    details: 'Valida que la omisión del sector físico impida el ingreso del ticket.'
  });

  // CP04
  const hasDistinctFolios =
    mockAttempts.length === 3 &&
    mockAttempts[0].folio === 'INT-001' &&
    mockAttempts[1].folio === 'INT-002' &&
    mockAttempts[2].folio === 'INT-003';
  const hasValidVersion = mockAttempts.every((a) => a.version === 'v0.1');
  const hasTimestampAndState = mockAttempts.every((a) => a.timestamp.length > 5 && (a.status === 'Registrado' || a.status === 'Rechazado'));

  const cp04Pass = hasDistinctFolios && hasValidVersion && hasTimestampAndState;
  results.push({
    id: 'CP04',
    backlogRef: 'PB03',
    action: 'Revisar los tres eventos correlacionados de la sesión.',
    expectedResult: 'Folios distintos; fecha válida, versión y estado en cada evento.',
    actualResult: 'Tres folios distintos; versión 0.1 y estado en cada evento.',
    passed: cp04Pass,
    details: 'Garantiza la trazabilidad (IEEE SWEBOK 2014) y la Ley 1581 de 2012 de Colombia.'
  });

  const allPassed = results.every((r) => r.passed);
  return { results, mockAttempts, allPassed };
}
