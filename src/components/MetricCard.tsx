import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent: string;
}

export default function MetricCard({ label, value, sub, accent }: MetricCardProps) {
  return (
    <div className="p-5 rounded-[10px] bg-white border border-[#C5DED9] relative overflow-hidden shadow-sm">
      <div
        className="absolute top-0 left-0 w-[3px] h-full rounded-l-[10px]"
        style={{ background: accent }}
      />
      <div className="text-[11px] text-[#6B9E97] mb-1.5 font-sans font-medium"> {label} </div>
      <div className="text-[28px] font-bold text-bidv-green font-mono leading-none"> {value} </div>
      {sub && <div className="text-[11px] text-[#94B5B0] mt-1 font-sans"> {sub} </div>}{' '}
    </div>
  );
}
