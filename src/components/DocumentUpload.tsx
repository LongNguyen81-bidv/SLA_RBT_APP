import React, {useRef} from 'react';
import type {LoanDocument}
from '../types';
import {useDocuments, useUploadDocument, useDeleteDocument} from '../hooks/useDocuments';
import {documentsApi} from '../services/api';
import {useAuth} from '../context/AuthContext';

interface DocumentUploadProps {
    loanId: string;
    /** Set to true if user can modify (owner or admin) */
    canEdit?: boolean;
}

function formatFileSize(bytes : number): string {
    if (bytes < 1024) 
        return bytes + ' B';
    
    if (bytes < 1024 * 1024) 
        return(bytes / 1024).toFixed(1) + ' KB';
    
    return(bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function formatDate(ts : number): string {
    const d = new Date(ts);
    return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getFileIcon(fileName : string): string {
    const ext = fileName.split('.').pop() ?. toLowerCase() || '';
    if (['pdf'].includes(ext)) 
        return '📄';
    
    if (['doc', 'docx'].includes(ext)) 
        return '📝';
    
    if (['xls', 'xlsx'].includes(ext)) 
        return '📊';
    
    if ([
        'jpg',
        'jpeg',
        'png',
        'gif',
        'webp'
    ].includes(ext)) 
        return '🖼️';
    
    if (['zip', 'rar', '7z'].includes(ext)) 
        return '📦';
    
    return '📎';
}

export default function DocumentUpload({
    loanId,
    canEdit = false
} : DocumentUploadProps) {
    const {user} = useAuth();
    const fileInputRef = useRef < HTMLInputElement > (null);
    const {
        data: documents = [],
        isLoading
    } = useDocuments(loanId);
    const uploadMutation = useUploadDocument();
    const deleteMutation = useDeleteDocument();

    const handleFileSelect = async (e : React.ChangeEvent < HTMLInputElement >) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0 || !user) 
            return;
        
        await uploadMutation.mutateAsync({loanId, files, userId: user.id});
        if (fileInputRef.current) 
            fileInputRef.current.value = '';
        
    };

    const handleDelete = async (docId : number, fileName : string) => {
        if (!window.confirm(`Xóa file "${fileName}"?`)) 
            return;
        
        await deleteMutation.mutateAsync({loanId, docId});
    };

    const handleDownload = (docId : number) => {
        window.open(documentsApi.getDownloadUrl(loanId, docId), '_blank');
    };

    return (
        <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-slate-600 tracking-wider flex items-center gap-1.5">
                    📎 TÀI LIỆU ĐÍNH KÈM
                    <span className="bg-bidv-green-tint text-bidv-green text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        {
                        documents.length
                    }</span>
                </h4>
                {
                canEdit && (
                    <div>
                        <input ref={fileInputRef}
                            type="file"
                            multiple
                            onChange={handleFileSelect}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.zip,.rar"/>
                        <button onClick={
                                () => fileInputRef.current ?. click()
                            }
                            disabled={
                                uploadMutation.isPending
                            }
                            className="text-xs font-medium text-bidv-green bg-bidv-green-tint hover:bg-bidv-green hover:text-white px-3 py-1.5 rounded-lg transition-all disabled:opacity-50">
                            {
                            uploadMutation.isPending ? (
                                <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 border-2 border-bidv-green/30 border-t-bidv-green rounded-full animate-spin"></span>
                                    Đang upload...
                                </span>
                            ) : '+ Upload file'
                        } </button>
                    </div>
                )
            } </div>

            {
            isLoading ? (
                <div className="text-xs text-gray-400 py-3 text-center">Đang tải...</div>
            ) : documents.length === 0 ? (
                <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl">
                    <div className="text-2xl mb-1">📂</div>
                    <div className="text-xs text-gray-400">Chưa có tài liệu đính kèm</div>
                    {
                    canEdit && <div className="text-[10px] text-gray-300 mt-1">Nhấn &quot;Upload file&quot; để thêm</div>
                } </div>
            ) : (
                <div className="space-y-1.5">
                    {
                    documents.map((doc : LoanDocument) => (
                        <div key={
                                doc.id
                            }
                            className="flex items-center gap-3 px-3 py-2 bg-gray-50 hover:bg-bidv-green-surface rounded-lg transition-colors group">
                            <span className="text-lg">
                                {
                                getFileIcon(doc.fileName)
                            }</span>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium text-slate-700 truncate">
                                    {
                                    doc.fileName
                                }</div>
                                <div className="text-[10px] text-gray-400 font-mono">
                                    {
                                    formatFileSize(doc.fileSize)
                                }
                                    · {
                                    formatDate(doc.uploadedAt)
                                } </div>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={
                                        () => handleDownload(doc.id)
                                    }
                                    className="text-xs text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors"
                                    title="Tải xuống">
                                    ⬇️
                                </button>
                                {
                                canEdit && (
                                    <button onClick={
                                            () => handleDelete(doc.id, doc.fileName)
                                        }
                                        disabled={
                                            deleteMutation.isPending
                                        }
                                        className="text-xs text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                                        title="Xóa">
                                        🗑️
                                    </button>
                                )
                            } </div>
                        </div>
                    ))
                } </div>
            )
        } </div>
    );
}
