import React from 'react';

const NOTES = [
  {
    icon: '①',
    text: 'Trụ sở chính cài đặt SLA trên RLOS cho 06 bước thực hiện qua hệ thống.',
  },
  {
    icon: '②',
    text: 'Trong thời gian chờ nâng cấp cảnh báo tự động, TSC định kỳ gửi danh sách vượt SLA để Chi nhánh rà soát.',
  },
  {
    icon: '③',
    text: 'Bước ngoài NH: SLA chỉ là tham chiếu. Chi nhánh chủ động điều chỉnh theo tính chất TSBĐ thực tế.',
  },
];

function SLAStepRowItem({ step, external }) {
  return (
    <div
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid #0f172a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <div
          style={{
            fontSize: 12,
            color: '#cbd5e1',
            marginBottom: 2,
          }}
        >
          {' '}
          {step.code}· {step.name}{' '}
        </div>
        <div
          style={{
            fontSize: 10,
            color: '#475569',
          }}
        >
          {' '}
          {step.owner}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 14,
            fontWeight: 600,
            color: external ? '#f59e0b' : '#f1f5f9',
          }}
        >
          {' '}
          {external ? '~' : ''}
          {step.slaHours}h
        </div>
        <div
          style={{
            fontSize: 9,
            color: external ? '#64748b' : step.system === 'RLOS' ? '#818cf8' : '#64748b',
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {' '}
          {external ? 'Tham chiếu' : step.system}{' '}
        </div>
      </div>
    </div>
  );
}

export default function SLAConfigPanel({ SLA_STEPS, TOTAL_INTERNAL_HOURS }) {
  const internalSteps = SLA_STEPS.filter((s) => s.internal);
  const externalSteps = SLA_STEPS.filter((s) => !s.internal);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20,
      }}
    >
      {' '}
      {/* Internal */}
      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#3b82f6',
            marginBottom: 12,
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: '0.05em',
          }}
        >
          PHẦN I · NỘI BỘ NGÂN HÀNG
        </div>
        <div
          style={{
            background: '#080d14',
            border: '1px solid #1e293b',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '10px 16px',
              borderBottom: '1px solid #1e293b',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 11,
              color: '#64748b',
            }}
          >
            <span>Tổng SLA nội bộ</span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: '#60a5fa',
                fontWeight: 600,
              }}
            >
              {' '}
              {TOTAL_INTERNAL_HOURS}h
            </span>
          </div>
          {internalSteps.map((step) => (
            <SLAStepRowItem key={step.id} step={step} external={false} />
          ))}{' '}
        </div>
      </div>
      {/* External + notes */}
      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#f59e0b',
            marginBottom: 12,
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: '0.05em',
          }}
        >
          PHẦN II · NGOÀI NGÂN HÀNG (*)
        </div>
        <div
          style={{
            background: '#080d14',
            border: '1px solid #1e293b',
            borderRadius: 10,
            overflow: 'hidden',
            marginBottom: 16,
          }}
        >
          {' '}
          {externalSteps.map((step) => (
            <SLAStepRowItem key={step.id} step={step} external={true} />
          ))}{' '}
        </div>

        {/* Notes */}
        <div
          style={{
            background: '#080d14',
            border: '1px solid #1e293b',
            borderRadius: 10,
            padding: 16,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#94a3b8',
              marginBottom: 10,
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            LƯU Ý QUẢN LÝ SLA
          </div>
          {NOTES.map((n) => (
            <div
              key={n.icon}
              style={{
                display: 'flex',
                gap: 10,
                marginBottom: 8,
                fontSize: 12,
                color: '#64748b',
              }}
            >
              <span
                style={{
                  color: '#475569',
                  fontFamily: "'IBM Plex Mono', monospace",
                  flexShrink: 0,
                }}
              >
                {' '}
                {n.icon}
              </span>
              <span> {n.text}</span>
            </div>
          ))}{' '}
        </div>
      </div>
    </div>
  );
}
