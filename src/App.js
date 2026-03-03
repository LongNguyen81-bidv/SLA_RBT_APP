import { useState, useMemo } from 'react';
import AppHeader from './components/AppHeader';
import Dashboard from './pages/Dashboard';
import LoansTab from './pages/LoansTab';
import StaffPerf from './pages/StaffPerf';
import ConfigTab from './pages/ConfigTab';
import {
  SLA_STEPS,
  TOTAL_INTERNAL_HOURS,
  MOCK_LOANS,
  MOCK_PROGRESS,
  STAFF_PERF,
} from './constants/mockData';
import { getSLAStatus } from './utils/helpers';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLoan, setSelectedLoan] = useState(0);

  const loans = MOCK_LOANS;
  const allProgress = MOCK_PROGRESS;

  const totalExceeded = useMemo(
    () =>
      allProgress.flatMap((prog, li) =>
        prog.filter(
          (p, i) =>
            p.actualHours && getSLAStatus(p.actualHours, SLA_STEPS[i].slaHours) === 'exceeded'
        )
      ).length,
    [allProgress]
  );

  const totalActive = useMemo(
    () => loans.filter((_, i) => allProgress[i].some((p) => !p.completed)).length,
    [loans, allProgress]
  );

  const avgCompletion = useMemo(() => {
    if (loans.length === 0) return 0;

    return (
      Math.round(
        (allProgress.reduce((sum, prog) => sum + prog.filter((p) => p.completed).length, 0) /
          loans.length) *
          10
      ) / 10
    );
  }, [loans, allProgress]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#030712',
        color: '#e2e8f0',
        fontFamily: "'Be Vietnam Pro', sans-serif",
      }}
    >
      <AppHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <div
        style={{
          padding: '24px 32px',
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        {' '}
        {activeTab === 'dashboard' && (
          <Dashboard
            loans={loans}
            allProgress={allProgress}
            SLA_STEPS={SLA_STEPS}
            totalActive={totalActive}
            totalExceeded={totalExceeded}
            avgCompletion={avgCompletion}
            setSelectedLoan={setSelectedLoan}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'loans' && (
          <LoansTab
            loans={loans}
            allProgress={allProgress}
            SLA_STEPS={SLA_STEPS}
            TOTAL_INTERNAL_HOURS={TOTAL_INTERNAL_HOURS}
            selectedLoan={selectedLoan}
            setSelectedLoan={setSelectedLoan}
          />
        )}
        {activeTab === 'staff' && <StaffPerf STAFF_PERF={STAFF_PERF} />}
        {activeTab === 'config' && (
          <ConfigTab SLA_STEPS={SLA_STEPS} TOTAL_INTERNAL_HOURS={TOTAL_INTERNAL_HOURS} />
        )}{' '}
      </div>
    </div>
  );
}
