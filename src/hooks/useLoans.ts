import { useQuery } from '@tanstack/react-query';
import { loansApi } from '../services/api';
import type { User, LoansData } from '../types';

export const useLoans = (currentUser: User | null) => {
  return useQuery<LoansData>({
    queryKey: ['loans', currentUser?.id],
    queryFn: () => loansApi.getLoans(currentUser),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    enabled: !!currentUser, // Only fetch if user is logged in
  });
};
