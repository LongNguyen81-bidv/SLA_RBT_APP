import React from 'react';
import { getSLAStatus } from '../utils/helpers';

export default function SLAStepsTable({ SLA_STEPS, allProgress }) {
  return (
    <div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#94a3b8',
          marginBottom: 12,
          fontFamily: "'IBM Plex Mono', monospace",
        }}
      >
        TỔNG HỢP THEO BƯỚC
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
                'Bước',
                'Tên bước',
                'Phụ trách',
                'SLA (h)',
                'Đúng hạn',
                'Cần chú ý',
                'Vượt SLA',
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '10px 14px',
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
            {SLA_STEPS.map((step, si) => {
              const statuses = allProgress.map((prog) => {
                const p = prog[si];
                return p.actualHours ? getSLAStatus(p.actualHours, step.slaHours) : 'pending';
              });
              const ok = statuses.filter((s) => s === 'ok').length;
              const warn = statuses.filter((s) => s === 'warning').length;
              const exc = statuses.filter((s) => s === 'exceeded').length;
              return (
                <tr key={step.id} style={{ borderBottom: '1px solid #0f172a' }}>
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 11,
                        color: '#475569',
                      }}
                    >
                      {' '}
                      {step.code}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: '10px 14px',
                      fontSize: 12,
                      color: '#cbd5e1',
                    }}
                  >
                    {' '}
                    {step.name}
                    {!step.internal && (
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: 9,
                          color: '#78716c',
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        NGOÀI NH
                      </span>
                    )}{' '}
                  </td>
                  <td
                    style={{
                      padding: '10px 14px',
                      fontSize: 11,
                      color: '#64748b',
                    }}
                  >
                    {' '}
                    {step.owner}
                  </td>
                  <td
                    style={{
                      padding: '10px 14px',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 12,
                      color: '#94a3b8',
                    }}
                  >
                    {' '}
                    {step.slaHours}h
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    {' '}
                    {ok > 0 && (
                      <span
                        style={{
                          fontSize: 12,
                          color: '#22c55e',
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        {' '}
                        {ok}
                      </span>
                    )}{' '}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    {' '}
                    {warn > 0 && (
                      <span
                        style={{
                          fontSize: 12,
                          color: '#f59e0b',
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        {' '}
                        {warn}
                      </span>
                    )}{' '}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    {' '}
                    {exc > 0 && (
                      <span
                        style={{
                          fontSize: 12,
                          color: '#ef4444',
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontWeight: 700,
                        }}
                      >
                        {' '}
                        {exc}⚠
                      </span>
                    )}{' '}
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
