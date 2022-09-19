import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testa o componente About.js', () => {
  it('Verifica h2 com texto About Pokédex', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Verifica sea página possui uma imagem de Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
