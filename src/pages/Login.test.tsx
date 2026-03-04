import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from '../context/AuthContext';
import * as AuthContextModule from '../context/AuthContext';

// Mock the AuthContext
jest.mock('../context/AuthContext', () => {
  const original = jest.requireActual('../context/AuthContext');
  return {
    ...original,
    useAuth: jest.fn(),
  };
});

describe('Login Page', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (AuthContextModule.useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: mockLogin,
      logout: jest.fn(),
    });
  });

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  it('renders login form correctly', () => {
    renderLogin();

    expect(screen.getByText('SLA RBT APP')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nhập tài khoản')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nhập mật khẩu')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Đăng nhập/i })).toBeInTheDocument();
  });

  it('handles user input', () => {
    renderLogin();

    const usernameInput = screen.getByPlaceholderText('Nhập tài khoản');
    const passwordInput = screen.getByPlaceholderText('Nhập mật khẩu');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
  });

  it('calls login function on submit', async () => {
    renderLogin();

    const usernameInput = screen.getByPlaceholderText('Nhập tài khoản');
    const passwordInput = screen.getByPlaceholderText('Nhập mật khẩu');
    const submitButton = screen.getByRole('button', { name: /Đăng nhập/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: '1' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('admin', '1');
    });
  });

  it('displays error message on login failure', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Tài khoản hoặc mật khẩu không đúng'));

    renderLogin();

    const usernameInput = screen.getByPlaceholderText('Nhập tài khoản');
    const passwordInput = screen.getByPlaceholderText('Nhập mật khẩu');
    const submitButton = screen.getByRole('button', { name: /Đăng nhập/i });

    fireEvent.change(usernameInput, { target: { value: 'wrong' } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Tài khoản hoặc mật khẩu không đúng')).toBeInTheDocument();
    });
  });
});
