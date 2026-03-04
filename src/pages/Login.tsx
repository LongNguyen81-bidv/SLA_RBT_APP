import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USERS } from '../constants/mockData';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      navigate('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-surface-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-bidv-green">SLA RBT APP</h1>
          <p className="text-gray-500 mt-2">Hệ thống theo dõi tiến độ cấp tín dụng</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm"> {error} </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tài khoản</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bidv-green focus:border-transparent outline-none transition-all"
              placeholder="Nhập tài khoản"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bidv-green focus:border-transparent outline-none transition-all"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-bidv-green text-white font-semibold py-2 px-4 rounded-lg hover:bg-bidv-green-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {' '}
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Đăng nhập'
            )}{' '}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-3">Thông tin đăng nhập giả lập:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            {' '}
            {USERS.map((u) => (
              <li key={u.id} className="flex justify-between">
                <span>
                  <strong className="text-gray-800"> {u.username}</strong>/ 1
                </span>
                <span className="text-bidv-green ml-2">
                  ({u.role}- {u.dept})
                </span>
              </li>
            ))}{' '}
          </ul>
        </div>
      </div>
    </div>
  );
}
