const fs = require('fs');

const headerTsx = `import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavItem {
  id: string;
  label: string;
}

const NAV: NavItem[] = [
  { id: '/', label: 'Dashboard' },
  { id: '/loans', label: 'Hồ sơ' },
  { id: '/staff', label: 'Hiệu suất' },
  { id: '/users', label: 'Quản lý Users' },
  { id: '/config', label: 'Cấu hình SLA' },
];

export default function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredNav = NAV.filter((n) => {
    if ((n.id === '/staff' || n.id === '/config' || n.id === '/users') && user?.role !== 'ADMIN') {
      return false;
    }
    return true;
  });

  return (
    <div className="border-b border-[#C5DED9] px-8 flex items-center justify-between h-14 sticky top-0 bg-white z-50 shadow-[0_1px_4px_rgba(0,77,64,0.08)]">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-bidv-green to-bidv-green-mid flex items-center justify-center text-xs font-bold text-bidv-gold font-mono">
          SLA
        </div>
        <div>
          <div className="text-[13px] font-bold text-bidv-green leading-tight">
            RBT Credit SLA Tracker
          </div>
          <div className="text-[10px] text-[#6B9E97] font-mono">
            Quy trình Tín dụng Bán lẻ · Có TSBĐ
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex gap-1 flex-1 px-8">
        {filteredNav.map((n) => (
          <NavLink
            key={n.id}
            to={n.id}
            className={({ isActive }) =>
              \`px-3.5 py-1.5 rounded-md border-none cursor-pointer text-xs font-medium font-sans transition-all duration-200 border-b-2 \${
                isActive
                  ? 'bg-bidv-green-tint text-bidv-green border-b-bidv-gold'
                  : 'bg-transparent text-[#6B9E97] border-b-transparent hover:bg-bidv-green-surface hover:text-bidv-green-mid'
              }\`
            }
          >
            {n.label}
          </NavLink>
        ))}
      </nav>

      {/* User info & Live indicator */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-3 border-r border-[#C5DED9] pr-4">
            <div className="text-right">
              <div className="text-[13px] font-bold text-bidv-green leading-tight">
                {user.name}
              </div>
              <div className="text-[10px] text-[#6B9E97] font-mono">
                {user.dept} ({user.role})
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" />
          <span className="text-[11px] text-[#6B9E97] font-mono">LIVE</span>
        </div>
      </div>
    </div>
  );
}`;

fs.writeFileSync('src/components/AppHeader.tsx', headerTsx);
console.log('AppHeader.tsx fixed via node fs');
