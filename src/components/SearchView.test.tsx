import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchView from './SearchView';

vi.mock('../hooks/useSearch', () => ({
  useSearch: vi.fn(),
}));

import { useSearch } from '../hooks/useSearch';
const mockUseSearch = vi.mocked(useSearch);

describe('SearchView', () => {

  it('shows "All Drinks" title when no query', () => {
    mockUseSearch.mockReturnValue({
      drinks: [],
      totalCount: 0,
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 0,
      hasPrev: false,
      hasNext: false,
      nextPage: vi.fn(),
      prevPage: vi.fn(),
    });

    render(<SearchView query="" navigate={() => {}} />);
    expect(screen.getByText('All Drinks')).toBeInTheDocument();
  });

  it('shows results title when query is set', () => {
    mockUseSearch.mockReturnValue({
      drinks: [
        { id: 1, name: 'Margarita', category: 'Cocktail', image: "https://www.thecocktaildb.com/images/media/drink/fgq2bl1492975771.jpg" },
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
    });

    render(<SearchView query="margarita" navigate={() => {}} />);
    expect(screen.getByText('Results for "margarita"')).toBeInTheDocument();
  });

  it('renders drink cards', () => {
    mockUseSearch.mockReturnValue({
      drinks: [
        { id: 1, name: 'Margarita', category: 'Cocktail', image: "https://www.thecocktaildb.com/images/media/drink/fgq2bl1492975771.jpg" },
        { id: 2, name: 'Mojito', category: 'Cocktail', image: "https://www.thecocktaildb.com/images/media/drink/fgq2bl1492975771.jpg" },
      ],
      totalCount: 2,
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      hasPrev: false,
      hasNext: false,
      nextPage: vi.fn(),
      prevPage: vi.fn(),
    });

    render(<SearchView query="" navigate={() => {}} />);
    expect(screen.getByText('Margarita')).toBeInTheDocument();
    expect(screen.getByText('Mojito')).toBeInTheDocument();
  });
});
