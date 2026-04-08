import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../HomePage';

describe('HomePage', () => {
  it('displays the welcome title', () => {
    // Given
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Then
    expect(screen.getByRole('heading', { name: /Bienvenue/i })).toBeInTheDocument();
  });

  it('displays the summary section', () => {
    // Given
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Then
    expect(screen.getByRole('heading', { name: /Sommaire/i })).toBeInTheDocument();
  });

  it('shows a link to the number revision page', () => {
    // Given
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Then
    expect(screen.getByRole('link', { name: /Révision de nombres/i })).toHaveAttribute(
      'href',
      '/revision'
    );
  });

  it('shows a link to the hour revision page', () => {
    // Given
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Then
    expect(screen.getByRole('link', { name: /Révision d'heures/i })).toHaveAttribute(
      'href',
      '/hour'
    );
  });
});
