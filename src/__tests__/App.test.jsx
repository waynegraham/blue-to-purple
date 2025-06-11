import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

jest.mock('react-ga4', () => ({
  initialize: jest.fn(),
  send: jest.fn(),
}));

test('clicking a move displays its modal', () => {
  render(<App />);
  const firstMove = screen.getByText('T-Position Hip Throw');
  fireEvent.click(firstMove);
  expect(screen.getByRole('heading', { name: 'T-Position Hip Throw' })).toBeInTheDocument();
});

test('clicking the close button hides the modal', () => {
  render(<App />);
  const firstMove = screen.getByText('T-Position Hip Throw');
  fireEvent.click(firstMove);
  expect(screen.getByRole('heading', { name: 'T-Position Hip Throw' })).toBeInTheDocument();
  const closeButton = screen.getByRole('button', { name: /close/i });
  fireEvent.click(closeButton);
  expect(screen.queryByRole('heading', { name: 'T-Position Hip Throw' })).not.toBeInTheDocument();
});

test('filters moves based on search input', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Search');
  fireEvent.change(input, { target: { value: 'guillotine' } });
  expect(screen.getAllByText('Guillotine Choke').length).toBeGreaterThan(0);
  expect(screen.queryByText('T-Position Hip Throw')).not.toBeInTheDocument();
});


