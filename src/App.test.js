import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

test('renders SLA Tracker app', () => {
    render (<BrowserRouter>
        <App/>
    </BrowserRouter>);
    const titleElement = screen.getByText(/RBT Credit SLA Tracker/i);
    expect(titleElement).toBeInTheDocument();
});
