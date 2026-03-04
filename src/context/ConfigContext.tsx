import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { BusinessConfig, Holiday, ConfigContextType, BusinessHoursCalcConfig } from '../types';

const STORAGE_KEY = 'businessConfig';

const DEFAULT_HOLIDAYS: Holiday[] = [
  { id: 1, date: '2026-01-01', name: 'Tết Dương Lịch' },
  { id: 2, date: '2026-01-28', name: 'Tết Âm Lịch (28 Tết)' },
  { id: 3, date: '2026-01-29', name: 'Tết Âm Lịch (29 Tết)' },
  { id: 4, date: '2026-01-30', name: 'Tết Âm Lịch (30 Tết)' },
  { id: 5, date: '2026-01-31', name: 'Tết Âm Lịch (Mùng 1)' },
  { id: 6, date: '2026-02-01', name: 'Tết Âm Lịch (Mùng 2)' },
  { id: 7, date: '2026-02-02', name: 'Tết Âm Lịch (Mùng 3)' },
  { id: 8, date: '2026-04-30', name: 'Giải Phóng Miền Nam' },
  { id: 9, date: '2026-05-01', name: 'Quốc Tế Lao Động' },
  { id: 10, date: '2026-09-02', name: 'Quốc Khánh' },
  { id: 11, date: '2026-09-03', name: 'Nghỉ bù Quốc Khánh' },
  { id: 12, date: '2026-04-06', name: 'Giỗ Tổ Hùng Vương' },
];

const DEFAULT_CONFIG: BusinessConfig = {
  workDays: [1, 2, 3, 4, 5], // 0=CN, 1=T2, 2=T3, ..., 6=T7
  startHour: 8, // 08:00
  endHour: 17, // 17:00
  lunchBreakEnabled: true,
  lunchBreak: {
    start: 12,
    end: 13,
  },
  holidays: DEFAULT_HOLIDAYS,
};

function loadConfig(): BusinessConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_CONFIG,
        ...parsed,
      };
    }
  } catch {
    // ignore corrupted data
  }
  return {
    ...DEFAULT_CONFIG,
  };
}

function saveConfig(config: BusinessConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

/**
 * Returns a config object compatible with calculateBusinessHours()
 */
export function getBusinessConfig(): BusinessHoursCalcConfig {
  const cfg = loadConfig();
  return {
    workDays: cfg.workDays,
    startHour: cfg.startHour,
    endHour: cfg.endHour,
    lunchBreak: cfg.lunchBreakEnabled ? cfg.lunchBreak : null,
    holidays: cfg.holidays.map((h) => h.date),
  };
}

const ConfigContext = createContext<ConfigContextType | null>(null);

interface ConfigProviderProps {
  children: ReactNode;
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfigState] = useState<BusinessConfig>(loadConfig);

  const setConfig = useCallback(
    (updater: Partial<BusinessConfig> | ((prev: BusinessConfig) => BusinessConfig)) => {
      setConfigState((prev) => {
        const next =
          typeof updater === 'function'
            ? updater(prev)
            : {
                ...prev,
                ...updater,
              };
        saveConfig(next);
        return next;
      });
    },
    []
  );

  // Legacy hooks compatibility
  const workingHours = {
    morning: {
      start: `${String(Math.floor(config.startHour)).padStart(2, '0')}:${String(
        Math.round((config.startHour % 1) * 60)
      ).padStart(2, '0')}`,
      end: `${String(Math.floor(config.lunchBreak?.start || 12)).padStart(2, '0')}:${String(
        Math.round(((config.lunchBreak?.start || 12) % 1) * 60)
      ).padStart(2, '0')}`,
    },
    afternoon: {
      start: `${String(Math.floor(config.lunchBreak?.end || 13)).padStart(2, '0')}:${String(
        Math.round(((config.lunchBreak?.end || 13) % 1) * 60)
      ).padStart(2, '0')}`,
      end: `${String(Math.floor(config.endHour)).padStart(2, '0')}:${String(
        Math.round((config.endHour % 1) * 60)
      ).padStart(2, '0')}`,
    },
  };

  const value: ConfigContextType = {
    config,
    setConfig,
    // Legacy API
    workingHours,
    setWorkingHours: () => {},
    holidays: config.holidays,
    setHolidays: (updater: Holiday[] | ((prev: Holiday[]) => Holiday[])) => {
      setConfig((prev) => ({
        ...prev,
        holidays: typeof updater === 'function' ? updater(prev.holidays) : updater,
      }));
    },
  };

  return <ConfigContext.Provider value={value}> {children} </ConfigContext.Provider>;
}

export const useConfig = (): ConfigContextType => {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig must be used within ConfigProvider');
  return ctx;
};

export const useAppConfig = useConfig;
