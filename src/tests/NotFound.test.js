import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testa o componente NotFound.js', () => {
  it('Verifica h2 com texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', {
      name: 'Page requested not found',
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Verifica exibição de gif', () => {
    renderWithRouter(<NotFound />);

    const img = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
