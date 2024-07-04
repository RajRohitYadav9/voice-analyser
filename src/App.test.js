import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to the Voice Analyser application/i);
  expect(linkElement).toBeInTheDocument();
});
