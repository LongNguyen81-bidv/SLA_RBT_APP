import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {documentsApi} from '../services/api';
import type {LoanDocument}
from '../types';

export const useDocuments = (loanId : string | null) => {
    return useQuery < LoanDocument[] > ({
        queryKey: [
            'documents', loanId
        ],
        queryFn: () => documentsApi.list(loanId !),
        enabled: !!loanId,
        staleTime: 2 * 60 * 1000
    });
};

export const useUploadDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (
            {loanId, files, userId} : {
                loanId: string;
                files: File[];
                userId: string
            }
        ) => documentsApi.upload(loanId, files, userId),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['documents', variables.loanId]
            });
        }
    });
};

export const useDeleteDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (
            {loanId, docId} : {
                loanId: string;
                docId: number
            }
        ) => documentsApi.delete(loanId, docId),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['documents', variables.loanId]
            });
        }
    });
};
