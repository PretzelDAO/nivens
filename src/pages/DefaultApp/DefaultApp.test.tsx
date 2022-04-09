import React from 'react';
import { render, screen } from '@testing-library/react';
import DefaultApp from './DefaultApp';

test('renders learn react link', () => {
  render(<DefaultApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
