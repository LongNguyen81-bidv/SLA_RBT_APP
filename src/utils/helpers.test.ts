import { calculateBusinessHours } from './helpers';
import type { BusinessHoursCalcConfig } from '../types';

describe('calculateBusinessHours', () => {
  const config: BusinessHoursCalcConfig = {
    workDays: [1, 2, 3, 4, 5],
    startHour: 8,
    endHour: 17,
    lunchBreak: {
      start: 12,
      end: 13,
    },
    holidays: ['2026-03-04'],
  };

  it('calculates hours on the same day without lunch overlap', () => {
    // 10:00 to 11:30 = 1.5 hours
    const result = calculateBusinessHours('2026-03-03T10:00:00', '2026-03-03T11:30:00', config);
    expect(result).toBeCloseTo(1.5);
  });

  it('calculates hours on the same day with lunch overlap', () => {
    // 10:00 to 14:00 -> 10-12 (2h) + 13-14 (1h) = 3 hours
    const result = calculateBusinessHours('2026-03-03T10:00:00', '2026-03-03T14:00:00', config);
    expect(result).toBeCloseTo(3);
  });

  it('calculates multi-day including holidays', () => {
    // 2026-03-03 is Tuesday.
    // 2026-03-03: 15:00 to 17:00 = 2 hours
    // 2026-03-04 is Wednesday, but it's a holiday in config = 0 hours
    // 2026-03-05 is Thursday. 08:00 to 10:00 = 2 hours
    // Total = 4 hours
    const result = calculateBusinessHours('2026-03-03T15:00:00', '2026-03-05T10:00:00', config);
    expect(result).toBeCloseTo(4);
  });

  it('returns 0 if start is after end', () => {
    const result = calculateBusinessHours('2026-03-03T14:00:00', '2026-03-03T10:00:00', config);
    expect(result).toBe(0);
  });
});
