import React from 'react';
import { render, screen } from '@testing-library/react';
import { GlassCard } from './GlassCard';

describe('GlassCard', () => {
  it('should render children content', () => {
    render(<GlassCard><span data-testid="child">Conteudo</span></GlassCard>);
    expect(screen.getByTestId('child')).toHaveTextContent('Conteudo');
  });

  it('should apply custom classname', () => {
    const { container } = render(<GlassCard className="custom-class">Test</GlassCard>);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass('glass'); // Ensure base class persists
  });
});