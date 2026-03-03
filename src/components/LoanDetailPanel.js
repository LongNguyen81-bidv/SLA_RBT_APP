import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import StepCard from './StepCard';
import { useAuth } from '../context/AuthContext';
import { loansApi } from '../services/api';

export default function LoanDetailPanel({ loan, progress, SLA_STEPS, TOTAL_INTERNAL_HOURS }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Find the exact active step index based on the loan's currentStepId
  const activeStepIndex = SLA_STEPS.findIndex((s) => s.id === loan.currentStepId);

  const mutation = useMutation({
    mutationFn: ({ loanId, stepId, actionType }) =>
      loansApi.completeStep(loanId, stepId, actionType),
    onSuccess: () => {
      // Refresh loans data
      queryClient.invalidateQueries({
        queryKey: ['loans', user?.id],
      });
    },
    onError: (error) => {
      alert(`Lỗi: ${error.message}`);
    },
  });

  const handleAction = (stepId, actionType) => {
    if (
      window.confirm(
        `Xác nhận ${actionType === 'FORWARD' ? 'Hoàn thành và Bàn giao' : 'Trả lại'} bộ hồ sơ này?`
      )
    ) {
      mutation.mutate({ loanId: loan.id, stepId, actionType });
    }
  };

  return (
    <div>
      {' '}
      {/* Loan header info */}
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-lg font-bold text-bidv-green mb-0.5 font-sans">
              {' '}
              {loan.customer}{' '}
            </div>
            <div className="text-xs text-[#6B9E97] font-sans">
              {' '}
              {loan.id}· {loan.type}· {loan.amount}· {loan.branch}{' '}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-[#94B5B0] font-mono">Trạng thái hiện tại</div>
            <div
              className={`text-[13px] font-semibold font-sans mt-0.5 ${
                loan.currentStepId ? 'text-orange-600' : 'text-green-600'
              }`}
            >
              {' '}
              {loan.currentStepId
                ? `Đang xử lý tại ${loan.assignedDept}`
                : 'Hoàn thành toàn bộ'}{' '}
            </div>
          </div>
        </div>
      </div>
      {/* Internal steps */}
      <div className="text-[11px] text-[#6B9E97] font-mono font-semibold mb-2.5 tracking-wider">
        I. CÁC BƯỚC NỘI BỘ NGÂN HÀNG · Tổng SLA: {TOTAL_INTERNAL_HOURS}h
      </div>
      <div className="flex flex-col gap-1.5 mb-5 relative">
        {' '}
        {mutation.isPending && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center rounded-lg">
            <div className="w-8 h-8 border-4 border-bidv-green border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {SLA_STEPS.filter((s) => s.internal).map((step) => {
          const prog = progress[step.id - 1];
          const isActive = step.id - 1 === activeStepIndex;
          const hasPermission =
            isActive && (user?.role === 'ADMIN' || user?.dept === loan.assignedDept);

          return (
            <div key={step.id} className="relative group">
              <StepCard step={step} progress={prog} isActive={isActive} />{' '}
              {/* Handover Actions Array */}
              {hasPermission && (
                <div className="absolute top-1/2 -translate-y-1/2 right-4 flex gap-2">
                  {' '}
                  {step.id > 1 && (
                    <button
                      onClick={() => handleAction(step.id, 'BACKWARD')}
                      className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold rounded shadow-sm border border-red-200 transition-colors"
                    >
                      ← Trả lại
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(step.id, 'FORWARD')}
                    className="px-3 py-1.5 bg-bidv-green text-white hover:bg-bidv-green-light text-xs font-semibold rounded shadow-sm transition-colors"
                  >
                    Hoàn thành & Bàn giao →
                  </button>
                </div>
              )}{' '}
            </div>
          );
        })}{' '}
      </div>
      {/* External steps */}
      <div className="text-[11px] text-[#6B9E97] font-mono font-semibold mb-2.5 tracking-wider">
        II. CÁC BƯỚC NGOÀI NGÂN HÀNG (*)
      </div>
      <div className="flex flex-col gap-1.5">
        {' '}
        {SLA_STEPS.filter((s) => !s.internal).map((step) => {
          const prog = progress[step.id - 1];
          const isActive = step.id - 1 === activeStepIndex;
          const hasPermission =
            isActive && (user?.role === 'ADMIN' || user?.dept === loan.assignedDept);

          return (
            <div key={step.id} className="relative group">
              <StepCard step={step} progress={prog} isActive={isActive} />{' '}
              {hasPermission && (
                <div className="absolute top-1/2 -translate-y-1/2 right-4 flex gap-2">
                  {' '}
                  {step.id > 1 && (
                    <button
                      onClick={() => handleAction(step.id, 'BACKWARD')}
                      className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold rounded shadow-sm border border-red-200 transition-colors"
                    >
                      ← Trả lại
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(step.id, 'FORWARD')}
                    className="px-3 py-1.5 border border-bidv-green text-bidv-green hover:bg-bidv-green hover:text-white text-xs font-semibold rounded shadow-sm transition-colors"
                  >
                    Xác nhận kết quả & Đi tiếp
                  </button>
                </div>
              )}{' '}
            </div>
          );
        })}{' '}
      </div>
      {/* Footnote */}
      <div className="mt-4 p-3 rounded-lg bg-[#FFFBEE] border border-bidv-gold-light text-[11px] text-bidv-gold-dark font-sans shadow-sm">
        (*) SLA các bước ngoài ngân hàng chỉ là thời gian tham chiếu. Chi nhánh được chủ động điều
        chỉnh tùy tính chất TSBĐ và điều kiện thực tế.
      </div>
    </div>
  );
}
