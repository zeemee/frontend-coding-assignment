import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import DetailView from './DetailView';
import {useDrinkDetail} from '../hooks/useDrinkDetail';

vi.mock('../hooks/useDrinkDetail', () => ({
    useDrinkDetail: vi.fn(),
}));

const mockUseDrinkDetail = vi.mocked(useDrinkDetail);

const mockDrink = {
    id: 1,
    name: 'Margarita',
    category: 'Cocktail',
    image: "https://www.thecocktaildb.com/images/media/drink/fgq2bl1492975771.jpg",
    instructions: 'Shake with ice and serve.',
    container: 'Cocktail glass',
    ingredients: [
        {measurement: '1 oz', name: 'Tequila'},
        {measurement: '0.5 oz', name: 'Lime Juice'},
    ],
};

beforeEach(() => {
    mockUseDrinkDetail.mockReset();
});

describe('DetailView', () => {
    it('shows loading spinner', () => {
        mockUseDrinkDetail.mockReturnValue({drink: null, isLoading: true, error: null});

        render(<DetailView drinkId={1} navigate={() => {
        }}/>);
        expect(screen.getByAltText('Loading...')).toBeInTheDocument();
    });

    it('renders drink details', () => {
        mockUseDrinkDetail.mockReturnValue({drink: mockDrink, isLoading: false, error: null});

        render(<DetailView drinkId={1} navigate={() => {
        }}/>);

        expect(screen.getByText('Margarita')).toBeInTheDocument();
    });




    it('calls navigate with "/" when back button clicked', () => {
        mockUseDrinkDetail.mockReturnValue({drink: mockDrink, isLoading: false, error: null});

        const navigate = vi.fn();
        render(<DetailView drinkId={1} navigate={navigate}/>);

        fireEvent.click(screen.getByText(/Back/));
        expect(navigate).toHaveBeenCalledWith('/');
    });
});
