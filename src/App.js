import {useState, useMemo} from 'react';
import { Routes, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Dashboard from './pages/Dashboard';
import LoansTab from './pages/LoansTab';
import StaffPerf from './pages/StaffPerf';
import ConfigTab from './pages/ConfigTab';
import NotFound from './pages/NotFound';
import {
    SLA_STEPS,
    TOTAL_INTERNAL_HOURS,
    MOCK_LOANS,
    MOCK_PROGRESS,
    STAFF_PERF
} from './constants/mockData';
import {getSLAStatus} from './utils/helpers';

export default function App() {
    const [selectedLoan, setSelectedLoan] = useState(0);

    const loans = MOCK_LOANS;
    const allProgress = MOCK_PROGRESS;

    const totalExceeded = useMemo(() => allProgress.flatMap((prog, li) => prog.filter((p, i) => p.actualHours && getSLAStatus(p.actualHours, SLA_STEPS[i].slaHours) === 'exceeded')).length, [allProgress]);

    const totalActive = useMemo(() => loans.filter((_, i) => allProgress[i].some((p) => !p.completed)).length, [loans, allProgress]);

    const avgCompletion = useMemo(() => {
        if (loans.length === 0) 
            return 0;
        
        return(Math.round((allProgress.reduce((sum, prog) => sum + prog.filter((p) => p.completed).length, 0) / loans.length) * 10) / 10);
    }, [loans, allProgress]);

    return (
        <div className="min-h-screen bg-surface-100 text-[#1a3329] font-sans">
            <AppHeader />

            <div className="px-4 sm:px-6 md:px-8 py-6 max-w-[1400px] mx-auto">
                <Routes>
                    <Route path="/" element={
                        <Dashboard loans={loans}
                            allProgress={allProgress}
                            SLA_STEPS={SLA_STEPS}
                            totalActive={totalActive}
                            totalExceeded={totalExceeded}
                            avgCompletion={avgCompletion}
                            setSelectedLoan={setSelectedLoan}/>
                    } />
                    <Route path="/loans" element={
                        <LoansTab loans={loans}
                            allProgress={allProgress}
                            SLA_STEPS={SLA_STEPS}
                            TOTAL_INTERNAL_HOURS={TOTAL_INTERNAL_HOURS}
                            selectedLoan={selectedLoan}
                            setSelectedLoan={setSelectedLoan}/>
                    } />
                    <Route path="/loans/:id" element={
                        <LoansTab loans={loans}
                            allProgress={allProgress}
                            SLA_STEPS={SLA_STEPS}
                            TOTAL_INTERNAL_HOURS={TOTAL_INTERNAL_HOURS}
                            selectedLoan={selectedLoan}
                            setSelectedLoan={setSelectedLoan}/>
                    } />
                    <Route path="/staff" element={<StaffPerf STAFF_PERF={STAFF_PERF}/>} />
                    <Route path="/config" element={<ConfigTab SLA_STEPS={SLA_STEPS} TOTAL_INTERNAL_HOURS={TOTAL_INTERNAL_HOURS} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}
