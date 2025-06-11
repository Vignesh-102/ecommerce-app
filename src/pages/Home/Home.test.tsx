// Home.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';

jest.mock('../components/ProductCard', () => ({ product }: any) => (
  <div data-testid="mock-product">{product.name}</div>
));

describe('Home component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('shows loading initially', () => {
    render(<Home />);
    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });

  test('renders products on success', async () => {
    const mockResponse = {
      data: {
        products: [
          { id: 1, name: 'Product A', category: 'Cat A', price: 100 },
          { id: 2, name: 'Product B', category: 'Cat B', price: 200 },
        ],
      },
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    ) as jest.Mock;

    render(<Home />);

    await waitFor(() =>
      expect(screen.getAllByTestId('mock-product').length).toBe(2)
    );

    expect(screen.queryByText(/loading products/i)).not.toBeInTheDocument();
  });

  test('shows error message on fetch failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ errors: [{ message: 'Fetch error' }] }),
      })
    ) as jest.Mock;

    render(<Home />);

    await waitFor(() =>
      expect(screen.getByText(/error: fetch error/i)).toBeInTheDocument()
    );
  });

});
