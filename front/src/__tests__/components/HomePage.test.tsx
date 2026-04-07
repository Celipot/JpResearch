import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../HomePage';

describe('HomePage', () => {
  it('given a render, then displays the welcome title', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Bienvenue/i })).toBeInTheDocument();
  });

  it('given a render, then displays the summary section', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Sommaire/i })).toBeInTheDocument();
  });

  it('given a render, then shows a link to the random number generator', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /Générateur de nombre aléatoire/i })).toHaveAttribute('href', '/random');
  });

  it('given a render, then shows a link to the random hour generator', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /Générateur d'heure aléatoire/i })).toHaveAttribute('href', '/hour');
  });
});
