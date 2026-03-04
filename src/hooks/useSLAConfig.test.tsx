import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSLAConfig } from './useSLAConfig';
import { configApi } from '../services/api';
import type { SLAStep } from '../types';

// Mock the api
jest.mock('../services/api', () => ({
  configApi: {
    getSLAConfig: jest.fn(),
  },
}));

describe('useSLAConfig', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('fetches SLA configuration data', async () => {
    const mockData: SLAStep[] = [
      {
        id: 1,
        name: 'Step 1',
        slaHours: 10,
        owner: 'USER',
        code: 'S1',
        system: 'LOS',
        internal: true,
      },
    ];

    (configApi.getSLAConfig as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSLAConfig(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
    expect(configApi.getSLAConfig).toHaveBeenCalledTimes(1);
  });
});
