import React from 'react';
import SLAConfigPanel from '../components/SLAConfigPanel';

export default function ConfigTab({ SLA_STEPS, TOTAL_INTERNAL_HOURS }) {
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
          Cấu hình SLA
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#475569',
          }}
        >
          Quy định tạm thời · Áp dụng cho cấp tín dụng có TSBĐ (ngoại trừ cầm cố GTCG)
        </div>
      </div>

      <SLAConfigPanel SLA_STEPS={SLA_STEPS} TOTAL_INTERNAL_HOURS={TOTAL_INTERNAL_HOURS} />
    </div>
  );
}
