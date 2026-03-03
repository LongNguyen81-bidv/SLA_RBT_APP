import React from 'react';
import { getSLAStatus, formatHours, getElapsedHours } from '../utils/helpers';
import StatusBadge from './StatusBadge';
import { SLA_STEPS } from '../constants/mockData';

export default function LoanCardComp({ loan, progress, onClick, selected }) {
  const currentStep = progress.findIndex((p) => !p.completed);
  const completedCount = progress.filter((p) => p.completed).length;
  const hasExceeded = progress.some(
    (p, i) => p.actualHours && getSLAStatus(p.actualHours, SLA_STEPS[i].slaHours) === 'exceeded'
  );
  const hasWarning = progress.some(
    (p, i) => p.actualHours && getSLAStatus(p.actualHours, SLA_STEPS[i].slaHours) === 'warning'
  );
  const elapsed = getElapsedHours(loan.startTime);
  const overallStatus = hasExceeded ? 'exceeded' : hasWarning ? 'warning' : 'ok';

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-[10px] cursor-pointer border transition-all duration-200 ${
        selected
          ? 'bg-[#E8F5F3] border-bidv-green shadow-[0_0_0_2px_rgba(0,77,64,0.15)]'
          : hasExceeded
            ? 'bg-white border-red-300 shadow-sm'
            : 'bg-white border-[#C5DED9] shadow-sm'
      }`}
    >
      {' '}
      {/* Top: ID + Badge */}
      <div className="flex justify-between mb-1.5">
        <span className="font-mono text-[11px] text-bidv-green-mid"> {loan.id} </span>
        <StatusBadge
          status={overallStatus}
          label={
            overallStatus === 'exceeded'
              ? 'Vượt SLA'
              : overallStatus === 'warning'
                ? 'Cần chú ý'
                : 'Đúng hạn'
          }
        />
      </div>
      {/* Customer name */}
      <div className="text-sm font-semibold text-[#1a3329] mb-0.5 font-sans"> {loan.customer} </div>
      {/* Type + Amount */}
      <div className="text-xs text-[#6B9E97] mb-2.5 font-sans">
        {' '}
        {loan.type}· {loan.amount}{' '}
      </div>
      {/* Mini progress bars */}
      <div className="flex gap-0.5 mb-2">
        {' '}
        {SLA_STEPS.map((step, i) => {
          const s = progress[i];
          const st = s.completed
            ? getSLAStatus(s.actualHours, step.slaHours)
            : i === currentStep
              ? 'warning'
              : 'pending';
          const colorMap = {
            ok: 'bg-emerald-500',
            warning: 'bg-amber-500',
            exceeded: 'bg-red-500',
            pending: 'bg-[#E2EFED]',
          };
          return <div key={step.id} className={`flex-1 h-1 rounded-[1px] ${colorMap[st]}`} />;
        })}{' '}
      </div>
      {/* Footer: Step count + elapsed */}
      <div className="flex justify-between text-[11px] text-[#94B5B0] font-sans">
        <span>
          Bước {currentStep === -1 ? 10 : currentStep + 1}/{SLA_STEPS.length}· {completedCount}
          hoàn thành
        </span>
        <span>
          {' '}
          {formatHours(elapsed)}
          đã trôi qua
        </span>
      </div>
    </div>
  );
}
