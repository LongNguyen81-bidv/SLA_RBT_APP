import axios from 'axios';
import { SLA_STEPS, MOCK_LOANS, MOCK_PROGRESS, STAFF_PERF, USERS } from '../constants/mockData';
import type { User, Loan, StepProgress, SLAStep, StaffPerf, LoginResponse, LoansData } from '../types';

// API Configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
const USE_MOCK = true;
// Đổi thành false khi có API endpoint thật

// Giả lập network delay
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

// MOCK LOCAL STORAGE STATE to persist changes within session
let currentLoans: Loan[] = [...MOCK_LOANS];
let currentProgress: StepProgress[][] = JSON.parse(JSON.stringify(MOCK_PROGRESS));

export const authApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    if (USE_MOCK) {
      await delay(500);
      const user = USERS.find((u) => u.username === username && u.password === password);
      if (user) {
        return { token: 'mock-jwt-token-123', user };
      }
      throw new Error('Sai tài khoản hoặc mật khẩu');
    }
    // Thực tế
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data;
  },
};

export const loansApi = {
  getLoans: async (currentUser: User | null): Promise<LoansData> => {
    if (USE_MOCK) {
      await delay(800);

      let filteredLoans: Loan[] = currentLoans;
      let filteredProgress: StepProgress[][] = currentProgress;

      // Phân quyền dữ liệu trả về
      if (currentUser?.role !== 'ADMIN') {
        const dept = currentUser?.dept;
        filteredLoans = currentLoans.filter((loan) => {
          // Thấy nếu assign cho phòng ban của mình
          if (loan.assignedDept === dept) return true;

          // Hoặc đã từng xử lý (completed by this dept) - simplifed: admin sees all, user sees current only
          return false;
        });

        // Map lại progress tương ứng
        filteredProgress = filteredLoans.map((loan) => {
          const originalIndex = currentLoans.findIndex((l) => l.id === loan.id);
          return currentProgress[originalIndex];
        });
      }

      return { loans: filteredLoans, allProgress: filteredProgress };
    }
    const response = await axios.get(`${API_URL}/loans`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  completeStep: async (
    loanId: string,
    stepId: number,
    actionType: 'FORWARD' | 'BACKWARD',
  ): Promise<{ success: boolean }> => {
    if (USE_MOCK) {
      await delay(600);
      const loanIndex = currentLoans.findIndex((l) => l.id === loanId);
      if (loanIndex === -1) throw new Error('Loan not found');

      const loan = currentLoans[loanIndex];
      const progArr = currentProgress[loanIndex];
      const stepProgIndex = progArr.findIndex((p) => p.stepId === stepId);

      if (actionType === 'FORWARD') {
        // Complete current step
        progArr[stepProgIndex].completed = true;
        const startedAt = progArr[stepProgIndex].startedAt || Date.now() - 3600000;
        progArr[stepProgIndex].actualHours = (Date.now() - startedAt) / 3600000 || 1.5;

        // Move to next step if any
        if (stepId < SLA_STEPS.length) {
          const nextStep = SLA_STEPS.find((s) => s.id === stepId + 1)!;
          loan.currentStepId = nextStep.id;
          loan.assignedDept = nextStep.owner;

          progArr[stepProgIndex + 1].startedAt = Date.now();
          progArr[stepProgIndex + 1].completed = false;
        } else {
          loan.currentStepId = null; // Hoàn thành toàn bộ
          loan.assignedDept = 'Hoàn thành';
        }
      } else if (actionType === 'BACKWARD') {
        // Reject to previous step
        if (stepId > 1) {
          const prevStep = SLA_STEPS.find((s) => s.id === stepId - 1)!;
          loan.currentStepId = prevStep.id;
          loan.assignedDept = prevStep.owner;

          // Đặt lại trạng thái bước trước chưa hoàn thành
          progArr[stepProgIndex - 1].completed = false;
          progArr[stepProgIndex - 1].actualHours = null;
          progArr[stepProgIndex - 1].startedAt = Date.now();
          // Reset time for rework

          // Clear current step
          progArr[stepProgIndex].startedAt = null;
          progArr[stepProgIndex].completed = false;
        }
      }

      return { success: true };
    }
    const response = await axios.post(`${API_URL}/loans/${loanId}/steps/${stepId}`, { actionType });
    return response.data;
  },
};

export const configApi = {
  getSLAConfig: async (): Promise<SLAStep[]> => {
    if (USE_MOCK) {
      await delay(500);
      return SLA_STEPS;
    }
    const response = await axios.get(`${API_URL}/config/sla-steps`);
    return response.data;
  },
};

export const staffApi = {
  getStaffPerf: async (): Promise<StaffPerf[]> => {
    if (USE_MOCK) {
      await delay(500);
      return STAFF_PERF;
    }
    const response = await axios.get(`${API_URL}/staff/performance`);
    return response.data;
  },
};
