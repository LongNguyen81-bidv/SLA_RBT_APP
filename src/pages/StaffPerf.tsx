import React from 'react';
import StatusBadge from '../components/StatusBadge';
import { formatNumber } from '../utils/helpers';
import type { StaffPerf as StaffPerfType, SLAStatus } from '../types';

interface StaffPerfProps {
  STAFF_PERF: StaffPerfType[];
}

export default function StaffPerf({ STAFF_PERF }: StaffPerfProps) {
  return (
    <div>
      <div className="mb-6">
        <div className="text-xl font-bold text-bidv-green mb-1 font-sans">Hiệu suất Cán bộ</div>
        <div className="text-xs text-[#6B9E97] font-sans">
          Tháng 3/2025 · Đo lường dựa trên SLA từng bước
        </div>
      </div>

      <div className="bg-white border border-[#C5DED9] rounded-[10px] shadow-sm overflow-x-auto">
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-bidv-green-tint bg-bidv-green-surface">
              {' '}
              {[
                'Cán bộ',
                'Vai trò',
                'Đơn vị',
                'Số hồ sơ',
                'TG TB (h)',
                'Bước vượt SLA',
                'Hiệu suất',
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[10px] text-[#6B9E97] font-mono font-semibold tracking-wider"
                >
                  {' '}
                  {h}{' '}
                </th>
              ))}{' '}
            </tr>
          </thead>
          <tbody>
            {' '}
            {STAFF_PERF.map((s, i) => {
              const perf =
                s.exceeded === 0
                  ? 'Xuất sắc'
                  : s.exceeded <= 1
                    ? 'Tốt'
                    : s.exceeded <= 2
                      ? 'Trung bình'
                      : 'Cần cải thiện';
              const badgeStatus: SLAStatus =
                s.exceeded === 0
                  ? 'ok'
                  : s.exceeded <= 1
                    ? 'ok'
                    : s.exceeded <= 2
                      ? 'warning'
                      : 'exceeded';
              return (
                <tr
                  key={i}
                  className="border-b border-[#E8F5F3] hover:bg-surface-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="text-[13px] font-semibold text-[#1a3329] font-sans">
                      {' '}
                      {s.name}{' '}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#6B9E97] font-sans"> {s.role} </td>
                  <td className="px-4 py-3 text-[11px] text-[#94B5B0] font-sans"> {s.dept} </td>
                  <td className="px-4 py-3 font-mono text-xs text-bidv-green font-semibold">
                    {' '}
                    {formatNumber(s.loans)}{' '}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-mono text-xs ${
                        s.avgHours > 3
                          ? 'text-amber-800 font-semibold'
                          : 'text-[#6B9E97] font-normal'
                      }`}
                    >
                      {' '}
                      {s.avgHours}h
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {' '}
                    {s.exceeded > 0 ? (
                      <span className="text-xs text-red-800 font-mono font-semibold">
                        {' '}
                        {s.exceeded}
                        bước
                      </span>
                    ) : (
                      <span className="text-xs text-emerald-800 font-mono font-normal">
                        Không có
                      </span>
                    )}{' '}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={badgeStatus} label={perf} />
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
