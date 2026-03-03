import { useQuery } from '@tanstack/react-query';
import { configApi } from '../services/api';

export const useSLAConfig = () => {
  return useQuery({
    queryKey: ['sla-config'],
    queryFn: configApi.getSLAConfig,
    staleTime: 60 * 60 * 1000, // Cache for 60 minutes
  });
};
