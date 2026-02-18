import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DrinkCard from './DrinkCard';
import type { DrinkSummary } from '../types';

const mockDrink: DrinkSummary = {
  id: 1,
  name: 'Margarita',
  category: 'Cocktail',
  image: "https://www.thecocktaildb.com/images/media/drink/fgq2bl1492975771.jpg",
};

describe('DrinkCard', () => {
  it('renders the drink card component', () => {
    render(<DrinkCard drink={mockDrink} navigate={() => {}} />);

    expect(screen.getByText('Margarita')).toBeInTheDocument();
    expect(screen.getByText('Cocktail')).toBeInTheDocument();
  });

  it('calls navigate with the drink URL on click', () => {
    const navigate = vi.fn();
    render(<DrinkCard drink={mockDrink} navigate={navigate} />);

    fireEvent.click(screen.getByRole('link'));
    expect(navigate).toHaveBeenCalledWith('/drink/1');
  });
});
