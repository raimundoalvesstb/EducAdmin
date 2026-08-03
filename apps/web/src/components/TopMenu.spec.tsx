import { render, screen } from '@testing-library/react';
import { TopMenu } from './TopMenu';

// Mock next/navigation hooks
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('TopMenu', () => {
  it('should render correctly', () => {
    render(<TopMenu />);
    expect(screen.getByText('EducAdmin')).toBeInTheDocument();
  });
});