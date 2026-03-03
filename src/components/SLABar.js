import React from 'react';

export default function SLABar({ actual, sla }) {
  if (actual === null) return <div style={{ height: 4, background: '#1e293b', borderRadius: 2 }} />;
  const pct = Math.min((actual / sla) * 100, 100);
  const overflow = actual > sla;
  const warn = actual / sla >= 0.8;
  const color = overflow ? '#ef4444' : warn ? '#f59e0b' : '#22c55e';
  return (
    <div
      style={{
        height: 4,
        background: '#1e293b',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          background: color,
          borderRadius: 2,
          transition: 'width 0.8s ease',
        }}
      />
    </div>
  );
}
