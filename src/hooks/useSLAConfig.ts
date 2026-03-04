import { useQuery } from '@tanstack/react-query';
import { configApi } from '../services/api';
import type { SLAStep } from '../types';

export const useSLAConfig = () => {
  return useQuery<SLAStep[]>({
    queryKey: ['sla-config'],
    queryFn: configApi.getSLAConfig,
    staleTime: 60 * 60 * 1000, // Cache for 60 minutes
  });
};
