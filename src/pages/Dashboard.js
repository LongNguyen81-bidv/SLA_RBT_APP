import React from 'react';
import {useNavigate} from 'react-router-dom';
import MetricCard from '../components/MetricCard';
import LoanCardComp from '../components/LoanCardComp';
import SLAStepsTable from '../components/SLAStepsTable';
import {useAuth} from '../context/AuthContext';
import {useConfig} from '../context/ConfigContext';

export default function Dashboard({
    loans,
    allProgress,
    SLA_STEPS,
    totalActive,
    totalExceeded,
    avgCompletion,
    setSelectedLoan
}) {
    const navigate = useNavigate();
    const {user} = useAuth();
    const {config} = useConfig();

    const workHoursPerDay = config.endHour - config.startHour -(config.lunchBreakEnabled ? (config.lunchBreak.end - config.lunchBreak.start) : 0);

    return (<div> {/* Header */}
        <div className="mb-6">
            <div className="text-xl font-bold text-bidv-green mb-1 font-sans">
                Xin chào, {
                user ?. name
            } </div>
            <div className="text-sm font-semibold text-bidv-gold-dark mb-1 font-sans">
                Vai trò: {
                user ?. role === 'ADMIN' ? 'Quản lý Nội bộ (Admin)' : `Cán bộ ${
                    user ?. dept
                }`
            } </div>
            <div className="text-xs text-[#6B9E97] font-sans mt-2">
                Cập nhật lúc {
                new Date().toLocaleTimeString('vi-VN')
            }
                · {
                loans.length
            }
                hồ sơ liên quan
            </div>
        </div>

        {/* Business config summary banner */}
        <div className="mb-5 px-4 py-2.5 bg-[#F0FAF8] border border-[#D5EBE7] rounded-lg flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-[11px] text-[#6B9E97] font-mono">
                <span>⏱</span>
                <span>
                    Giờ làm việc:
                    <span className="font-semibold text-bidv-green"> {
                        String(Math.floor(config.startHour)).padStart(2, '0')
                    }:00 → {
                        String(Math.floor(config.endHour)).padStart(2, '0')
                    }:00</span>
                    {
                    config.lunchBreakEnabled && (<>
                        · Nghỉ trưa:
                        <span className="font-semibold text-bidv-gold-dark"> {
                            Math.floor(config.lunchBreak.start)
                        }:00 → {
                            Math.floor(config.lunchBreak.end)
                        }:00</span>
                    </>)
                }
                    {' · '}
                    <span className="font-semibold"> {workHoursPerDay}h</span>/ngày {' · '}
                    <span className="font-semibold"> {
                        config.workDays.length
                    }</span>
                    ngày/tuần {' · '}
                    <span className="font-semibold"> {
                        config.holidays.length
                    }</span>
                    ngày lễ
                </span>
            </div>
            {
            user ?. role === 'ADMIN' && (<button onClick={
                    () => navigate('/config')
                }
                className="text-[10px] text-bidv-green font-semibold font-mono hover:underline">
                Cấu hình →
            </button>)
        } </div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            <MetricCard label="Hồ sơ đang xử lý"
                value={totalActive}
                sub={
                    `trong tổng số ${
                        loans.length
                    } hồ sơ`
                }
                accent="#004D40"/>
            <MetricCard label="Bước vượt SLA"
                value={totalExceeded}
                sub="cần xử lý ngay"
                accent="#EF4444"/>
            <MetricCard label="Bước TB hoàn thành"
                value={
                    `${avgCompletion}/10`
                }
                sub="trên tổng 10 bước"
                accent="#10B981"/>
            <MetricCard label="Giờ LV hiệu lực"
                value={
                    `${workHoursPerDay}h`
                }
                sub={
                    `${
                        config.workDays.length
                    } ngày/tuần · ${
                        config.holidays.length
                    } ngày lễ`
                }
                accent="#C9A84C"/>
        </div>

        {/* Loan grid */}
        <div className="text-[13px] font-semibold text-[#6B9E97] mb-3 font-mono tracking-wider">
            HỒ SƠ ĐANG XỬ LÝ
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8"> {
            loans.map((loan, i) => (<LoanCardComp key={
                    loan.id
                }
                loan={loan}
                progress={
                    allProgress[i]
                }
                onClick={
                    () => {
                        setSelectedLoan(i);
                        navigate('/loans');
                    }
                }
                selected={false}/>))
        } </div>

        {/* SLA Steps summary table */}
        <SLAStepsTable SLA_STEPS={SLA_STEPS}
            allProgress={allProgress}/>
    </div>);
}
