import {useMutation, useQueryClient} from '@tanstack/react-query';
import {loansApi} from '../services/api';
import type {CreateLoanPayload}
from '../types';

export const useCreateLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (
            {payload, userId} : {
                payload: CreateLoanPayload;
                userId: string
            }
        ) => loansApi.createLoan(payload, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['loans']});
        }
    });
};

export const useUpdateLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (
            {id, payload} : {
                id: string;
                payload: Partial < CreateLoanPayload >
            }
        ) => loansApi.updateLoan(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['loans']});
        }
    });
};

export const useDeleteLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id : string) => loansApi.deleteLoan(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['loans']});
        }
    });
};
