import type { SLAStatus, BusinessHoursCalcConfig, BusinessConfig } from '../types';

/** Config accepted by business hours functions — either full BusinessConfig or calc-only config */
export type BusinessHoursInput = BusinessHoursCalcConfig | BusinessConfig;

/** Normalize config to calc-compatible format */
function normalizeConfig(config: BusinessHoursInput): BusinessHoursCalcConfig {
  // If holidays is an array of objects (Holiday[]), extract date strings
  const rawHolidays =
    (config as BusinessConfig).holidays ?? (config as BusinessHoursCalcConfig).holidays ?? [];
  const holidays: string[] = rawHolidays.map((h: string | { date: string }) =>
    typeof h === 'string' ? h : h.date
  );

  // Handle lunchBreak — BusinessConfig has lunchBreakEnabled flag
  let lunchBreak = (config as BusinessHoursCalcConfig).lunchBreak;
  if ('lunchBreakEnabled' in config) {
    lunchBreak = (config as BusinessConfig).lunchBreakEnabled
      ? (config as BusinessConfig).lunchBreak
      : null;
  }

  return {
    workDays: config.workDays,
    startHour: config.startHour,
    endHour: config.endHour,
    lunchBreak,
    holidays,
  };
}

export function getSLAStatus(actualHours: number | null, slaHours: number): SLAStatus {
  if (actualHours === null) {
    return 'pending';
  }
  // Use a small epsilon to fix floating point division errors (e.g. 19.2 / 24 = 0.7999999999999999)
  const ratio = actualHours / slaHours;
  if (ratio > 1.000001) {
    return 'exceeded';
  }
  if (ratio >= 0.799999) {
    return 'warning';
  }
  return 'ok';
}

export function hourToTime(h: number): string {
  const hh = String(Math.floor(h)).padStart(2, '0');
  const mm = String(Math.round((h % 1) * 60)).padStart(2, '0');
  return `${hh}:${mm}`;
}

export function formatHours(h: number | null | undefined): string {
  if (h === null || h === undefined) {
    return '—';
  }
  if (h < 1) {
    return `${Math.round(h * 60)}p`;
  }
  return `${h.toFixed(1)}h`;
}

export function formatNumber(value: number | string | null | undefined): string | number {
    if (value === null || value === undefined) return '-';
    
    let numVal;
    if (typeof value === 'number') {
        numVal = value;
    } else if (typeof value === 'string') {
        const parsed = Number(value.replace(/,/g, ''));
        if (isNaN(parsed) || value.trim() === '') return value;
        numVal = parsed;
    } else {
        return value;
    }

    // Format with dot as thousands separator and comma as decimal separator
    // vi-VN locale naturally uses dot for thousands and comma for fractions
    return new Intl.NumberFormat('vi-VN', {
      maximumFractionDigits: 2,
    }).format(numVal);
}

export function getElapsedHours (startTime: number | null, config: BusinessHoursInput = {}): number {
  if (!startTime) return 0;
  return calculateBusinessHours(startTime, Date.now(), config);
}

/**
 * Calculates actual business hours between two timestamps based on a configuration.
 */
export function calculateBusinessHours(
  startTime: Date | string | number,
  endTime: Date | string | number,
  rawConfig: BusinessHoursInput = {}
): number {
  if (!startTime || !endTime) return 0;

  const start = new Date(startTime);
  const end = new Date(endTime);
  if (start >= end) return 0;

  const normalized = normalizeConfig(rawConfig);
  const {
    workDays = [1, 2, 3, 4, 5], // 1: Monday, ..., 5: Friday
    startHour = 8, // 08:00
    endHour = 17, // 17:00
    lunchBreak = {
      start: 12,
      end: 13,
    }, // Set to null to disable lunch break subtraction
    holidays = [], // Array of 'YYYY-MM-DD' strings
  } = normalized;

  let totalMilliseconds = 0;
  const current = new Date(start);

  while (current < end) {
    const dayOfWeek = current.getDay();
    // Get local date string YYYY-MM-DD
    const dateString =
      current.getFullYear() +
      '-' +
      String(current.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(current.getDate()).padStart(2, '0');

    // Check if the current day is a working day and not a holiday
    if (workDays.includes(dayOfWeek) && !holidays.includes(dateString)) {
      const startOfDay = new Date(current);
      startOfDay.setHours(Math.floor(startHour), (startHour % 1) * 60, 0, 0);

      const endOfDay = new Date(current);
      endOfDay.setHours(Math.floor(endHour), (endHour % 1) * 60, 0, 0);

      // Determine actual start and end considering business hours for this day
      const todayStart = new Date(Math.max(current.getTime(), startOfDay.getTime()));
      const todayEnd = new Date(Math.min(end.getTime(), endOfDay.getTime()));

      if (todayStart < todayEnd) {
        let dayMs = todayEnd.getTime() - todayStart.getTime();

        // Subtract lunch break if it falls within the worked period today
        if (lunchBreak) {
          const lunchStart = new Date(current);
          lunchStart.setHours(Math.floor(lunchBreak.start), (lunchBreak.start % 1) * 60, 0, 0);

          const lunchEnd = new Date(current);
          lunchEnd.setHours(Math.floor(lunchBreak.end), (lunchBreak.end % 1) * 60, 0, 0);

          const lunchOverlapStart = new Date(Math.max(todayStart.getTime(), lunchStart.getTime()));
          const lunchOverlapEnd = new Date(Math.min(todayEnd.getTime(), lunchEnd.getTime()));

          // If the work period overlaps with the lunch break, subtract that overlap
          if (lunchOverlapStart < lunchOverlapEnd) {
            dayMs -= lunchOverlapEnd.getTime() - lunchOverlapStart.getTime();
          }
        }

        totalMilliseconds += dayMs;
      }
    }

    // Move to the next day at exactly 00:00:00
    current.setDate(current.getDate() + 1);
    current.setHours(0, 0, 0, 0);
  }

  // Convert milliseconds to hours
  return totalMilliseconds / (1000 * 60 * 60);
}
