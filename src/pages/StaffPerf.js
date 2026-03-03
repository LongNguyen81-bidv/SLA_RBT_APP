import React from 'react';
import StatusBadge from '../components/StatusBadge';

export default function StaffPerf({ STAFF_PERF }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#f1f5f9',
            marginBottom: 4,
          }}
        >
          Hiệu suất Cán bộ
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#475569',
          }}
        >
          Tháng 3/2025 · Đo lường dựa trên SLA từng bước
        </div>
      </div>

      <div
        style={{
          background: '#080d14',
          border: '1px solid #1e293b',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b' }}>
              {' '}
              {[
                'Cán bộ',
                'Vai trò',
                'Đơn vị',
                'Số hồ sơ',
                'TG TB (h)',
                'Bước vượt SLA',
                'Hiệu suất',
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: 10,
                    color: '#475569',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                  }}
                >
                  {' '}
                  {h}
                </th>
              ))}{' '}
            </tr>
          </thead>
          <tbody>
            {' '}
            {STAFF_PERF.map((s, i) => {
              const perf =
                s.exceeded === 0
                  ? 'Xuất sắc'
                  : s.exceeded <= 1
                    ? 'Tốt'
                    : s.exceeded <= 2
                      ? 'Trung bình'
                      : 'Cần cải thiện';
              return (
                <tr key={i} style={{ borderBottom: '1px solid #0f172a' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#e2e8f0',
                      }}
                    >
                      {' '}
                      {s.name}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: '12px 16px',
                      fontSize: 12,
                      color: '#64748b',
                    }}
                  >
                    {' '}
                    {s.role}
                  </td>
                  <td
                    style={{
                      padding: '12px 16px',
                      fontSize: 11,
                      color: '#475569',
                    }}
                  >
                    {' '}
                    {s.dept}
                  </td>
                  <td
                    style={{
                      padding: '12px 16px',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 12,
                      color: '#94a3b8',
                    }}
                  >
                    {' '}
                    {s.loans}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 12,
                        color: s.avgHours > 3 ? '#f59e0b' : '#94a3b8',
                      }}
                    >
                      {' '}
                      {s.avgHours}h
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {' '}
                    {s.exceeded > 0 ? (
                      <span
                        style={{
                          fontSize: 12,
                          color: '#ef4444',
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        {' '}
                        {s.exceeded}
                        bước
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: 12,
                          color: '#22c55e',
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        Không có
                      </span>
                    )}{' '}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <StatusBadge
                      status={
                        s.exceeded === 0
                          ? 'ok'
                          : s.exceeded <= 1
                            ? 'ok'
                            : s.exceeded <= 2
                              ? 'warning'
                              : 'exceeded'
                      }
                      label={perf}
                    />
                  </td>
                </tr>
              );
            })}{' '}
          </tbody>
        </table>
      </div>
    </div>
  );
}
