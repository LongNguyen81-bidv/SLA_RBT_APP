import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider } from './context/ConfigContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

test('renders SLA Tracker app login page', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ConfigProvider>
          <MemoryRouter initialEntries={['/login']}>
            <App />
          </MemoryRouter>
        </ConfigProvider>
      </AuthProvider>
    </QueryClientProvider>
  );

  const titleElement = screen.getByText(/SLA RBT APP/i);
  expect(titleElement).toBeInTheDocument();
});
