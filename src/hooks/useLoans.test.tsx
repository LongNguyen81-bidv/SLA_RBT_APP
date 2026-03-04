import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLoans } from './useLoans';
import { loansApi } from '../services/api';
import type { User, LoansData } from '../types';

// Mock the api
jest.mock('../services/api', () => ({
  loansApi: {
    getLoans: jest.fn(),
  },
}));

describe('useLoans', () => {
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

  it('does not fetch if currentUser is null', () => {
    const { result } = renderHook(() => useLoans(null), { wrapper });

    expect(result.current.fetchStatus).toBe('idle');
    expect(loansApi.getLoans).not.toHaveBeenCalled();
  });

  it('fetches loan data if currentUser is provided', async () => {
    const mockUser: User = {
      id: '1',
      username: 'test',
      password: 'password',
      role: 'USER',
      dept: 'test dept',
      name: 'Test User',
    };

    const mockData: LoansData = {
      loans: [],
      allProgress: [],
    };

    (loansApi.getLoans as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useLoans(mockUser), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
    expect(loansApi.getLoans).toHaveBeenCalledWith(mockUser);
  });
});
