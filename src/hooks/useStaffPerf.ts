import { useQuery } from '@tanstack/react-query';
import { staffApi } from '../services/api';
import type { StaffPerf } from '../types';

export const useStaffPerf = (enabled: boolean = true) => {
  return useQuery<StaffPerf[]>({
    queryKey: ['staff-perf'],
    queryFn: staffApi.getStaffPerf,
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
    enabled,
  });
};
