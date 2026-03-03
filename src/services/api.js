import axios from 'axios';
import { SLA_STEPS, MOCK_LOANS, MOCK_PROGRESS, STAFF_PERF } from '../constants/mockData';

// API Configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
const USE_MOCK = true;
// Đổi thành false khi có API endpoint thật

// Giả lập network delay cho mock data
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const loansApi = {
  getLoans: async () => {
    if (USE_MOCK) {
      await delay(1000);
      return { loans: MOCK_LOANS, allProgress: MOCK_PROGRESS };
    }
    const response = await axios.get(`${API_URL}/loans`);
    return response.data;
  },
};

export const configApi = {
  getSLAConfig: async () => {
    if (USE_MOCK) {
      await delay(800);
      return SLA_STEPS;
    }
    const response = await axios.get(`${API_URL}/config/sla-steps`);
    return response.data;
  },
};

export const staffApi = {
  getStaffPerf: async () => {
    if (USE_MOCK) {
      await delay(1000);
      return STAFF_PERF;
    }
    const response = await axios.get(`${API_URL}/staff/performance`);
    return response.data;
  },
};
