import React, {useState} from 'react';
import LoanCardComp from '../components/LoanCardComp';
import LoanDetailPanel from '../components/LoanDetailPanel';
import CreateLoanModal from '../components/CreateLoanModal';
import {formatNumber} from '../utils/helpers';
import {useCreateLoan, useUpdateLoan, useDeleteLoan} from '../hooks/useLoanMutations';
import {useAuth} from '../context/AuthContext';
import type {Loan, StepProgress, SLAStep, CreateLoanPayload}
from '../types';

interface LoansTabProps {
    loans: Loan[];
    allProgress: StepProgress[][];
    SLA_STEPS: SLAStep[];
    TOTAL_INTERNAL_HOURS: number;
    selectedLoan: number;
    setSelectedLoan: (index : number) => void;
}

export default function LoansTab({
    loans,
    allProgress,
    SLA_STEPS,
    TOTAL_INTERNAL_HOURS,
    selectedLoan,
    setSelectedLoan
} : LoansTabProps) {
    const {user} = useAuth();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingLoan, setEditingLoan] = useState < Loan | null > (null);

    const createMutation = useCreateLoan();
    const updateMutation = useUpdateLoan();
    const deleteMutation = useDeleteLoan();

    // QHKH users or ADMIN can create loans
    const canCreate = user ?. dept === 'QHKH' || user ?. role === 'ADMIN';

    const handleCreate = async (payload : CreateLoanPayload) => {
        if (!user) 
            return;
        


        await createMutation.mutateAsync({payload, userId: user.id});
        setShowCreateModal(false);
    };

    const handleEdit = async (payload : CreateLoanPayload) => {
        if (!editingLoan) 
            return;
        


        await updateMutation.mutateAsync({id: editingLoan.id, payload});
        setEditingLoan(null);
    };

    const handleDelete = async (loanId : string) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa hồ sơ này? Thao tác không thể hoàn tác.')) 
            return;
        


        await deleteMutation.mutateAsync(loanId);
        if (selectedLoan >= loans.length - 1) 
            setSelectedLoan(Math.max(0, loans.length - 2));
        


    };

    const isOwner = (loan : Loan) => loan.createdBy === user ?. id || user ?. role === 'ADMIN';

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] md:grid-cols-[280px_1fr] gap-6">
            {/* Left: loan list */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="text-[11px] text-slate-600 font-mono font-semibold tracking-wider">
                        HỒ SƠ ({
                        formatNumber(loans.length)
                    })
                    </div>
                    {
                    canCreate && (
                        <button onClick={
                                () => setShowCreateModal(true)
                            }
                            className="text-[11px] font-bold text-white bg-gradient-to-r from-bidv-green to-bidv-green-mid px-3 py-1.5 rounded-lg hover:shadow-lg hover:shadow-bidv-green/20 transition-all flex items-center gap-1">
                            <span className="text-sm">+</span>
                            Tạo hồ sơ
                        </button>
                    )
                } </div>
                <div className="flex flex-col gap-2">
                    {
                    loans.map((loan, i) => (
                        <div key={
                                loan.id
                            }
                            className="relative group">
                            <LoanCardComp loan={loan}
                                progress={
                                    allProgress[i]
                                }
                                onClick={
                                    () => setSelectedLoan(i)
                                }
                                selected={
                                    selectedLoan === i
                                }
                                SLA_STEPS={SLA_STEPS}/> {/* Edit/Delete buttons overlay */}
                            {
                            isOwner(loan) && (
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={
                                            (e) => {
                                                e.stopPropagation();
                                                setEditingLoan(loan);
                                            }
                                        }
                                        className="text-[10px] bg-white/90 hover:bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded shadow-sm border border-blue-200 transition-colors"
                                        title="Sửa">
                                        ✏️
                                    </button>
                                    <button onClick={
                                            (e) => {
                                                e.stopPropagation();
                                                handleDelete(loan.id);
                                            }
                                        }
                                        disabled={
                                            deleteMutation.isPending
                                        }
                                        className="text-[10px] bg-white/90 hover:bg-red-50 text-red-500 px-1.5 py-0.5 rounded shadow-sm border border-red-200 transition-colors disabled:opacity-50"
                                        title="Xóa">
                                        🗑️
                                    </button>
                                </div>
                            )
                        } </div>
                    ))
                }
                    {
                    loans.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                            <div className="text-3xl mb-2">📋</div>
                            <div className="text-sm text-gray-500">Chưa có hồ sơ nào</div>
                            {
                            canCreate && (
                                <button onClick={
                                        () => setShowCreateModal(true)
                                    }
                                    className="mt-3 text-xs font-medium text-bidv-green hover:text-bidv-green-mid underline transition-colors">
                                    Tạo hồ sơ đầu tiên →
                                </button>
                            )
                        } </div>
                    )
                } </div>
            </div>

            {/* Right: loan detail */}
            {
            loans.length > 0 && loans[selectedLoan] ? (
                <LoanDetailPanel loan={
                        loans[selectedLoan]
                    }
                    progress={
                        allProgress[selectedLoan]
                    }
                    SLA_STEPS={SLA_STEPS}
                    TOTAL_INTERNAL_HOURS={TOTAL_INTERNAL_HOURS}/>
            ) : (
                <div className="flex items-center justify-center p-8 bg-white rounded-xl border border-dashed border-gray-300">
                    <div className="text-gray-500 font-medium">Không có dữ liệu chi tiết</div>
                </div>
            )
        }

            {/* Create Modal */}
            <CreateLoanModal isOpen={showCreateModal}
                onClose={
                    () => setShowCreateModal(false)
                }
                onSubmit={handleCreate}
                isLoading={
                    createMutation.isPending
                }/> {/* Edit Modal */}
            {
            editingLoan && (
                <CreateLoanModal isOpen={true}
                    onClose={
                        () => setEditingLoan(null)
                    }
                    onSubmit={handleEdit}
                    isLoading={
                        updateMutation.isPending
                    }
                    editData={
                        {
                            id: editingLoan.id,
                            customer: editingLoan.customer,
                            deptCode: editingLoan.deptCode,
                            type: editingLoan.type,
                            amount: editingLoan.amount
                        }
                    }/>
            )
        } </div>
    );
}
