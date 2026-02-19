import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { routeTree } from './router';

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

function renderApp(initialEntry = '/') {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const memoryHistory = createMemoryHistory({ initialEntries: [initialEntry] });
  const router = createRouter({ routeTree, history: memoryHistory });

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  window.history.pushState(null, '', '/');
});

describe('App', () => {
  it('renders the header with BarCraft', async () => {
    renderApp();
    expect(await screen.findByText('BarCraft')).toBeInTheDocument();
  });

  it('shows search view by default', async () => {
    renderApp();
    expect(await screen.findByText('All Drinks')).toBeInTheDocument();
  });

  it('switches to detail view when a drink card is clicked', async () => {
    renderApp();

    const link = await screen.findByText('Margarita');
    fireEvent.click(link);

    expect(await screen.findByText('Shake and serve.')).toBeInTheDocument();
    expect(screen.getByText(/Back/)).toBeInTheDocument();
  });

  it('switches back to search view when back is clicked', async () => {
    renderApp();

    const link = await screen.findByText('Margarita');
    fireEvent.click(link);

    const backBtn = await screen.findByText(/Back/);
    fireEvent.click(backBtn);

    expect(await screen.findByText('All Drinks')).toBeInTheDocument();
  });

  it('triggers search when GO is clicked', async () => {
    renderApp();

    const input = await screen.findByPlaceholderText('Search all drinks');
    fireEvent.change(input, { target: { value: 'mojito' } });
    fireEvent.click(screen.getByText('GO'));

    expect(await screen.findByText('Results for "mojito"')).toBeInTheDocument();
  });

  it('renders detail view when URL has /drink/:id', async () => {
    renderApp('/drink/1');

    expect(await screen.findByText('Shake and serve.')).toBeInTheDocument();
  });
});
