import React from 'react';
import { getSLAStatus, formatHours } from '../utils/helpers';
import StatusBadge from './StatusBadge';
import SLABar from './SLABar';

export default function StepCard({ step, progress, isActive }) {
  const status = progress.completed
    ? getSLAStatus(progress.actualHours, step.slaHours)
    : isActive
      ? 'warning'
      : 'pending';

  const statusLabel = {
    ok: 'Đúng hạn',
    warning: 'Cần chú ý',
    exceeded: 'Vượt SLA',
    pending: 'Chờ xử lý',
  }[status];

  return (
    <div
      style={{
        padding: '14px 16px',
        borderRadius: 8,
        background: isActive ? '#0f172a' : '#080d14',
        border: `1px solid ${isActive ? '#334155' : '#1e293b'}`,
        transition: 'all 0.3s',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 8,
        }}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              color: '#475569',
              background: '#0f172a',
              border: '1px solid #1e293b',
              padding: '2px 7px',
              borderRadius: 3,
            }}
          >
            {step.code}
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#e2e8f0',
              fontFamily: "'Be Vietnam Pro', sans-serif",
            }}
          >
            {step.name}
          </span>
        </div>
        <StatusBadge status={status} label={statusLabel} />
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 8 }}>
        <span
          style={{ fontSize: 11, color: '#64748b', fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          {step.owner}
        </span>
        <span
          style={{
            fontSize: 10,
            color: step.system === 'RLOS' ? '#818cf8' : '#94a3b8',
            fontFamily: "'IBM Plex Mono', monospace",
            background: step.system === 'RLOS' ? '#1e1b4b' : '#111827',
            padding: '1px 6px',
            borderRadius: 3,
            border: `1px solid ${step.system === 'RLOS' ? '#3730a3' : '#1e293b'}`,
          }}
        >
          {step.system}
        </span>
        {!step.internal && (
          <span
            style={{
              fontSize: 10,
              color: '#78716c',
              fontFamily: "'IBM Plex Mono', monospace",
              background: '#1c1917',
              padding: '1px 6px',
              borderRadius: 3,
              border: '1px solid #292524',
            }}
          >
            Ngoài NH
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <SLABar actual={progress.actualHours} sla={step.slaHours} />
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: '#94a3b8',
            whiteSpace: 'nowrap',
          }}
        >
          {formatHours(progress.actualHours)} / {formatHours(step.slaHours)}
        </span>
      </div>
    </div>
  );
}
