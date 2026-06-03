import React from 'react';
import { render, screen } from '@testing-library/react';
import SLABar from './SLABar';

describe('SLABar Component', () => {
  it('renders a neutral bar when actual is null', () => {
    render(<SLABar actual={null} sla={24} />);

    const div = screen.getByTestId('sla-bar-neutral');
    expect(div).toHaveClass('bg-bidv-green-tint');
    expect(div).not.toHaveClass('relative');
  });

  it('renders emerald progress when actual/sla < 0.8', () => {
    render(<SLABar actual={10} sla={20} />); // 50%

    const outerDiv = screen.getByTestId('sla-bar-container');
    expect(outerDiv).toHaveClass('relative');

    const progressDiv = screen.getByTestId('sla-bar-progress');
    expect(progressDiv).toHaveClass('bg-emerald-500');
    expect(progressDiv).toHaveStyle({ width: '50%' });
  });

  it('renders amber progress when actual/sla is between 0.8 and 1.0', () => {
    render(<SLABar actual={16} sla={20} />); // 80%

    const progressDiv = screen.getByTestId('sla-bar-progress');
    expect(progressDiv).toHaveClass('bg-amber-500');
    expect(progressDiv).toHaveStyle({ width: '80%' });
  });

  it('renders red progress when actual/sla is > 1.0', () => {
    render(<SLABar actual={25} sla={20} />); // 125%, capped at 100%

    const progressDiv = screen.getByTestId('sla-bar-progress');
    expect(progressDiv).toHaveClass('bg-red-500');
    expect(progressDiv).toHaveStyle({ width: '100%' });
  });
});
