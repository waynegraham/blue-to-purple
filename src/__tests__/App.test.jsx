import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

jest.mock('react-ga4', () => ({
  initialize: jest.fn(),
  send: jest.fn(),
}));

const renderWithRouter = (ui, { route = '/' } = {}) =>
  render(
    <MemoryRouter
      initialEntries={[route]}
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      {ui}
    </MemoryRouter>
  );

test('clicking a move displays its modal', () => {
  renderWithRouter(<App />);
  const firstMove = screen.getByText('T-Position Hip Throw');
  fireEvent.click(firstMove);
  expect(screen.getByRole('heading', { name: 'T-Position Hip Throw' })).toBeInTheDocument();
});

test('clicking the close button hides the modal', () => {
  renderWithRouter(<App />);
  const firstMove = screen.getByText('T-Position Hip Throw');
  fireEvent.click(firstMove);
  expect(screen.getByRole('heading', { name: 'T-Position Hip Throw' })).toBeInTheDocument();
  const closeButton = screen.getByRole('button', { name: /close modal/i });
  fireEvent.click(closeButton);
  expect(screen.queryByRole('heading', { name: 'T-Position Hip Throw' })).not.toBeInTheDocument();
});

test('filters moves based on search input', () => {
  renderWithRouter(<App />);
  const input = screen.getByPlaceholderText('Search');
  fireEvent.change(input, { target: { value: 'guillotine' } });
  expect(screen.getAllByText('Guillotine Choke').length).toBeGreaterThan(0);
  expect(screen.queryByText('T-Position Hip Throw')).not.toBeInTheDocument();
});

test('navigates to test preperation guide page', () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Test Preperation Guide' }));
  expect(screen.getByRole('heading', { name: 'Test Preparation Guide' })).toBeInTheDocument();
});
