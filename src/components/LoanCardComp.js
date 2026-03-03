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
      style={{
        padding: '16px',
        borderRadius: 10,
        cursor: 'pointer',
        background: selected ? '#0f1e35' : '#080d14',
        border: `1px solid ${selected ? '#3b82f6' : hasExceeded ? '#7f1d1d' : '#1e293b'}`,
        transition: 'all 0.2s',
        boxShadow: selected ? '0 0 0 1px #3b82f6' : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: '#60a5fa' }}>
          {loan.id}
        </span>
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
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#e2e8f0',
          marginBottom: 2,
          fontFamily: '"Be Vietnam Pro", sans-serif',
        }}
      >
        {loan.customer}
      </div>
      <div
        style={{
          fontSize: 12,
          color: '#64748b',
          marginBottom: 10,
          fontFamily: '"Be Vietnam Pro", sans-serif',
        }}
      >
        {loan.type} · {loan.amount}
      </div>

      <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
        {SLA_STEPS.map((step, i) => {
          const s = progress[i];
          const st = s.completed
            ? getSLAStatus(s.actualHours, step.slaHours)
            : i === currentStep
              ? 'warning'
              : 'pending';
          const c = { ok: '#22c55e', warning: '#f59e0b', exceeded: '#ef4444', pending: '#1e293b' }[
            st
          ];
          return (
            <div key={step.id} style={{ flex: 1, height: 4, borderRadius: 1, background: c }} />
          );
        })}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11,
          color: '#475569',
          fontFamily: '"Be Vietnam Pro", sans-serif',
        }}
      >
        <span>
          Bước {currentStep === -1 ? 10 : currentStep + 1}/{SLA_STEPS.length} · {completedCount}{' '}
          hoàn thành
        </span>
        <span>{formatHours(elapsed)} đã trôi qua</span>
      </div>
    </div>
  );
}
