import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusBadge from './StatusBadge';

describe('StatusBadge Component', () => {
  it('renders "ok" status badge correctly', () => {
    render(<StatusBadge status="ok" label="Đúng hạn" />);
    // Check if label is rendered
    expect(screen.getByText(/Đúng hạn/)).toBeInTheDocument();

    // Check if specific colors are applied using testid
    const span = screen.getByTestId('status-badge');
    expect(span).toHaveClass('bg-emerald-50');
    expect(span).toHaveClass('border-emerald-300');
    expect(span).toHaveClass('text-emerald-800');

    // Check the inner dot using testid
    const dot = screen.getByTestId('status-badge-dot');
    expect(dot).toHaveClass('bg-emerald-500');
  });

  it('renders "warning" status badge correctly', () => {
    render(<StatusBadge status="warning" label="Cảnh báo" />);

    const span = screen.getByTestId('status-badge');
    expect(span).toHaveClass('bg-amber-50');
    expect(span).toHaveClass('border-amber-300');
    expect(span).toHaveClass('text-amber-800');

    const dot = screen.getByTestId('status-badge-dot');
    expect(dot).toHaveClass('bg-amber-500');
  });

  it('renders "exceeded" status badge correctly', () => {
    render(<StatusBadge status="exceeded" label="Quá hạn" />);

    const span = screen.getByTestId('status-badge');
    expect(span).toHaveClass('bg-red-50');
    expect(span).toHaveClass('border-red-300');
    expect(span).toHaveClass('text-red-800');

    const dot = screen.getByTestId('status-badge-dot');
    expect(dot).toHaveClass('bg-red-500');
  });

  it('renders "pending" status badge correctly', () => {
    render(<StatusBadge status="pending" label="Chưa xử lý" />);

    const span = screen.getByTestId('status-badge');
    expect(span).toHaveClass('bg-gray-50');
    expect(span).toHaveClass('border-gray-300');
    expect(span).toHaveClass('text-gray-500');

    const dot = screen.getByTestId('status-badge-dot');
    expect(dot).toHaveClass('bg-gray-400');
  });
});
