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
    <div className="px-4 py-3 border-b border-[#E8F5F3] flex justify-between items-center bg-white hover:bg-surface-50 transition-colors">
      <div>
        <div className="text-xs text-[#1a3329] mb-0.5 font-sans">
          {' '}
          {step.code}· {step.name}{' '}
        </div>
        <div className="text-[10px] text-[#94B5B0] font-sans"> {step.owner}</div>
      </div>
      <div className="text-right">
        <div
          className={`font-mono text-sm font-semibold ${
            external ? 'text-bidv-gold' : 'text-bidv-green'
          }`}
        >
          {' '}
          {external ? '~' : ''}
          {step.slaHours}h
        </div>
        <div
          className={`text-[9px] font-mono mt-0.5 ${
            external
              ? 'text-[#94B5B0]'
              : step.system === 'RLOS'
                ? 'text-bidv-green-mid'
                : 'text-[#94B5B0]'
          }`}
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {' '}
      {/* Internal */}
      <div>
        <div className="text-xs font-semibold text-bidv-green mb-3 font-mono tracking-wider">
          PHẦN I · NỘI BỘ NGÂN HÀNG
        </div>
        <div className="bg-white border border-[#C5DED9] rounded-[10px] overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 border-b border-bidv-green-tint flex justify-between text-[11px] text-[#6B9E97] bg-bidv-green-surface font-sans">
            <span>Tổng SLA nội bộ</span>
            <span className="font-mono text-bidv-green font-bold"> {TOTAL_INTERNAL_HOURS}h</span>
          </div>
          {internalSteps.map((step) => (
            <SLAStepRowItem key={step.id} step={step} external={false} />
          ))}{' '}
        </div>
      </div>
      {/* External + notes */}
      <div>
        <div className="text-xs font-semibold text-bidv-gold mb-3 font-mono tracking-wider">
          PHẦN II · NGOÀI NGÂN HÀNG (*)
        </div>
        <div className="bg-white border border-[#C5DED9] rounded-[10px] overflow-hidden mb-4 shadow-sm">
          {' '}
          {externalSteps.map((step) => (
            <SLAStepRowItem key={step.id} step={step} external={true} />
          ))}{' '}
        </div>

        {/* Notes */}
        <div className="bg-[#FFFBEE] border border-bidv-gold-light rounded-[10px] p-4 shadow-sm">
          <div className="text-[11px] font-semibold text-bidv-gold-dark mb-2.5 font-mono">
            LƯU Ý QUẢN LÝ SLA
          </div>
          {NOTES.map((n) => (
            <div
              key={n.icon}
              className="flex gap-2.5 mb-2 text-xs text-amber-800 items-start font-sans leading-relaxed"
            >
              <span className="text-bidv-gold font-mono shrink-0 font-bold text-sm">
                {' '}
                {n.icon}{' '}
              </span>
              <span className="text-amber-900"> {n.text}</span>
            </div>
          ))}{' '}
        </div>
      </div>
    </div>
  );
}
