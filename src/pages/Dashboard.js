import React from 'react';
import MetricCard from '../components/MetricCard';
import LoanCardComp from '../components/LoanCardComp';
import SLAStepsTable from '../components/SLAStepsTable';

export default function Dashboard({
  loans,
  allProgress,
  SLA_STEPS,
  totalActive,
  totalExceeded,
  avgCompletion,
  setSelectedLoan,
  setActiveTab,
}) {
  return (
    <div>
      {' '}
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#f1f5f9',
            marginBottom: 4,
          }}
        >
          Tổng quan SLA hôm nay
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#475569',
          }}
        >
          Cập nhật lúc {new Date().toLocaleTimeString('vi-VN')}· {loans.length}
          hồ sơ đang xử lý
        </div>
      </div>
      {/* Metric cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 28,
        }}
      >
        <MetricCard
          label="Hồ sơ đang xử lý"
          value={totalActive}
          sub="trong tổng số 4 hồ sơ"
          accent="#3b82f6"
        />
        <MetricCard
          label="Bước vượt SLA"
          value={totalExceeded}
          sub="cần xử lý ngay"
          accent="#ef4444"
        />
        <MetricCard
          label="Bước TB hoàn thành"
          value={`${avgCompletion}/10`}
          sub="trên tổng 10 bước"
          accent="#22c55e"
        />
        <MetricCard
          label="Tổng SLA nội bộ"
          value="13.6h"
          sub="8 bước trên RLOS & thủ công"
          accent="#f59e0b"
        />
      </div>
      {/* Loan grid */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#94a3b8',
          marginBottom: 12,
          fontFamily: "'IBM Plex Mono', monospace",
        }}
      >
        HỒ SƠ ĐANG XỬ LÝ
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12,
          marginBottom: 32,
        }}
      >
        {' '}
        {loans.map((loan, i) => (
          <LoanCardComp
            key={loan.id}
            loan={loan}
            progress={allProgress[i]}
            onClick={() => {
              setSelectedLoan(i);
              setActiveTab('loans');
            }}
            selected={false}
          />
        ))}{' '}
      </div>
      {/* SLA Steps summary table */}
      <SLAStepsTable SLA_STEPS={SLA_STEPS} allProgress={allProgress} />
    </div>
  );
}
