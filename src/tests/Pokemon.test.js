import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const pokemon = {
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
};

describe('Teste o componente <Pokemon.js />', () => {
  describe('Verifica se é renderizado um card com as informações de um pokemon', () => {
    it('Verifica se nome correto do Pokémon aparece na tela', () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemon }
        isFavorite={ false }
      />);

      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(/Charmander/i);
    });

    it('Verifica se o tipo correto do pokémon aparece na tela', () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemon }
        isFavorite={ false }
      />);

      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(/Fire/i);
    });

    it('Verifica se o peso médio do pokémon e sua unidade de medida aparece na tela',
      () => {
        renderWithRouter(<Pokemon
          pokemon={ pokemon }
          isFavorite={ false }
        />);

        const pokemonWeight = screen.getByTestId('pokemon-weight');
        expect(pokemonWeight).toHaveTextContent(/Average weight: 8.5 kg/i);
      });

    it('Verifica se a imagem do Pokémon aparece na tela', () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemon }
        isFavorite={ false }
      />);

      const image = screen.getByRole('img');
      expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
      expect(image).toHaveAttribute('alt', 'Charmander sprite');
      // documentação: https://react-test.dev/#tohaveattribute
    });

    it('Verifica se o card contém um link de navegação para exibir detalhes do Pokémon',
      () => {
        renderWithRouter(<Pokemon
          pokemon={ pokemon }
          isFavorite={ false }
        />);

        const linkDetails = screen.getByRole('link', { name: /More details/i });
        expect(linkDetails).toHaveAttribute('href', '/pokemons/4');
      });

    it('Verifica se ao clicar no link detalhes, redireciona para a pagina correspondente',
      () => {
        const { history } = renderWithRouter(<Pokemon
          pokemon={ pokemon }
          isFavorite={ false }
        />);

        const linkDetails = screen.getByRole('link', { name: /More details/i });
        userEvent.click(linkDetails);
        expect(history.location.pathname).toBe('/pokemons/4');
      });

    describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
      it('Verifica se o ícone é uma imagem com o atributo src /star-icon.svg', () => {
        renderWithRouter(<Pokemon
          pokemon={ pokemon }
          isFavorite
        />);

        const favorite = screen.getByRole('img',
          { name: /marked as favorite/i });
        expect(favorite).toHaveAttribute('src', '/star-icon.svg');
        expect(favorite).toBeDefined();
      });
    });
  });
});
