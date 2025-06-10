import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/Footer';

test('renders MIT Licensed text', () => {
  render(<Footer />);
  expect(screen.getByText(/MIT Licensed/i)).toBeInTheDocument();
});
