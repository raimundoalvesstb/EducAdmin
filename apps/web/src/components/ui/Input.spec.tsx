import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('should render correctly with label', () => {
    render(<Input label="Email" placeholder="Digite seu email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/digite seu email/i)).toBeInTheDocument();
  });

  it('should render error message and have aria-invalid true', () => {
    render(<Input label="Senha" error="Senha inválida" />);
    const input = screen.getByLabelText(/senha/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText(/senha inválida/i)).toBeInTheDocument();
  });
});