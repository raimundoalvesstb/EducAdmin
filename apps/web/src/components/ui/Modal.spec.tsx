import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('should not render when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={() => {}}>Conteudo Modal</Modal>);
    expect(screen.queryByText('Conteudo Modal')).not.toBeInTheDocument();
  });

  it('should render content and title when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Titulo Teste">
        Conteudo Modal
      </Modal>
    );
    expect(screen.getByText('Titulo Teste')).toBeInTheDocument();
    expect(screen.getByText('Conteudo Modal')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<Modal isOpen={true} onClose={handleClose} title="Titulo" >Conteudo</Modal>);

    const closeButton = screen.getByRole('button', { name: /fechar/i });
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});