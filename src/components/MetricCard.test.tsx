import React from 'react';
import { render, screen } from '@testing-library/react';
import MetricCard from './MetricCard';

describe('MetricCard Component', () => {
  it('renders label and value correctly', () => {
    render(<MetricCard label="Total Loans" value={150} accent="#004D40" />);

    expect(screen.getByText(/Total Loans/)).toBeInTheDocument();
    expect(screen.getByText(/150/)).toBeInTheDocument();

    // Verify it doesn't render sub if not provided
    expect(screen.queryByText(/Sub/)).not.toBeInTheDocument();
  });

  it('renders sub text when provided', () => {
    render(<MetricCard label="Total Loans" value="200" sub="+5 this week" accent="#004D40" />);

    expect(screen.getByText(/\+5 this week/)).toBeInTheDocument();
  });

  it('applies the accent color to the side bar', () => {
    render(<MetricCard label="Accent Test" value={10} accent="#ff0000" />);

    // Find the element that receives the accent color style using testid
    const accentDiv = screen.getByTestId('metric-accent');

    expect(accentDiv).toHaveStyle({ background: '#ff0000' });
  });
});
