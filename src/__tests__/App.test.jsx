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