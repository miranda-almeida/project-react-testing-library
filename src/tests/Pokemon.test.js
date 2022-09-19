import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon.js', () => {
  it('Verifica a renderização das informações do pokémon exibido', () => {
    renderWithRouter(<App />);

    const name = screen.getByText('Pikachu');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByText('Average weight: 6.0 kg');
    const sprite = screen.getByAltText('Pikachu sprite');

    expect(name).toBeInTheDocument();
    expect(type.innerHTML).toBe('Electric');
    expect(weight).toBeInTheDocument();
    expect(sprite.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Verifica exibição do botão More details e redirecionamento para página', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByText(/more details/i);
    userEvent.click(details);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica renderização do ícone de estrela após favoritar um pokémon', () => {
    renderWithRouter(<App />);

    const details = screen.getByText(/more details/i);
    userEvent.click(details);

    const checkbox = screen.getByText('Pokémon favoritado?');
    userEvent.click(checkbox);

    const icon = screen.getByAltText('Pikachu is marked as favorite');
    expect(icon.src).toBe('http://localhost/star-icon.svg');
  });
});
