import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';

const pokemons = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: `This intelligent Pokémon roasts hard
  berries with electricity to make them tender enough to eat.`,
}];

const match = {
  params: {
    id: 25,
  },
};

const pikachuLocation = 'Pikachu location';

const checkboxText = 'Pokémon favoritado?';

describe('Teste o componente <PokemonDetails.js />', () => {
  describe('As informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      it('Verifica se a página contém um texto <name> Details', () => {
        renderWithRouter(
          <PokemonDetails
            pokemons={ pokemons }
            match={ match }
            onUpdateFavoritePokemons={ false }
            isPokemonFavoriteById={ false }
          />,
        );

        const pokemonDetails = screen.getByRole('heading', { name: /Pikachu Details/i });
        expect(pokemonDetails).toBeInTheDocument();
      });

      it('Verifica se NÃO existir o link de navegação', () => {
        renderWithRouter(
          <PokemonDetails
            pokemons={ pokemons }
            match={ match }
            onUpdateFavoritePokemons={ false }
            isPokemonFavoriteById={ false }
          />,
        );

        // queryBy verifica algo sem dar erro no getBy: https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing
        const linkMore = screen.queryByText(/more details/i);
        expect(linkMore).not.toBeInTheDocument();
      });

      it('Verifica se a seção de detalhes contém um heading h2 com o texto Summary',
        () => {
          renderWithRouter(
            <PokemonDetails
              pokemons={ pokemons }
              match={ match }
              onUpdateFavoritePokemons={ false }
              isPokemonFavoriteById={ false }
            />,
          );

          const titleSummary = screen.getByRole('heading', { name: /Summary/i });
          expect(titleSummary).toBeDefined();
        });

      it('Verifica se contém um parágrafo com o resumo do Pokémon específico',
        () => {
          renderWithRouter(
            <PokemonDetails
              pokemons={ pokemons }
              match={ match }
              onUpdateFavoritePokemons={ false }
              isPokemonFavoriteById={ false }
            />,
          );

          const headingSummary = screen.getByText(/This intelligent Pokémon /i);
          expect(headingSummary).toBeDefined();
        });
    });

  describe('Na página tem uma seção com os mapas contendo as localizações do pokémon',
    () => {
      it('Verifica se em detalhes existe um heading com o texto Game Locations of <name>',
        () => {
          renderWithRouter(
            <PokemonDetails
              pokemons={ pokemons }
              match={ match }
              onUpdateFavoritePokemons={ false }
              isPokemonFavoriteById={ false }
            />,
          );

          const gameLocations = screen.getByRole('heading',
            { name: /Game Locations of Pikachu/i });
          expect(gameLocations).toBeDefined();
        });

      it('Verifica se todas as localizações do Pokémon são exibidas',
        () => {
          renderWithRouter(
            <PokemonDetails
              pokemons={ pokemons }
              match={ match }
              onUpdateFavoritePokemons={ false }
              isPokemonFavoriteById={ false }
            />,
          );

          const gameLocations = screen.getAllByRole('img',
            { name: pikachuLocation });
          expect(gameLocations).toHaveLength(2);
        });

      it('Verifica se o nome da localização e uma imagem do mapa são exibidos',
        () => {
          renderWithRouter(
            <PokemonDetails
              pokemons={ pokemons }
              match={ match }
              onUpdateFavoritePokemons={ false }
              isPokemonFavoriteById={ false }
            />,
          );

          const viridianForest = screen.getByText(/Kanto Viridian Forest/i);
          expect(viridianForest).toBeDefined();

          const powerPlant = screen.getByText(/Kanto Power Plant/i);
          expect(powerPlant).toBeDefined();

          const imgLocation = screen.getAllByRole('img', { name: pikachuLocation });
          expect(imgLocation).toHaveLength(2);
          expect(imgLocation[0]).toBeDefined();
          expect(imgLocation[1]).toBeDefined();
        });

      it('Verifica se imagem da localização tem um atributo src com a URL da localização',
        () => {
          renderWithRouter(
            <PokemonDetails
              pokemons={ pokemons }
              match={ match }
              onUpdateFavoritePokemons={ false }
              isPokemonFavoriteById={ false }
            />,
          );

          const imgLocation = screen.getAllByRole('img', { name: pikachuLocation });
          expect(imgLocation).toHaveLength(2);
          expect(imgLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
          expect(imgLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
        });

      it('Verifica se a imagem da localização tem um atributo alt <pokemon> location',
        () => {
          renderWithRouter(
            <PokemonDetails
              pokemons={ pokemons }
              match={ match }
              onUpdateFavoritePokemons={ false }
              isPokemonFavoriteById={ false }
            />,
          );

          const imgLocation = screen.getAllByRole('img', { name: pikachuLocation });
          expect(imgLocation).toHaveLength(2);
        });
    });

  describe('O usuário pode favoritar um pokémon através da página de detalhes', () => {
    it('Verifica se a página tem um checkbox que permite favoritar o Pokémon', () => {
      renderWithRouter(
        <PokemonDetails
          pokemons={ pokemons }
          match={ match }
          onUpdateFavoritePokemons={ false }
          isPokemonFavoriteById={ false }
        />,
      );

      const favoriteCheck = screen.getByRole('checkbox', { name: checkboxText });
      expect(favoriteCheck).toBeDefined();
    });

    it('Verifica se clicar add ou remove o Pokémon de favoritos',
      () => {
        renderWithRouter(
          <App />,
        );

        const linkDetails = screen.getByRole('link', { name: /more details/i });
        userEvent.click(linkDetails);

        const favoriteCheck = screen.getByRole('checkbox', { name: checkboxText });
        expect(favoriteCheck).toBeDefined();

        userEvent.click(favoriteCheck);
        expect(favoriteCheck).toBeChecked();

        userEvent.click(favoriteCheck);
        expect(favoriteCheck).not.toBeChecked();
      });

    it('Verifica se label do checkbox deve conter o texto Pokémon favoritado?',
      () => {
        renderWithRouter(
          <PokemonDetails
            pokemons={ pokemons }
            match={ match }
            onUpdateFavoritePokemons={ false }
            isPokemonFavoriteById={ false }
          />,
        );

        const favoriteCheck = screen.getByText(checkboxText);
        expect(favoriteCheck).toBeDefined();
      });
  });
});
