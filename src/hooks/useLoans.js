import { useQuery } from '@tanstack/react-query';
import { loansApi } from '../services/api';

export const useLoans = () => {
  return useQuery({
    queryKey: ['loans'],
    queryFn: loansApi.getLoans,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
