import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('Testa o componente FavoritePokemons.js', () => {
  it('Verifica os textos nos links de navegação do topo', () => {
    renderWithRouter(<FavoritePokemons />);

    const link = screen.getByText(/no favorite pokemon found/i);
    expect(link).toBeInTheDocument();
  });

  it('Verifica se todos os cards de pokemóns favoritados são exibidos', () => {
    renderWithRouter(<App />);

    const home = screen.getByText('Home');
    const favorites = screen.getByText(/favorite pokémons/i);

    // captura e verifica renderização de link que exibe mais infos dos pokémons
    const details = screen.getByText(/more details/i);
    expect(details).toBeInTheDocument();

    // clica no link para redirecionamento
    userEvent.click(details);

    // localiza e verifica a renderização da checkbox para favoritar pokémon
    const checkbox = screen.getByText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();

    // clica para marcar a checkbox
    userEvent.click(checkbox);

    // retorna para a página principal
    userEvent.click(home);

    // captura o botão de tipo Dragon e clique
    const dragonType = screen.getByRole('button', {
      name: 'Dragon',
    });
    userEvent.click(dragonType);

    // interação
    const detailsTwo = screen.getByText(/more details/i);
    userEvent.click(detailsTwo);
    const checkboxTwo = screen.getByText('Pokémon favoritado?');
    userEvent.click(checkboxTwo);
    userEvent.click(favorites);

    const pokeDiv = screen.getAllByTestId('pokemon-name');

    expect(pokeDiv.length).toBe(2);
  });
});
