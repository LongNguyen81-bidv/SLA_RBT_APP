import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-6xl font-bold text-bidv-green">404</h1>
      <p className="text-xl text-[#1a3329]">Trang bạn tìm kiếm không tồn tại.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-bidv-green text-white rounded-md hover:bg-bidv-green-mid transition-colors font-medium"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
