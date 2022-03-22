import React from 'react';
import { screen } from '@testing-library/react';
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
  });
