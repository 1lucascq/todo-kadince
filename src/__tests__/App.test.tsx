import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
	render(<App />);
	const header = screen.getByTestId(/header/i);
	expect(header).toBeInTheDocument();
  });
  
test('renders Kadince Task Manager title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Kadince Task Manager/i);
    expect(titleElement).toBeInTheDocument();
});

