export type AttemptStatus = 'Registrado' | 'Rechazado';

export interface IncidentAttempt {
  id: string;
  folio: string; // e.g. INT-001, INT-002
  timestamp: string; // Formatted Colombia time: "8 de noviembre de 2026, 18:31:56"
  rawDate: number;
  version: 'v0.1' | 'v0.2';
  sector: string;
  description: string;
  status: AttemptStatus;
  rejectionReason?: string;
  assignedTo?: string; // PB07
  assignedAt?: string;
  resolutionNotes?: string; // PB08
  closedAt?: string;
  channel?: 'WhatsApp Chat' | 'Llamada Soporte' | 'Portal Web' | 'Directo Agente';
}

export type ScrumRole = 'Product Owner' | 'Scrum Master' | 'Desarrollador';

export interface TeamMember {
  name: string;
  role: ScrumRole;
  responsibilities: string[];
  reportSections: string;
  avatarSeed: string;
  bio: string;
}

export interface BacklogItem {
  id: string; // PB01, PB02, etc.
  title: string;
  userStory: string;
  acceptanceCriteria: string;
  points: number;
  priority: 'Alta' | 'Media' | 'Baja';
  sprint: number;
  status: 'Por Hacer' | 'En Progreso' | 'En Pruebas' | 'Terminado';
  assignee: string;
  tasks?: string[];
  testCaseRef?: string;
}

export interface TestCaseResult {
  id: string; // CP01, CP02, CP03, CP04
  backlogRef: string;
  action: string;
  expectedResult: string;
  actualResult: string;
  passed: boolean;
  timestamp?: string;
  details?: string;
}

export interface DailyScrumRecord {
  day: number;
  phase: string;
  mainVoice: string;
  summary: string;
  inspectionAndAdjustment: string;
  dialogue: { speaker: string; text: string }[];
}

export interface RetrospectiveAgreement {
  observation: string;
  agreement: string;
  responsible: string;
  tracking: string;
  verified: boolean;
}
