import { calculateBusinessHours, getSLAStatus, formatHours, getElapsedHours } from './helpers';
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
    const result = calculateBusinessHours('2026-03-03T10:00:00', '2026-03-03T11:30:00', config);
    expect(result).toBeCloseTo(1.5);
  });

  it('calculates hours on the same day with lunch overlap', () => {
    const result = calculateBusinessHours('2026-03-03T10:00:00', '2026-03-03T14:00:00', config);
    expect(result).toBeCloseTo(3);
  });

  it('calculates multi-day including holidays', () => {
    const result = calculateBusinessHours('2026-03-03T15:00:00', '2026-03-05T10:00:00', config);
    expect(result).toBeCloseTo(4);
  });

  it('returns 0 if start is after end', () => {
    const result = calculateBusinessHours('2026-03-03T14:00:00', '2026-03-03T10:00:00', config);
    expect(result).toBe(0);
  });
});

describe('getSLAStatus', () => {
  it('returns pending', () => {
    expect(getSLAStatus(null, 24)).toBe('pending');
  });

  it('returns ok', () => {
    expect(getSLAStatus(10, 24)).toBe('ok');
    expect(getSLAStatus(19.1, 24)).toBe('ok');
  });

  it('returns warning', () => {
    expect(getSLAStatus(19.2, 24)).toBe('warning');
    expect(getSLAStatus(20, 24)).toBe('warning');
    expect(getSLAStatus(24, 24)).toBe('warning');
  });

  it('returns exceeded', () => {
    expect(getSLAStatus(25, 24)).toBe('exceeded');
  });
});

describe('formatHours', () => {
  it('returns emdash', () => {
    expect(formatHours(null)).toBe('\u2014');
    expect(formatHours(undefined)).toBe('\u2014');
  });

  it('returns minutes', () => {
    expect(formatHours(0.5)).toBe('30p');
    expect(formatHours(0.75)).toBe('45p');
  });

  it('returns hours', () => {
    expect(formatHours(1)).toBe('1.0h');
    expect(formatHours(1.234)).toBe('1.2h');
    expect(formatHours(2.89)).toBe('2.9h');
  });
});

describe('getElapsedHours', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-03-03T14:00:00'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns 0 if startTime is null', () => {
    expect(getElapsedHours(null)).toBe(0);
  });

  it('calculates elapsed hours up to now using default config', () => {
    const result = getElapsedHours(new Date('2026-03-03T10:00:00').getTime());
    expect(result).toBeCloseTo(3);
  });
});

