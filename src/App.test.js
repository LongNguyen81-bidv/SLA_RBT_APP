import {render, screen} from '@testing-library/react';
import App from './App';

test('renders SLA Tracker app', () => {
    render (<App/>);
    const titleElement = screen.getByText(/RBT Credit SLA Tracker/i);
    expect(titleElement).toBeInTheDocument();
});
