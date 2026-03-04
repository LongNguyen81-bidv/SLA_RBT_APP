import React from 'react';
import { getSLAStatus, formatHours, getElapsedHours } from '../utils/helpers';
import StatusBadge from './StatusBadge';
import SLABar from './SLABar';
import { useConfig } from '../context/ConfigContext';
import type { SLAStep, StepProgress, SLAStatus } from '../types';

interface StepCardProps {
  step: SLAStep;
  progress: StepProgress;
  isActive: boolean;
}

export default function StepCard({ step, progress, isActive }: StepCardProps) {
  // Subscribe to config changes so business-hours-aware elapsed time recalculates
  const { config } = useConfig();

  const currentActualHours =
    isActive && progress.startedAt
      ? getElapsedHours(progress.startedAt, config)
      : progress.actualHours;
  const status: SLAStatus = progress.completed
    ? getSLAStatus(progress.actualHours, step.slaHours)
    : isActive && progress.startedAt
      ? getSLAStatus(currentActualHours, step.slaHours)
      : 'pending';

  const statusLabel: string = {
    ok: 'Đúng hạn',
    warning: 'Cần chú ý',
    exceeded: 'Vượt SLA',
    pending: 'Chờ xử lý',
  }[status];

  // Build a tooltip with config info
  const workHoursPerDay =
    config.endHour -
    config.startHour -
    (config.lunchBreakEnabled ? config.lunchBreak.end - config.lunchBreak.start : 0);
  const configTooltip = `Giờ làm việc: ${workHoursPerDay}h/ngày · ${
    config.workDays.length
  } ngày/tuần`;

  return (
    <div
      className={`px-4 py-3.5 rounded-lg border transition-all duration-300 ${
        isActive
          ? 'bg-[#FFFDF0] border-bidv-gold shadow-[0_0_0_1px_rgba(201,168,76,0.2)]'
          : 'bg-white border-[#C5DED9] shadow-[0_1px_2px_rgba(0,77,64,0.04)]'
      }`}
    >
      {' '}
      {/* Header: code + name + badge */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2.5 items-center">
          <span className="font-mono text-[10px] text-[#6B9E97] bg-bidv-green-tint border border-[#C5DED9] px-[7px] py-0.5 rounded">
            {' '}
            {step.code}{' '}
          </span>
          <span className="text-[13px] font-medium text-[#1a3329] font-sans"> {step.name} </span>
        </div>
        <StatusBadge status={status} label={statusLabel} />
      </div>
      {/* Meta row: owner + system + external */}
      <div className="flex gap-4 items-center mb-2">
        <span className="text-[11px] text-[#6B9E97] font-sans"> {step.owner} </span>
        <span
          className={`text-[10px] font-mono px-1.5 py-px rounded border ${
            step.system === 'RLOS'
              ? 'text-bidv-green bg-bidv-green-tint border-[#80CBC4] font-semibold'
              : 'text-[#6B9E97] bg-bidv-green-surface border-[#C5DED9] font-normal'
          }`}
        >
          {' '}
          {step.system}{' '}
        </span>
        {!step.internal && (
          <span className="text-[10px] text-bidv-gold font-mono bg-[#FFFBEE] px-1.5 py-px rounded border border-[#E8D5A0]">
            Ngoài NH
          </span>
        )}{' '}
      </div>
      {/* SLA Progress bar */}
      <div className="flex gap-2 items-center">
        <SLABar actual={currentActualHours} sla={step.slaHours} />
        <span
          className="font-mono text-[11px] text-[#6B9E97] whitespace-nowrap"
          title={configTooltip}
        >
          {' '}
          {formatHours(currentActualHours)}/{formatHours(step.slaHours)}{' '}
        </span>
      </div>
      {/* Active step: show business hours note */}
      {isActive && progress.startedAt && (
        <div className="mt-2 text-[10px] text-[#94B5B0] font-mono flex items-center gap-1">
          <span>⏱</span>
          <span>
            Tính theo giờ làm việc ({workHoursPerDay}h/ngày, {config.workDays.length}
            ngày/tuần)
          </span>
        </div>
      )}{' '}
    </div>
  );
}
