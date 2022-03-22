import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Verifica se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(title).toBeDefined();
  });

  it('Verifica se a página contém imagem de Error', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
