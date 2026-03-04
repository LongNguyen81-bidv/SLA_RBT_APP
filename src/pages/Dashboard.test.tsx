import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import * as AuthContextModule from '../context/AuthContext';
import * as ConfigContextModule from '../context/ConfigContext';
import type { Loan, User, BusinessConfig } from '../types';

// Mock contexts
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../context/ConfigContext', () => ({
  useConfig: jest.fn(),
}));

// Mock LoanCardComp and SLAStepsTable to avoid rendering complex children
jest.mock('../components/LoanCardComp', () => {
  return function MockLoanCardComp() {
    return <div data-testid="mock-loan-card">Loan Card</div>;
  };
});

jest.mock('../components/SLAStepsTable', () => {
  return function MockSLAStepsTable() {
    return <div data-testid="mock-sla-steps-table">SLA Steps Table</div>;
  };
});

describe('Dashboard Page', () => {
  const mockUser: User = {
    id: '1',
    username: 'admin',
    password: 'password',
    role: 'ADMIN',
    dept: 'QLNB',
    name: 'Admin User',
  };

  const mockConfig: BusinessConfig = {
    workDays: [1, 2, 3, 4, 5],
    startHour: 8,
    endHour: 17,
    lunchBreakEnabled: true,
    lunchBreak: { start: 12, end: 13 },
    holidays: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (AuthContextModule.useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    (ConfigContextModule.useConfig as jest.Mock).mockReturnValue({ config: mockConfig });
  });

  const mockLoans: Loan[] = [
    {
      id: 'L001',
      customer: 'Test Customer',
      branch: 'Test Branch',
      type: 'Test Product',
      amount: '1000',
      startTime: Date.now(),
      officer: 'John Doe',
      currentStepId: 1,
      assignedDept: 'KHBL',
    },
  ];

  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <Dashboard
          loans={mockLoans}
          allProgress={[[{ stepId: 1, completed: true, actualHours: 1, startedAt: 0 }]]}
          SLA_STEPS={[
            {
              id: 1,
              name: 'Step 1',
              slaHours: 10,
              owner: 'USER',
              code: 'S1',
              internal: true,
              system: 'LOS',
            },
          ]}
          totalActive={1}
          totalExceeded={0}
          avgCompletion={5}
          setSelectedLoan={jest.fn()}
        />
      </BrowserRouter>
    );
  };

  it('renders user greeting and role correctly', () => {
    renderDashboard();

    expect(screen.getByText(/Xin chào, Admin User/)).toBeInTheDocument();
    expect(screen.getByText(/Vai trò: Quản lý Nội bộ \(Admin\)/)).toBeInTheDocument();
  });

  it('renders metric cards with provided data', () => {
    renderDashboard();

    expect(screen.getByText('Hồ sơ đang xử lý')).toBeInTheDocument();
    // Use getAllByText because value might match string in subtitle or elsewhere
    const activeValues = screen.getAllByText('1');
    expect(activeValues.length).toBeGreaterThan(0);

    expect(screen.getByText('Bước vượt SLA')).toBeInTheDocument();
    const exceededValues = screen.getAllByText('0');
    expect(exceededValues.length).toBeGreaterThan(0);

    expect(screen.getByText('Bước TB hoàn thành')).toBeInTheDocument();
    expect(screen.getByText('5/10')).toBeInTheDocument();
  });

  it('renders correct number of loan cards', () => {
    renderDashboard();

    const loanCards = screen.getAllByTestId('mock-loan-card');
    expect(loanCards).toHaveLength(1);
  });

  it('renders SLA steps table', () => {
    renderDashboard();

    expect(screen.getByTestId('mock-sla-steps-table')).toBeInTheDocument();
  });
});
