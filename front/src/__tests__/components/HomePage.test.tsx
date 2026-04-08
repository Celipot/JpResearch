import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../HomePage';

describe('HomePage', () => {
  it('displays the welcome title', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Bienvenue/i })).toBeInTheDocument();
  });

  it('displays the summary section', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Synopsis/i })).toBeInTheDocument();
  });

  it('shows a link to the number revision page', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /Révision de nombres/i })).toHaveAttribute(
      'href',
      '/revision'
    );
  });

  it('shows a link to the hour revision page', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /Révision d'heures/i })).toHaveAttribute(
      'href',
      '/hour'
    );
  });

  it('shows a link to the date revision page', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /Révision de dates/i })).toHaveAttribute(
      'href',
      '/date'
    );
  });
});
