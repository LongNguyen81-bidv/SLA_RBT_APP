import { useQuery } from '@tanstack/react-query';
import { loansApi } from '../services/api';

export const useLoans = (currentUser) => {
  return useQuery({
    queryKey: ['loans', currentUser?.id],
    queryFn: () => loansApi.getLoans(currentUser),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    enabled: !!currentUser, // Only fetch if user is logged in
  });
};
