import React from 'react';

interface SLABarProps {
  actual: number | null;
  sla: number;
}

export default function SLABar({ actual, sla }: SLABarProps) {
  if (actual === null) {
    return <div className="h-1 bg-bidv-green-tint rounded-[2px] flex-1" />;
  }

  const pct = Math.min((actual / sla) * 100, 100);
  const overflow = actual > sla;
  const warn = actual / sla >= 0.8;
  const colorClass = overflow ? 'bg-red-500' : warn ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="h-1 bg-bidv-green-tint rounded-[2px] relative overflow-hidden flex-1">
      <div
        className={'h-full ' + colorClass + ' transition-all duration-700 ease-out'}
        style={{
          width: pct + '%',
        }}
      />
    </div>
  );
}
