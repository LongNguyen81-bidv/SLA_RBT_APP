import React from 'react';
import { render } from '@testing-library/react';
import SLABar from './SLABar';

describe('SLABar Component', () => {
  it('renders a neutral bar when actual is null', () => {
    const { container } = render(<SLABar actual={null} sla={24} />);

    // When actual is null, it renders a single div
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass('bg-bidv-green-tint');
    expect(div).not.toHaveClass('relative'); // Only the container of progress bar has 'relative'
  });

  it('renders emerald progress when actual/sla < 0.8', () => {
    const { container } = render(<SLABar actual={10} sla={20} />); // 50%

    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass('relative');

    const progressDiv = outerDiv.firstChild as HTMLElement;
    expect(progressDiv).toHaveClass('bg-emerald-500');
    expect(progressDiv).toHaveStyle({ width: '50%' });
  });

  it('renders amber progress when actual/sla is between 0.8 and 1.0', () => {
    const { container } = render(<SLABar actual={16} sla={20} />); // 80%

    const progressDiv = (container.firstChild as HTMLElement).firstChild as HTMLElement;
    expect(progressDiv).toHaveClass('bg-amber-500');
    expect(progressDiv).toHaveStyle({ width: '80%' });
  });

  it('renders red progress when actual/sla is > 1.0', () => {
    const { container } = render(<SLABar actual={25} sla={20} />); // 125%, capped at 100%

    const progressDiv = (container.firstChild as HTMLElement).firstChild as HTMLElement;
    expect(progressDiv).toHaveClass('bg-red-500');
    // Width should be capped at 100%
    expect(progressDiv).toHaveStyle({ width: '100%' });
  });
});
