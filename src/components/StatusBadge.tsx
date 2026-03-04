import React from 'react';
import type { SLAStatus } from '../types';

const statusColors: Record<SLAStatus, { bg: string; border: string; text: string; dot: string }> = {
  ok: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    text: 'text-emerald-800',
    dot: 'bg-emerald-500',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    text: 'text-amber-800',
    dot: 'bg-amber-500',
  },
  exceeded: {
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-800',
    dot: 'bg-red-500',
  },
  pending: {
    bg: 'bg-gray-50',
    border: 'border-gray-300',
    text: 'text-gray-500',
    dot: 'bg-gray-400',
  },
};

interface StatusBadgeProps {
  status: SLAStatus;
  label: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const c = statusColors[status];
  return (
    <span
      className={`${c.bg} border ${c.border} ${
        c.text
      } px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider inline-flex items-center gap-1.5`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} inline-block`} /> {label}{' '}
    </span>
  );
}
