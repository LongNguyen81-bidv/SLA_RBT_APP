import React from 'react';
import { useNavigate } from 'react-router-dom';
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
}) {
  const navigate = useNavigate();
  return (
    <div>
      {' '}
      {/* Header */}
      <div className="mb-6">
        <div className="text-xl font-bold text-bidv-green mb-1 font-sans">
          Tổng quan SLA hôm nay
        </div>
        <div className="text-xs text-[#6B9E97] font-sans">
          Cập nhật lúc {new Date().toLocaleTimeString('vi-VN')}· {loans.length} hồ sơ đang xử lý
        </div>
      </div>
      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <MetricCard
          label="Hồ sơ đang xử lý"
          value={totalActive}
          sub="trong tổng số 4 hồ sơ"
          accent="#004D40"
        />
        <MetricCard
          label="Bước vượt SLA"
          value={totalExceeded}
          sub="cần xử lý ngay"
          accent="#EF4444"
        />
        <MetricCard
          label="Bước TB hoàn thành"
          value={`${avgCompletion}/10`}
          sub="trên tổng 10 bước"
          accent="#10B981"
        />
        <MetricCard
          label="Tổng SLA nội bộ"
          value="13.6h"
          sub="8 bước trên RLOS & thủ công"
          accent="#C9A84C"
        />
      </div>
      {/* Loan grid */}
      <div className="text-[13px] font-semibold text-[#6B9E97] mb-3 font-mono tracking-wider">
        HỒ SƠ ĐANG XỬ LÝ
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8">
        {' '}
        {loans.map((loan, i) => (
          <LoanCardComp
            key={loan.id}
            loan={loan}
            progress={allProgress[i]}
            onClick={() => {
              setSelectedLoan(i);
              navigate('/loans');
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
