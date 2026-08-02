import { render, screen } from '@testing-library/react';
import { TopMenu } from './TopMenu';

describe('TopMenu', () => {
  it('should render correctly', () => {
    render(<TopMenu />);
    expect(screen.getByText('EducAdmin')).toBeInTheDocument();
  });
});
