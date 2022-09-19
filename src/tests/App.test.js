import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  it('Verifica os textos nos links de navegação do topo', () => {
    renderWithRouter(<App />);
    const home = screen.getByText(/home/i);
    const about = screen.getByText(/about/i);
    const favorite = screen.getByText(/favorite pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('Ao clicar em Home há redirecionamento para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/home/i);

    userEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Ao clicar em About há redirecionamento para a página sobre', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText(/about/i);

    userEvent.click(about);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Ao clicar em Favorite Pokémons há redirecionamento para a página favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByText(/favorite pokémons/i);

    userEvent.click(favorites);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('URL desconhecida redireciona para a página not found', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/randomlink');
    });

    const notFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });
});
