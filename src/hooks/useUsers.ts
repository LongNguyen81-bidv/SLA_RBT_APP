import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {usersApi} from '../services/api';
import type {User}
from '../types';

export const useUsers = () => {
    return useQuery < User[] > ({
        queryKey: ['users'],
        queryFn: () => usersApi.getUsers(),
        staleTime: 5 * 60 * 1000
    });
};

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userData : Omit < User, 'id' | 'password' >) => usersApi.addUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
        }
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id : string) => usersApi.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
        }
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: (id : string) => usersApi.resetPassword(id)
    });
};
