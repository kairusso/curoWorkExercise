import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Before and After All Calls
 */

beforeAll(() => {

});

afterAll(() => {

});

/**
 * Tests
 */

test('renders title', () => {
    render(<App />);
    const linkElement = screen.getByText(/Manage FTE/i);
    expect(linkElement).toBeInTheDocument();
});

test('True is True', () => {
    expect(true).toBe(true);
});

