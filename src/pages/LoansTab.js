import React from 'react';
import LoanCardComp from '../components/LoanCardComp';
import LoanDetailPanel from '../components/LoanDetailPanel';

export default function LoansTab({
    loans,
    allProgress,
    SLA_STEPS,
    TOTAL_INTERNAL_HOURS,
    selectedLoan,
    setSelectedLoan
}) {
    return (<div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] md:grid-cols-[280px_1fr] gap-6"> {/* Left: loan list */}
        <div>
            <div className="text-[11px] text-slate-600 font-mono font-semibold mb-3 tracking-wider">
                HỒ SƠ ({
                loans.length
            })
            </div>
            <div className="flex flex-col gap-2"> {
                loans.map((loan, i) => (<LoanCardComp key={
                        loan.id
                    }
                    loan={loan}
                    progress={
                        allProgress[i]
                    }
                    onClick={
                        () => setSelectedLoan(i)
                    }
                    selected={
                        selectedLoan === i
                    }/>))
            } </div>
        </div>

        {/* Right: loan detail */}
        <LoanDetailPanel loan={
                loans[selectedLoan]
            }
            progress={
                allProgress[selectedLoan]
            }
            SLA_STEPS={SLA_STEPS}
            TOTAL_INTERNAL_HOURS={TOTAL_INTERNAL_HOURS}/>
    </div>);
}
