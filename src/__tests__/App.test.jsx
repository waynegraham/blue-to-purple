import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

jest.mock('react-ga4', () => ({
  initialize: jest.fn(),
  send: jest.fn(),
}));

test('clicking a move displays its modal', () => {
  render(<App />);
  const firstMove = screen.getByText('Hip throw');
  fireEvent.click(firstMove);
  expect(screen.getByRole('heading', { name: 'Hip throw' })).toBeInTheDocument();
});

test('clicking the close button hides the modal', () => {
  render(<App />);
  const firstMove = screen.getByText('Hip throw');
  fireEvent.click(firstMove);
  expect(screen.getByRole('heading', { name: 'Hip throw' })).toBeInTheDocument();
  const closeButton = screen.getByRole('button', { name: /close/i });
  fireEvent.click(closeButton);
  expect(screen.queryByRole('heading', { name: 'Hip throw' })).not.toBeInTheDocument();
});

test('filters moves based on search input', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Search');
  fireEvent.change(input, { target: { value: 'guillotine' } });
  expect(screen.getByText('Guillotine Choke')).toBeInTheDocument();
  expect(screen.queryByText('Hip throw')).not.toBeInTheDocument();
});


