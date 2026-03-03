import React from 'react';
import StepCard from './StepCard';

export default function LoanDetailPanel({ loan, progress, SLA_STEPS, TOTAL_INTERNAL_HOURS }) {
  const nextIncomplete = progress.findIndex((p) => !p.completed);

  return (
    <div>
      {' '}
      {/* Loan header info */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#f1f5f9',
                marginBottom: 2,
              }}
            >
              {' '}
              {loan.customer}{' '}
            </div>
            <div
              style={{
                fontSize: 12,
                color: '#64748b',
              }}
            >
              {' '}
              {loan.id}· {loan.type}· {loan.amount}· {loan.branch}{' '}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontSize: 11,
                color: '#475569',
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              CB phụ trách
            </div>
            <div
              style={{
                fontSize: 13,
                color: '#94a3b8',
              }}
            >
              {' '}
              {loan.officer}
            </div>
          </div>
        </div>
      </div>
      {/* Internal steps */}
      <div
        style={{
          fontSize: 11,
          color: '#475569',
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 600,
          marginBottom: 10,
          letterSpacing: '0.05em',
        }}
      >
        I. CÁC BƯỚC NỘI BỘ NGÂN HÀNG · Tổng SLA: {TOTAL_INTERNAL_HOURS}h
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          marginBottom: 20,
        }}
      >
        {' '}
        {SLA_STEPS.filter((s) => s.internal).map((step) => {
          const prog = progress[step.id - 1];
          const isActive = step.id - 1 === nextIncomplete;
          return <StepCard key={step.id} step={step} progress={prog} isActive={isActive} />;
        })}{' '}
      </div>
      {/* External steps */}
      <div
        style={{
          fontSize: 11,
          color: '#475569',
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 600,
          marginBottom: 10,
          letterSpacing: '0.05em',
        }}
      >
        II. CÁC BƯỚC NGOÀI NGÂN HÀNG (*) · Thời gian tham chiếu
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {' '}
        {SLA_STEPS.filter((s) => !s.internal).map((step) => {
          const prog = progress[step.id - 1];
          return <StepCard key={step.id} step={step} progress={prog} isActive={false} />;
        })}{' '}
      </div>
      {/* Footnote */}
      <div
        style={{
          marginTop: 16,
          padding: '12px 16px',
          borderRadius: 8,
          background: '#0c1a2e',
          border: '1px solid #1e3a5f',
          fontSize: 11,
          color: '#475569',
        }}
      >
        (*) Bước 9 (Định giá TSBĐ) và Bước 10 (Đăng ký GDBĐ): SLA chỉ là thời gian tham chiếu. Chi
        nhánh được chủ động điều chỉnh tùy tính chất TSBĐ và điều kiện thực tế.
      </div>
    </div>
  );
}
