import React from 'react';

export default function MetricCard({ label, value, sub, accent }) {
  return (
    <div
      style={{
        padding: '20px',
        borderRadius: 10,
        background: '#080d14',
        border: '1px solid #1e293b',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 3,
          height: '100%',
          background: accent,
          borderRadius: '10px 0 0 10px',
        }}
      />
      <div
        style={{
          fontSize: 11,
          color: '#64748b',
          marginBottom: 6,
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontWeight: 500,
        }}
      >
        {' '}
        {label}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: '#f1f5f9',
          fontFamily: "'IBM Plex Mono', monospace",
          lineHeight: 1,
        }}
      >
        {' '}
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 11,
            color: '#475569',
            marginTop: 4,
            fontFamily: "'Be Vietnam Pro', sans-serif",
          }}
        >
          {' '}
          {sub}
        </div>
      )}{' '}
    </div>
  );
}
