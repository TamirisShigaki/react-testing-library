import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    it('Verifica se o primeiro link deve possuir o texto "Home"', () => {
      renderWithRouter(<App />);

      const home = screen.getByText('Home');
      expect(home).toBeDefined();
    });

    it('Verifica se o segundo link deve possuir o texto "About"', () => {
      renderWithRouter(<App />);

      const about = screen.getByText('About');
      expect(about).toBeDefined();
    });

    it('Verifica se o terceiro link deve possuir o texto "Favorite Pokémons"', () => {
      renderWithRouter(<App />);

      const favoritePokemons = screen.getByText('Favorite Pokémons');
      expect(favoritePokemons).toBeDefined();
    });

    it('verifica se ao clicar em "Home", é redirecionado pra Home ', () => {
      const { history } = renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: /home/i });
      expect(linkHome).toBeInTheDocument();
      userEvent.click(linkHome);
      expect(history.location.pathname).toBe('/');
    });

    it('verifica se ao clicar em "About", é redirecionado pra About ', () => {
      const { history } = renderWithRouter(<App />);

      const linkAbout = screen.getByRole('link', { name: /about/i });
      expect(linkAbout).toBeInTheDocument();
      userEvent.click(linkAbout);
      expect(history.location.pathname).toBe('/about');
    });

    it('verifica se ao clicar em "Favorite Pokémons", é redirecionado pra pagina', () => {
      const { history } = renderWithRouter(<App />);

      const linkFavorite = screen.getByRole('link', { name: /favorite/i });
      expect(linkFavorite).toBeInTheDocument();
      userEvent.click(linkFavorite);
      expect(history.location.pathname).toBe('/favorites');
    });

    it('Verifica um caminho não existente e redireciona para Not Found',
      () => {
        const { history } = renderWithRouter(<App />);

        history.push('/notFound');

        const notFoundTitle = screen.getByRole('heading',
          { name: /Page requested not found/i });
        expect(notFoundTitle).toBeInTheDocument();
      });
  });
