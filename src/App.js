import {useState, useMemo} from 'react';
import {Routes, Route} from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Dashboard from './pages/Dashboard';
import LoansTab from './pages/LoansTab';
import StaffPerf from './pages/StaffPerf';
import ConfigTab from './pages/ConfigTab';
import NotFound from './pages/NotFound';
import {TOTAL_INTERNAL_HOURS} from './constants/mockData';
import {getSLAStatus} from './utils/helpers';
import {useLoans} from './hooks/useLoans';
import {useSLAConfig} from './hooks/useSLAConfig';
import {useStaffPerf} from './hooks/useStaffPerf';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import {useAuth} from './context/AuthContext';

export default function App() {
    const {user} = useAuth();
    const [selectedLoan, setSelectedLoan] = useState(0);

    const {data: loansData, isLoading: isLoansLoading, isError: isLoansError} = useLoans(user);
    const {data: SLA_STEPS, isLoading: isConfigLoading, isError: isConfigError} = useSLAConfig();
    const {data: STAFF_PERF, isLoading: isStaffLoading, isError: isStaffError} = useStaffPerf();

    const loans = loansData ?. loans || [];
    const allProgress = loansData ?. allProgress || [];

    const totalExceeded = useMemo(() => allProgress.flatMap((prog, li) => prog.filter((p, i) => p.actualHours && getSLAStatus(p.actualHours, SLA_STEPS ?. [i] ?. slaHours) === 'exceeded')).length, [allProgress, SLA_STEPS]);

    const totalActive = useMemo(() => loans.filter((_, i) => allProgress[i] ?. some((p) => !p.completed)).length, [loans, allProgress]);

    const avgCompletion = useMemo(() => {
        if (loans.length === 0) 
            return 0;
        

        return Math.round((allProgress.reduce((sum, prog) => sum + prog.filter((p) => p.completed).length, 0) / loans.length) * 10) / 10;
    }, [loans, allProgress]);

    const isLoading = isLoansLoading || isConfigLoading || isStaffLoading;
    const isError = isLoansError || isConfigError || isStaffError;

    if (isLoading && user) {
        return (<div className="min-h-screen flex items-center justify-center bg-surface-100">
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-bidv-green border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-bidv-green font-semibold">Ðang t?i d? li?u...</div>
            </div>
        </div>);
    }

    if (isError) {
        return (<div className="min-h-screen flex items-center justify-center bg-surface-100">
            <div className="bg-red-50 text-red-600 p-6 rounded-lg shadow-sm border border-red-200">
                <h3 className="text-lg font-bold mb-2">L?i k?t n?i</h3>
                <p>Không th? t?i d? li?u t? máy ch?. Vui lòng th? l?i sau.</p>
            </div>
        </div>);
    }

    return (<div className="min-h-screen bg-surface-100 text-[#1a3329] font-sans"> {
        user && <AppHeader/>
    }
        <div className="px-4 sm:px-6 md:px-8 py-6 max-w-[1400px] mx-auto">
            <Routes>
                <Route path="/login"
                    element={<Login/>}/>
                <Route path="/"
                    element={
                        <ProtectedRoute><Dashboard loans={loans}
                    allProgress={allProgress}
                    SLA_STEPS={
                        SLA_STEPS || []
                    }
                    totalActive={totalActive}
                    totalExceeded={totalExceeded}
                    avgCompletion={avgCompletion}
                    setSelectedLoan={setSelectedLoan}/>
                    </ProtectedRoute>
                    }/>
                <Route path="/loans"
                    element={
                        <ProtectedRoute><LoansTab loans={loans}
                    allProgress={allProgress}
                    SLA_STEPS={
                        SLA_STEPS || []
                    }
                    TOTAL_INTERNAL_HOURS={TOTAL_INTERNAL_HOURS}
                    selectedLoan={selectedLoan}
                    setSelectedLoan={setSelectedLoan}/>
                    </ProtectedRoute>
                    }/>
                <Route path="/loans/:id"
                    element={
                        <ProtectedRoute><LoansTab loans={loans}
                    allProgress={allProgress}
                    SLA_STEPS={
                        SLA_STEPS || []
                    }
                    TOTAL_INTERNAL_HOURS={TOTAL_INTERNAL_HOURS}
                    selectedLoan={selectedLoan}
                    setSelectedLoan={setSelectedLoan}/>
                    </ProtectedRoute>
                    }/>
                <Route path="/staff"
                    element={
                        <ProtectedRoute
                    requiredRole="ADMIN">
                        <StaffPerf
STAFF_PERF={
STAFF_PERF || []}/>
                    </ProtectedRoute>
                    }/>
                <Route path="/config"
                    element={
                        <ProtectedRoute
                    requiredRole="ADMIN">
                        <ConfigTab
SLA_STEPS={
SLA_STEPS || []}
                    TOTAL_INTERNAL_HOURS={TOTAL_INTERNAL_HOURS}/>
                    </ProtectedRoute>
                    }/>
                <Route path="*"
                    element={<NotFound/>}/>
            </Routes>
        </div>
    </div>);
}

