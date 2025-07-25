import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main converter components', () => {
  render(<App />);
  
  // Check for our main components
  expect(screen.getByText('Epoch to Human Date')).toBeInTheDocument();
  expect(screen.getByText('Human Date to Epoch')).toBeInTheDocument();
  expect(screen.getByText('Timestamp Generator')).toBeInTheDocument();
});
