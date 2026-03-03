import React from 'react';
import SLAConfigPanel from '../components/SLAConfigPanel';

export default function ConfigTab({SLA_STEPS, TOTAL_INTERNAL_HOURS}) {
    return (<div>
        <div className="mb-6">
            <div className="text-xl font-bold text-bidv-green mb-1">
                Cấu hình SLA
            </div>
            <div className="text-xs text-gray-500">
                Quy định tạm thời · Áp dụng cho cấp tín dụng có TSBĐ (ngoại trừ cầm cố GTCG)
            </div>
        </div>

        <SLAConfigPanel SLA_STEPS={SLA_STEPS}
            TOTAL_INTERNAL_HOURS={TOTAL_INTERNAL_HOURS}/>
    </div>);
}
