import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RandomHourPage from '../../RandomHourPage';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('RandomHourPage', () => {
  it('given a render, then displays the title and generate button', () => {
    render(
      <MemoryRouter>
        <RandomHourPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Random Hour Generator/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Générer une heure aléatoire/i })).toBeInTheDocument();
  });

  it('given a click on generate button, then calls the API and displays the result', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ hour: 12, minute: 30, hiragana: 'じゅうにじさんじゅっぷん', romaji: 'jūnijisanjuppun' }),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <RandomHourPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Générer une heure aléatoire/i }));

    await waitFor(() => {
      expect(screen.getByText('12h30')).toBeInTheDocument();
    });
  });

  it('given a result, when clicking show pronunciation, then displays hiragana and romaji', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ hour: 12, minute: 30, hiragana: 'じゅうにじさんじゅっぷん', romaji: 'jūnijisanjuppun' }),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <RandomHourPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Générer une heure aléatoire/i }));

    await waitFor(() => {
      expect(screen.getByText('12h30')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Afficher la prononciation/i }));

    expect(screen.getByText('じゅうにじさんじゅっぷん')).toBeInTheDocument();
    expect(screen.getByText('jūnijisanjuppun')).toBeInTheDocument();
  });
});
