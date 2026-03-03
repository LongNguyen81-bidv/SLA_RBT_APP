import React from 'react';
import StepCard from './StepCard';

export default function LoanDetailPanel({loan, progress, SLA_STEPS, TOTAL_INTERNAL_HOURS}) {
    const nextIncomplete = progress.findIndex((p) => !p.completed);

    return (<div> {/* Loan header info */}
        <div className="mb-4">
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-lg font-bold text-bidv-green mb-0.5 font-sans"> {
                        loan.customer
                    } </div>
                    <div className="text-xs text-[#6B9E97] font-sans"> {
                        loan.id
                    }
                        · {
                        loan.type
                    }
                        · {
                        loan.amount
                    }
                        · {
                        loan.branch
                    } </div>
                </div>
                <div className="text-right">
                    <div className="text-[11px] text-[#94B5B0] font-mono">
                        CB phụ trách
                    </div>
                    <div className="text-[13px] text-bidv-green-mid font-semibold font-sans"> {
                        loan.officer
                    } </div>
                </div>
            </div>
        </div>

        {/* Internal steps */}
        <div className="text-[11px] text-[#6B9E97] font-mono font-semibold mb-2.5 tracking-wider">
            I. CÁC BƯỚC NỘI BỘ NGÂN HÀNG · Tổng SLA: {TOTAL_INTERNAL_HOURS}h
        </div>
        <div className="flex flex-col gap-1.5 mb-5"> {
            SLA_STEPS.filter((s) => s.internal).map((step) => {
                const prog = progress[step.id - 1];
                const isActive = step.id - 1 === nextIncomplete;
                return (<StepCard key={
                        step.id
                    }
                    step={step}
                    progress={prog}
                    isActive={isActive}/>);
            })
        } </div>

        {/* External steps */}
        <div className="text-[11px] text-[#6B9E97] font-mono font-semibold mb-2.5 tracking-wider">
            II. CÁC BƯỚC NGOÀI NGÂN HÀNG (*) · Thời gian tham chiếu
        </div>
        <div className="flex flex-col gap-1.5"> {
            SLA_STEPS.filter((s) => !s.internal).map((step) => {
                const prog = progress[step.id - 1];
                return (<StepCard key={
                        step.id
                    }
                    step={step}
                    progress={prog}
                    isActive={false}/>);
            })
        } </div>

        {/* Footnote */}
        <div className="mt-4 p-3 rounded-lg bg-[#FFFBEE] border border-bidv-gold-light text-[11px] text-bidv-gold-dark font-sans shadow-sm">
            (*) Bước 9 (Định giá TSBĐ) và Bước 10 (Đăng ký GDBĐ): SLA chỉ là thời gian tham chiếu.
                    Chi nhánh được chủ động điều chỉnh tùy tính chất TSBĐ và điều kiện thực tế.
        </div>
    </div>);
}
