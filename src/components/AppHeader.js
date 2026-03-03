import React from 'react';

const NAV = [
  {
    id: 'dashboard',
    label: 'Dashboard',
  },
  {
    id: 'loans',
    label: 'Hồ sơ',
  },
  {
    id: 'staff',
    label: 'Hiệu suất',
  },
  {
    id: 'config',
    label: 'Cấu hình SLA',
  },
];

export default function AppHeader({ activeTab, setActiveTab }) {
  return (
    <div
      style={{
        borderBottom: '1px solid #111827',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        position: 'sticky',
        top: 0,
        background: '#030712',
        zIndex: 100,
      }}
    >
      {' '}
      {/* Logo / Brand */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
            color: '#fff',
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          SLA
        </div>
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#f1f5f9',
              lineHeight: 1.2,
            }}
          >
            RBT Credit SLA Tracker
          </div>
          <div
            style={{
              fontSize: 10,
              color: '#475569',
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            Quy trình Tín dụng Bán lẻ · Có TSBĐ
          </div>
        </div>
      </div>
      {/* Navigation */}
      <nav
        style={{
          display: 'flex',
          gap: 4,
        }}
      >
        {' '}
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => setActiveTab(n.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 500,
              background: activeTab === n.id ? '#1e3a5f' : 'transparent',
              color: activeTab === n.id ? '#60a5fa' : '#64748b',
              transition: 'all 0.2s',
              fontFamily: "'Be Vietnam Pro', sans-serif",
            }}
          >
            {' '}
            {n.label}{' '}
          </button>
        ))}{' '}
      </nav>
      {/* Live indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 8px #22c55e',
            animation: 'pulse 2s infinite',
          }}
        />
        <span
          style={{
            fontSize: 11,
            color: '#64748b',
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          LIVE
        </span>
      </div>
    </div>
  );
}
