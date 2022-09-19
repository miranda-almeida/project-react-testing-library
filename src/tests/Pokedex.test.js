import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex.js', () => {
  it('Verifica h2 com texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Verifica a exibição de outro pokémon ao clicar em Próximo pokemón', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    userEvent.click(button);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
  });

  it('Verifica a exibição de um novo pokémon a cada clique no botão', () => {
    renderWithRouter(<App />);

    const pokeDiv = screen.getAllByTestId('pokemon-name');

    expect(pokeDiv.length).toBe(1);
  });

  it('Verifica filtragem de botões', () => {
    renderWithRouter(<App />);

    const filter = screen.getAllByTestId('pokemon-type-button');
    const buttons = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    // itera no array de filtros por tipo pokémon e verifica seus nomes
    filter.forEach((element, index) => {
      expect(element).toHaveTextContent(buttons[index]);
    });
  });

  it('Verifica a exibição do botão de filtro All', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
  });
});
