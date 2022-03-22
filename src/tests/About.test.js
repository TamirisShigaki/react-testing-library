import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa se a página contém as informações sobre a Pokédex', () => {
  it('Verifica se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading',
      { name: 'About Pokédex' });
    expect(title).toBeDefined();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraph1 = screen.getByText(/containing all Pokémons/i);
    expect(paragraph1).toBeDefined();

    const paragraph2 = screen.getByText(/filter Pokémons/i);
    expect(paragraph2).toBeDefined();
  });

  it('Verifica se a página contém imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
