import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

vi.mock('./hooks/useSearch', () => ({
  useSearch: vi.fn().mockReturnValue({
    drinks: [
      { id: 1, name: 'Margarita', category: 'Cocktail', image: 'https://example.com/img.jpg' },
    ],
    totalCount: 1,
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    hasPrev: false,
    hasNext: false,
    nextPage: vi.fn(),
    prevPage: vi.fn(),
  }),
}));

vi.mock('./hooks/useDrinkDetail', () => ({
  useDrinkDetail: vi.fn().mockReturnValue({
    drink: {
      id: 1,
      name: 'Margarita',
      category: 'Cocktail',
      image: 'https://example.com/img.jpg',
      instructions: 'Shake and serve.',
      container: 'Cocktail glass',
      ingredients: [{ measurement: '1 oz', name: 'Tequila' }],
    },
    isLoading: false,
    error: null,
  }),
}));

beforeEach(() => {
  window.history.pushState(null, '', '/');
});

describe('App', () => {
  it('renders the header with BarCraft', () => {
    render(<App />);
    expect(screen.getByText('BarCraft')).toBeInTheDocument();
  });

  it('shows search view by default', () => {
    render(<App />);
    expect(screen.getByText('All Drinks')).toBeInTheDocument();
  });

  it('switches to detail view when a drink card is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Margarita'));

    expect(screen.getByText('Shake and serve.')).toBeInTheDocument();
    expect(screen.getByText(/Back/)).toBeInTheDocument();
  });

  it('switches back to search view when back is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Margarita'));
    fireEvent.click(screen.getByText(/Back/));

    expect(screen.getByText('All Drinks')).toBeInTheDocument();
  });

  it('triggers search when GO is clicked', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Search all drinks');
    fireEvent.change(input, { target: { value: 'mojito' } });
    fireEvent.click(screen.getByText('GO'));

    expect(screen.getByText('Results for "mojito"')).toBeInTheDocument();
  });

  it('renders detail view when URL has /drink/:id', () => {
    window.history.pushState(null, '', '/drink/1');

    render(<App />);

    expect(screen.getByText('Shake and serve.')).toBeInTheDocument();
  });
});
