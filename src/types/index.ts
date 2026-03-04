// ===== User & Auth =====
export type Role = 'ADMIN' | 'USER';

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: Role;
  dept: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// ===== SLA Steps =====
export interface SLAStep {
  id: number;
  code: string;
  name: string;
  owner: string;
  slaHours: number;
  system: string;
  internal: boolean;
}

// ===== Loans =====
export interface Loan {
  id: string;
  customer: string;
  amount: string;
  type: string;
  branch: string;
  officer: string;
  startTime: number;
  currentStepId: number | null;
  assignedDept: string;
}

export interface StepProgress {
  stepId: number;
  completed: boolean;
  actualHours: number | null;
  startedAt: number | null;
}

export interface LoansData {
  loans: Loan[];
  allProgress: StepProgress[][];
}

// ===== Staff Performance =====
export interface StaffPerf {
  name: string;
  role: string;
  loans: number;
  avgHours: number;
  exceeded: number;
  dept: string;
}

// ===== Config =====
export interface LunchBreak {
  start: number;
  end: number;
}

export interface Holiday {
  id: number;
  date: string;
  name: string;
}

export interface BusinessConfig {
  workDays: number[];
  startHour: number;
  endHour: number;
  lunchBreakEnabled: boolean;
  lunchBreak: LunchBreak;
  holidays: Holiday[];
}

/** Config object compatible with calculateBusinessHours() */
export interface BusinessHoursCalcConfig {
  workDays?: number[];
  startHour?: number;
  endHour?: number;
  lunchBreak?: LunchBreak | null;
  holidays?: string[];
}

export interface ConfigContextType {
  config: BusinessConfig;
  setConfig: (
    updater: Partial<BusinessConfig> | ((prev: BusinessConfig) => BusinessConfig)
  ) => void;
  workingHours: {
    morning: { start: string; end: string };
    afternoon: { start: string; end: string };
  };
  setWorkingHours: () => void;
  holidays: Holiday[];
  setHolidays: (updater: Holiday[] | ((prev: Holiday[]) => Holiday[])) => void;
}

// ===== SLA Status =====
export type SLAStatus = 'ok' | 'warning' | 'exceeded' | 'pending';
