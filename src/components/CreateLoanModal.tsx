import React, {useState} from 'react';
import {useAuth} from '../context/AuthContext';
import type {CreateLoanPayload}
from '../types';

interface CreateLoanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (payload : CreateLoanPayload) => void;
    isLoading?: boolean;
    /** If provided, pre-fill form for editing */
    editData?: {
        id: string;
        customer: string;
        deptCode: string;
        type: string;
        amount: string
    };
}

const LOAN_TYPES = [
    'Cho vay mua nhà',
    'Cho vay sản xuất kinh doanh',
    'Vay tiêu dùng',
    'Cấp tín dụng DN',
    'Cho vay mua ô tô',
    'Thấu chi',
];

export default function CreateLoanModal({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    editData
} : CreateLoanModalProps) {
    const {user} = useAuth();
    const userDeptCode = editData ?. deptCode || user ?. deptCode || '';
    const [customer, setCustomer] = useState(editData ?. customer || '');
    const [type, setType] = useState(editData ?. type || LOAN_TYPES[0]);
    const [amount, setAmount] = useState(editData ?. amount || '');
    const [errors, setErrors] = useState < Record < string,
        string >> ({});

    if (!isOpen) 
        return null;
    


    const validate = () : boolean => {
        const newErrors: Record < string,
            string > = {};
        if (!customer.trim()) 
            newErrors.customer = 'Vui lòng nhập tên khách hàng';
        


        if (!amount || Number(amount) <= 0) 
            newErrors.amount = 'Số tiền phải lớn hơn 0';
        


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        if (! validate()) 
            return;
        


        onSubmit({
            customer: customer.trim(),
            deptCode: userDeptCode,
            type,
            amount: Number(amount.replace(/\./g, '').replace(/,/g, ''))
        });
    };

    const formatInputAmount = (val : string) => {
        const num = val.replace(/\D/g, '');
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden border border-[#C5DED9]">
                {/* Header */}
                <div className="bg-gradient-to-r from-bidv-green to-bidv-green-mid px-6 py-4 flex items-center justify-between">
                    <h2 className="text-white font-bold text-base">
                        {
                        editData ? '✏️ Sửa hồ sơ' : '📋 Khởi tạo hồ sơ mới'
                    } </h2>
                    <button onClick={onClose}
                        className="text-white/80 hover:text-white text-xl leading-none transition-colors"
                        aria-label="Đóng">✕</button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit}
                    className="p-6 space-y-4">
                    {/* Customer name */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Tên khách hàng
                            <span className="text-red-500">*</span>
                        </label>
                        <input type="text"
                            value={customer}
                            onChange={
                                e => {
                                    setCustomer(e.target.value);
                                    setErrors(p => ({
                                        ...p,
                                        customer: ''
                                    }));
                                }
                            }
                            placeholder="VD: Nguyễn Văn A / Cty TNHH ABC"
                            className={
                                `w-full px-3 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-bidv-green/30 ${
                                    errors.customer ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-bidv-green/50'
                                }`
                            }/> {
                        errors.customer && <p className="text-xs text-red-500 mt-1">
                            {
                            errors.customer
                        }</p>
                    } </div>

                    {/* Mã phòng (auto-filled) */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Mã phòng</label>
                        <input type="text"
                            value={userDeptCode}
                            readOnly
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-gray-50 text-slate-500 font-mono cursor-not-allowed"/>
                        <p className="text-[10px] text-gray-400 mt-0.5">Tự động gán theo phòng ban của cán bộ</p>
                    </div>

                    {/* Loan type */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Loại vay</label>
                        <select value={type}
                            onChange={
                                e => setType(e.target.value)
                            }
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-bidv-green/30 hover:border-bidv-green/50">
                            {
                            LOAN_TYPES.map(t => <option key={t}
                                value={t}>
                                {t}</option>)
                        } </select>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Số tiền vay (VND)
                            <span className="text-red-500">*</span>
                        </label>
                        <input type="text"
                            value={amount}
                            onChange={
                                e => {
                                    setAmount(formatInputAmount(e.target.value));
                                    setErrors(p => ({
                                        ...p,
                                        amount: ''
                                    }));
                                }
                            }
                            placeholder="VD: 2.500.000.000"
                            className={
                                `w-full px-3 py-2.5 rounded-lg border text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-bidv-green/30 ${
                                    errors.amount ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-bidv-green/50'
                                }`
                            }/> {
                        errors.amount && <p className="text-xs text-red-500 mt-1">
                            {
                            errors.amount
                        }</p>
                    } </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-slate-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            Hủy
                        </button>
                        <button type="submit"
                            disabled={isLoading}
                            className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-bidv-green to-bidv-green-mid rounded-lg hover:shadow-lg hover:shadow-bidv-green/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            {
                            isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Đang xử lý...
                                </span>
                            ) : editData ? 'Cập nhật' : 'Tạo hồ sơ'
                        } </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
