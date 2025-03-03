import { render, screen } from '@testing-library/react';
import App from './App';

test('renders "learn react" link', () => {
  render(<App />);
  
  // Use `getByRole` for accessibility and better query options.
  const linkElement = screen.getByRole('link', { name: /learn react/i });

  // Asserting that the link is in the document
  expect(linkElement).toBeInTheDocument();
});
