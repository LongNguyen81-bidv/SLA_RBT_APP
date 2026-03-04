import React from 'react';
import SLAConfigPanel from '../components/SLAConfigPanel';
import WorkingHoursConfig from '../components/WorkingHoursConfig';
import HolidaysConfig from '../components/HolidaysConfig';

export default function ConfigTab({SLA_STEPS, TOTAL_INTERNAL_HOURS}) {
    return (<div>
        <div className="mb-6">
            <div className="text-xl font-bold text-bidv-green mb-1">Cấu hình hệ thống</div>
            <div className="text-xs text-gray-500">
                Quản lý giờ làm việc, ngày nghỉ lễ và cấu hình SLA
            </div>
        </div>

        {/* Business Config Section */}
        <div className="mb-8">
            <div className="text-xs font-semibold text-bidv-green mb-3 font-mono tracking-wider uppercase">
                ⚙️ CẤU HÌNH GIỜ LÀM VIỆC & NGÀY NGHỈ
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <WorkingHoursConfig/>
                <HolidaysConfig/>
            </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E8F5F3] my-6"/> {/* Existing SLA Config Section */}
        <div className="mb-6">
            <div className="text-xl font-bold text-bidv-green mb-1">Cấu hình SLA</div>
            <div className="text-xs text-gray-500">
                Quy định tạm thời · Áp dụng cho cấp tín dụng có TSBĐ (ngoại trừ cầm cố GTCG)
            </div>
        </div>

        <SLAConfigPanel SLA_STEPS={SLA_STEPS}
            TOTAL_INTERNAL_HOURS={TOTAL_INTERNAL_HOURS}/>
    </div>);
}
