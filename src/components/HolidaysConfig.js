import React, {useState} from 'react';
import {useConfig} from '../context/ConfigContext';

export default function HolidaysConfig() {
    const {config, setConfig} = useConfig();
    const [newDate, setNewDate] = useState('');
    const [newName, setNewName] = useState('');

    const holidays = config.holidays || [];

    const addHoliday = () => {
        if (!newDate) 
            return;
        

        // Prevent duplicates
        if (holidays.some((h) => h.date === newDate)) 
            return;
        


        const newHoliday = {
            id: Date.now(),
            date: newDate,
            name: newName || 'Ngày nghỉ lễ'
        };
        setConfig((prev) => ({
            ...prev,
            holidays: [
                ...prev.holidays,
                newHoliday
            ].sort(
                (a, b) => a.date.localeCompare(b.date)
            )
        }));
        setNewDate('');
        setNewName('');
    };

    const removeHoliday = (id) => {
        setConfig((prev) => ({
            ...prev,
            holidays: prev.holidays.filter((h) => h.id !== id)
        }));
    };

    const formatDateVN = (dateStr) => {
        const [y, m, d] = dateStr.split('-');
        return `${d}/${m}/${y}`;
    };

    const getDayOfWeek = (dateStr) => {
        const d = new Date(dateStr);
        const days = [
            'CN',
            'T2',
            'T3',
            'T4',
            'T5',
            'T6',
            'T7'
        ];
        return days[d.getDay()];
    };

    // Group holidays by month
    const grouped = holidays.reduce((acc, h) => {
        const month = h.date.substring(0, 7); // YYYY-MM
        if (!acc[month]) 
            acc[month] = [];
        

        acc[month].push(h);
        return acc;
    }, {});

    const monthNames = [
        '',
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];

    return (<div className="bg-white border border-[#C5DED9] rounded-[10px] overflow-hidden shadow-sm"> {/* Header */}
        <div className="px-4 py-3 bg-bidv-green-surface border-b border-bidv-green-tint">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-base">📅</span>
                    <span className="text-xs font-semibold text-bidv-green font-mono tracking-wider">
                        NGÀY NGHỈ LỄ
                    </span>
                </div>
                <span className="text-[10px] font-mono text-[#94B5B0] bg-surface-50 px-2 py-0.5 rounded-full"> {
                    holidays.length
                }
                    ngày
                </span>
            </div>
        </div>

        {/* Add form */}
        <div className="p-4 border-b border-[#E8F5F3] bg-[#FBFEFD]">
            <div className="text-[11px] font-semibold text-[#6B9E97] uppercase tracking-wider mb-2 font-mono">
                Thêm ngày nghỉ
            </div>
            <div className="flex gap-2 items-end flex-wrap">
                <div className="flex-shrink-0">
                    <label className="text-[10px] text-[#94B5B0] font-mono mb-1 block">Ngày</label>
                    <input type="date"
                        value={newDate}
                        onChange={
                            (e) => setNewDate(e.target.value)
                        }
                        className="px-3 py-2 border border-[#C5DED9] rounded-lg text-sm font-mono text-[#1a3329] focus:outline-none focus:ring-2 focus:ring-bidv-green/30 focus:border-bidv-green bg-white transition-all"/>
                </div>
                <div className="flex-1 min-w-[140px]">
                    <label className="text-[10px] text-[#94B5B0] font-mono mb-1 block">Tên dịp lễ</label>
                    <input type="text"
                        value={newName}
                        onChange={
                            (e) => setNewName(e.target.value)
                        }
                        placeholder="Ví dụ: Tết Nguyên Đán"
                        className="w-full px-3 py-2 border border-[#C5DED9] rounded-lg text-sm text-[#1a3329] focus:outline-none focus:ring-2 focus:ring-bidv-green/30 focus:border-bidv-green bg-white transition-all placeholder:text-[#c5ded9]"/>
                </div>
                <button onClick={addHoliday}
                    disabled={
                        !newDate
                    }
                    className={
                        `px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 shadow-sm ${
                            newDate ? 'bg-bidv-green text-white hover:bg-bidv-green/90 active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`
                }>
                    + Thêm
                </button>
            </div>
        </div>

        {/* Holiday list */}
        <div className="max-h-[400px] overflow-y-auto"> {
            Object.entries(grouped).length === 0 ? (<div className="p-6 text-center text-sm text-gray-400 italic">
                Chưa có ngày nghỉ nào được cấu hình
            </div>) : (Object.entries(grouped).map(([month, items]) => {
                const m = parseInt(month.split('-')[1], 10);
                const y = month.split('-')[0];
                return (<div key={month}> {/* Month header */}
                    <div className="px-4 py-1.5 bg-surface-50 text-[10px] font-mono text-[#94B5B0] font-semibold uppercase tracking-wider border-b border-[#E8F5F3]"> {
                        monthNames[m]
                    }
                        {y} </div>
                    {
                    items.map((h) => (<div key={
                            h.id
                        }
                        className="px-4 py-2.5 border-b border-[#E8F5F3] flex justify-between items-center hover:bg-surface-50 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 text-center">
                                <div className="text-xs font-bold text-bidv-green font-mono"> {
                                    h.date.split('-')[2]
                                } </div>
                                <div className="text-[9px] text-[#94B5B0] font-mono"> {
                                    getDayOfWeek(h.date)
                                }</div>
                            </div>
                            <div>
                                <div className="text-xs text-[#1a3329] font-sans font-medium"> {
                                    h.name
                                }</div>
                                <div className="text-[10px] text-[#94B5B0] font-mono"> {
                                    formatDateVN(h.date)
                                }</div>
                            </div>
                        </div>
                        <button onClick={
                                () => removeHoliday(h.id)
                            }
                            className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 hover:bg-red-50 w-7 h-7 rounded-md flex items-center justify-center transition-all duration-200 text-sm"
                            title="Xóa ngày nghỉ">
                            ✕
                        </button>
                    </div>))
                } </div>);
            }))
        } </div>
    </div>);
}
