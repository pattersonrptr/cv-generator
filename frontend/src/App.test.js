import { render } from '@testing-library/react';
import App from './App';

// Mock the api service to avoid axios ESM import issue in Jest
jest.mock('./services/api', () => ({
  curriculoAPI: {
    getAll: jest.fn(() => Promise.resolve({ data: [] })),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  },
}));

test('renders without crashing', () => {
  render(<App />);
});

test('renders header element', () => {
  const { container } = render(<App />);
  const header = container.querySelector('header');
  expect(header).toBeInTheDocument();
});
