import React from 'react';
import LoanCardComp from '../components/LoanCardComp';
import LoanDetailPanel from '../components/LoanDetailPanel';

export default function LoansTab({
  loans,
  allProgress,
  SLA_STEPS,
  TOTAL_INTERNAL_HOURS,
  selectedLoan,
  setSelectedLoan,
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: 20,
      }}
    >
      {' '}
      {/* Left: loan list */}
      <div>
        <div
          style={{
            fontSize: 11,
            color: '#475569',
            fontFamily: "'IBM Plex Mono', monospace",
            fontWeight: 600,
            marginBottom: 12,
            letterSpacing: '0.05em',
          }}
        >
          HỒ SƠ ({loans.length})
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {' '}
          {loans.map((loan, i) => (
            <LoanCardComp
              key={loan.id}
              loan={loan}
              progress={allProgress[i]}
              onClick={() => setSelectedLoan(i)}
              selected={selectedLoan === i}
            />
          ))}{' '}
        </div>
      </div>
      {/* Right: loan detail */}
      <LoanDetailPanel
        loan={loans[selectedLoan]}
        progress={allProgress[selectedLoan]}
        SLA_STEPS={SLA_STEPS}
        TOTAL_INTERNAL_HOURS={TOTAL_INTERNAL_HOURS}
      />
    </div>
  );
}
