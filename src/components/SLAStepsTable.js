import React from 'react';
import { getSLAStatus } from '../utils/helpers';

export default function SLAStepsTable({ SLA_STEPS, allProgress }) {
  return (
    <div>
      <div className="text-[13px] font-semibold text-[#6B9E97] mb-3 font-mono">
        TỔNG HỢP THEO BƯỚC
      </div>
      <div className="bg-white border border-[#C5DED9] rounded-[10px] overflow-hidden shadow-[0_1px_3px_rgba(0,77,64,0.06)] overflow-x-auto">
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-bidv-green-tint bg-bidv-green-surface">
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
                  className="px-3.5 py-2.5 text-left text-[10px] text-[#6B9E97] font-mono font-semibold tracking-wider"
                >
                  {' '}
                  {h}{' '}
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
                <tr
                  key={step.id}
                  className="border-b border-[#E8F5F3] hover:bg-surface-50 transition-colors"
                >
                  <td className="px-3.5 py-2.5">
                    <span className="font-mono text-[11px] text-[#6B9E97]"> {step.code} </span>
                  </td>
                  <td className="px-3.5 py-2.5 text-xs text-[#1a3329] font-sans">
                    {' '}
                    {step.name}
                    {!step.internal && (
                      <span className="ml-1.5 text-[9px] text-bidv-gold font-mono inline-block">
                        NGOÀI NH
                      </span>
                    )}{' '}
                  </td>
                  <td className="px-3.5 py-2.5 text-[11px] text-[#6B9E97] font-sans">
                    {' '}
                    {step.owner}{' '}
                  </td>
                  <td className="px-3.5 py-2.5 font-mono text-xs text-bidv-green font-semibold">
                    {' '}
                    {step.slaHours}h
                  </td>
                  <td className="px-3.5 py-2.5">
                    {' '}
                    {ok > 0 && (
                      <span className="text-xs text-emerald-800 font-mono font-semibold">
                        {' '}
                        {ok}{' '}
                      </span>
                    )}{' '}
                  </td>
                  <td className="px-3.5 py-2.5">
                    {' '}
                    {warn > 0 && (
                      <span className="text-xs text-amber-800 font-mono font-semibold">
                        {' '}
                        {warn}{' '}
                      </span>
                    )}{' '}
                  </td>
                  <td className="px-3.5 py-2.5">
                    {' '}
                    {exc > 0 && (
                      <span className="text-xs text-red-800 font-mono font-bold"> {exc}⚠</span>
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
