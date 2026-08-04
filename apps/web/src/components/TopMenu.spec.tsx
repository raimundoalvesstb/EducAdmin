import { render, screen } from '@testing-library/react';
import { TopMenu } from './TopMenu';

// Mocking usePathname from next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('TopMenu', () => {
  it('renders the application title', () => {
    render(<TopMenu />);
    const titleElement = screen.getByText(/EducAdmin/i);
    expect(titleElement).toBeInTheDocument();
  });
});
