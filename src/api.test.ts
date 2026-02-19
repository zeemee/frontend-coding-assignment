import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchDrinks, getDrinkDetail } from './api';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

describe('searchDrinks', () => {
  it('builds the correct URL with query', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ totalCount: 1, drinks: [] }),
    });

    await searchDrinks('margarita', 0);

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('/api/search?');
    expect(url).toContain('index=0');
    expect(url).toContain('limit=6');
    expect(url).toContain('query=margarita');
  });
});

describe('getDrinkDetail', () => {
  it('builds the correct URL', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ drinks: [{}] }),
    });

    await getDrinkDetail(123);

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('/api/detail?id=123');
  });
});
