import React from 'react';

const statusColors = {
  ok: { bg: '#0d2b1d', border: '#16a34a', text: '#4ade80', dot: '#22c55e' },
  warning: { bg: '#2d1f00', border: '#d97706', text: '#fbbf24', dot: '#f59e0b' },
  exceeded: { bg: '#2d0d0d', border: '#dc2626', text: '#f87171', dot: '#ef4444' },
  pending: { bg: '#1a1a2e', border: '#334155', text: '#64748b', dot: '#475569' },
};

export default function StatusBadge({ status, label }) {
  const c = statusColors[status];
  return (
    <span
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
        padding: '2px 10px',
        borderRadius: 4,
        fontSize: 11,
        fontFamily: "'IBM Plex Mono', monospace",
        fontWeight: 600,
        letterSpacing: '0.05em',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: c.dot,
          display: 'inline-block',
        }}
      />
      {label}
    </span>
  );
}
