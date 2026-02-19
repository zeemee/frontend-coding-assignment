import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DrinkCard from './DrinkCard';
import type { DrinkSummary } from '../types';
import { renderWithRouter } from '../test-utils';

const mockDrink: DrinkSummary = {
  id: 1,
  name: 'Margarita',
  category: 'Cocktail',
  image: "https://www.thecocktaildb.com/images/media/drink/fgq2bl1492975771.jpg",
};

describe('DrinkCard', () => {
  it('renders the drink card component', async () => {
    renderWithRouter(<DrinkCard drink={mockDrink} />);

    expect(await screen.findByText('Margarita')).toBeInTheDocument();
    expect(screen.getByText('Cocktail')).toBeInTheDocument();
  });

  it('renders a link to the drink detail page', async () => {
    renderWithRouter(<DrinkCard drink={mockDrink} />);

    const link = await screen.findByRole('link');
    expect(link).toHaveAttribute('href', '/drink/1');
  });
});
