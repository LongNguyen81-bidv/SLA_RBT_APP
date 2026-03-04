import React from 'react';
import { useConfig } from '../context/ConfigContext';

interface DayLabel {
  value: number;
  label: string;
}

const DAY_LABELS: DayLabel[] = [
  { value: 1, label: 'T2' },
  { value: 2, label: 'T3' },
  { value: 3, label: 'T4' },
  { value: 4, label: 'T5' },
  { value: 5, label: 'T6' },
  { value: 6, label: 'T7' },
  { value: 0, label: 'CN' },
];

function hourToTime(h: number): string {
  const hh = String(Math.floor(h)).padStart(2, '0');
  const mm = String(Math.round((h % 1) * 60)).padStart(2, '0');
  return `${hh}:${mm}`;
}

function timeToHour(t: string): number {
  const [hh, mm] = t.split(':').map(Number);
  return hh + mm / 60;
}

export default function WorkingHoursConfig() {
  const { config, setConfig } = useConfig();

  const toggleDay = (day: number) => {
    setConfig((prev) => {
      const days = prev.workDays.includes(day)
        ? prev.workDays.filter((d) => d !== day)
        : [...prev.workDays, day].sort((a, b) => a - b);
      return {
        ...prev,
        workDays: days,
      };
    });
  };

  return (
    <div className="bg-white border border-[#C5DED9] rounded-[10px] overflow-hidden shadow-sm">
      {' '}
      {/* Header */}
      <div className="px-4 py-3 bg-bidv-green-surface border-b border-bidv-green-tint">
        <div className="flex items-center gap-2">
          <span className="text-base">🕐</span>
          <span className="text-xs font-semibold text-bidv-green font-mono tracking-wider">
            GIỜ LÀM VIỆC
          </span>
        </div>
      </div>
      <div className="p-4 space-y-5">
        {' '}
        {/* Work hours */}
        <div>
          <label className="text-[11px] font-semibold text-[#6B9E97] uppercase tracking-wider mb-2 block font-mono">
            Giờ bắt đầu / kết thúc
          </label>
          <div className="flex items-center gap-3">
            <input
              type="time"
              value={hourToTime(config.startHour)}
              onChange={(e) =>
                setConfig({
                  startHour: timeToHour(e.target.value),
                })
              }
              className="px-3 py-2 border border-[#C5DED9] rounded-lg text-sm font-mono text-[#1a3329] focus:outline-none focus:ring-2 focus:ring-bidv-green/30 focus:border-bidv-green bg-surface-50 transition-all"
            />
            <span className="text-xs text-[#94B5B0] font-mono">→</span>
            <input
              type="time"
              value={hourToTime(config.endHour)}
              onChange={(e) =>
                setConfig({
                  endHour: timeToHour(e.target.value),
                })
              }
              className="px-3 py-2 border border-[#C5DED9] rounded-lg text-sm font-mono text-[#1a3329] focus:outline-none focus:ring-2 focus:ring-bidv-green/30 focus:border-bidv-green bg-surface-50 transition-all"
            />
          </div>
        </div>
        {/* Lunch break */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-semibold text-[#6B9E97] uppercase tracking-wider font-mono">
              Nghỉ trưa
            </label>
            <button
              onClick={() =>
                setConfig((prev) => ({
                  ...prev,
                  lunchBreakEnabled: !prev.lunchBreakEnabled,
                }))
              }
              className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
                config.lunchBreakEnabled ? 'bg-bidv-green' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  config.lunchBreakEnabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          {config.lunchBreakEnabled && (
            <div className="flex items-center gap-3 animate-fadeIn">
              <input
                type="time"
                value={hourToTime(config.lunchBreak.start)}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    lunchBreak: {
                      ...prev.lunchBreak,
                      start: timeToHour(e.target.value),
                    },
                  }))
                }
                className="px-3 py-2 border border-[#C5DED9] rounded-lg text-sm font-mono text-[#1a3329] focus:outline-none focus:ring-2 focus:ring-bidv-green/30 focus:border-bidv-green bg-surface-50 transition-all"
              />
              <span className="text-xs text-[#94B5B0] font-mono">→</span>
              <input
                type="time"
                value={hourToTime(config.lunchBreak.end)}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    lunchBreak: {
                      ...prev.lunchBreak,
                      end: timeToHour(e.target.value),
                    },
                  }))
                }
                className="px-3 py-2 border border-[#C5DED9] rounded-lg text-sm font-mono text-[#1a3329] focus:outline-none focus:ring-2 focus:ring-bidv-green/30 focus:border-bidv-green bg-surface-50 transition-all"
              />
            </div>
          )}{' '}
        </div>
        {/* Workdays */}
        <div>
          <label className="text-[11px] font-semibold text-[#6B9E97] uppercase tracking-wider mb-2 block font-mono">
            Ngày làm việc
          </label>
          <div className="flex gap-1.5">
            {' '}
            {DAY_LABELS.map(({ value, label }) => {
              const active = config.workDays.includes(value);
              return (
                <button
                  key={value}
                  onClick={() => toggleDay(value)}
                  className={`w-10 h-10 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                    active
                      ? 'bg-bidv-green text-white border-bidv-green shadow-sm'
                      : 'bg-surface-50 text-[#94B5B0] border-[#C5DED9] hover:border-bidv-green-mid hover:text-bidv-green-mid'
                  }`}
                >
                  {' '}
                  {label}{' '}
                </button>
              );
            })}{' '}
          </div>
        </div>
        {/* Summary */}
        <div className="bg-[#F0FAF8] rounded-lg p-3 border border-[#D5EBE7]">
          <div className="text-[10px] text-[#6B9E97] font-mono mb-1">TÓM TẮT</div>
          <div className="text-xs text-[#1a3329] font-sans leading-relaxed">
            Làm việc
            <span className="font-semibold text-bidv-green"> {hourToTime(config.startHour)}</span>
            {' → '}
            <span className="font-semibold text-bidv-green"> {hourToTime(config.endHour)}</span>
            {config.lunchBreakEnabled && (
              <>
                , nghỉ trưa{' '}
                <span className="font-semibold text-bidv-gold-dark">
                  {' '}
                  {hourToTime(config.lunchBreak.start)}→ {hourToTime(config.lunchBreak.end)}{' '}
                </span>
              </>
            )}
            {' · '}
            <span className="font-semibold">
              {' '}
              {config.endHour -
                config.startHour -
                (config.lunchBreakEnabled ? config.lunchBreak.end - config.lunchBreak.start : 0)}
              h
            </span>
            /ngày
          </div>
        </div>
      </div>
    </div>
  );
}
