import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import Pokedex from '../components/Pokedex';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Teste o componente <Pokedex.js />', () => {
  it('Verifica se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(title).toBeDefined();
  });

  describe('Verifica se exibe o próximo Pokémon quando o botão Próximo pokémon é clicado',
    () => {
      it('Verifica se o botão contem o texto Próximo pokémon', () => {
        renderWithRouter(<Pokedex
          pokemons={ data }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />);

        const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
        expect(buttonNext).toBeInTheDocument();
      });

      it('Verifica se ao clicar no botão, os próximos Pokémons da lista são exibidos',
        () => {
          renderWithRouter(<Pokedex
            pokemons={ data }
            isPokemonFavoriteById={ isPokemonFavoriteById }
          />);

          const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
          expect(buttonNext).toBeInTheDocument();
          userEvent.click(buttonNext);
          const favorites = screen.getByText(/Charmander/i);
          expect(favorites).toBeInTheDocument();
        });

      it('Verifica se estiver no ultimo pokemon, retorna ao primeiro ao clicar no botão',
        () => {
          renderWithRouter(<Pokedex
            pokemons={ data }
            isPokemonFavoriteById={ isPokemonFavoriteById }
          />);

          const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
          expect(buttonNext).toBeInTheDocument();

          data.forEach(() => userEvent.click(buttonNext));

          // for (let index = 0; index < data.length; index += 1) {
          //   userEvent.click(buttonNext);
          // }

          const favorites = screen.getByText(/Pikachu/i);
          expect(favorites).toBeInTheDocument();
        });
    });

  it('Verifica se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });

  describe('Verifica se a Pokédex tem os botões de filtro.',
    () => {
      it('Verifica se existi um botão de filtragem para cada tipo de Pokémon', () => {
        renderWithRouter(<Pokedex
          pokemons={ data }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />);

        const typePokemons = [...new Set(data.map((pokemon) => pokemon.type))]; // cria um objeto de types sem repetições espalhando pelo array

        const filterTypes = screen.getAllByTestId('pokemon-type-button');
        expect(filterTypes).toHaveLength(typePokemons.length);
        filterTypes.forEach((element, index) => {
          expect(element).toHaveTextContent(typePokemons[index]); // verifico se cada botão tem o nome correspondente oa type
        });
      });

      it('Verifica se ao clicar em um botão(type), percorre os pokemons correspondentes',
        () => {
          renderWithRouter(<Pokedex
            pokemons={ data }
            isPokemonFavoriteById={ isPokemonFavoriteById }
          />);

          const pokemonTypes = screen.getByTestId('pokemon-type');
          const btntype = screen.getByRole('button', { name: /Fire/i });

          expect(btntype).toBeDefined();
          userEvent.click(btntype);
          expect(pokemonTypes).toHaveTextContent('Fire');
          expect(pokemonTypes).not.toHaveTextContent('Dragon');
        });
    });

  describe('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    it('Verifica se o texto do botão é All', () => {
      renderWithRouter(<Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      const btnAll = screen.getByRole('button', { name: /All/i });
      expect(btnAll).toBeDefined();
    });

    it('Verifica se quando clica no botão All, a Pokedéx mostra os Pokémons sem filtros',
      () => {
        renderWithRouter(<Pokedex
          pokemons={ data }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />);

        const btnAll = screen.getByRole('button', { name: /All/i });
        userEvent.click(btnAll);

        const pokemonName = screen.getByTestId('pokemon-name');
        expect(pokemonName).toHaveTextContent('Pikachu');
      });

    it('Verifica se ao carregar a página, o filtro selecionado é All', () => {
      renderWithRouter(<Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      const btnAll = screen.getByRole('button', { name: /All/i });
      expect(btnAll).toBeDefined();

      const pokemonTypes = screen.getByTestId('pokemon-type');
      expect(pokemonTypes).toHaveTextContent(/Electric/i);
    });
  });
});
