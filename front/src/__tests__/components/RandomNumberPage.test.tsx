import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RandomNumberPage from '../../RandomNumberPage';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('RandomNumberPage', () => {
  it('given a render, then displays the title and generate button', () => {
    render(
      <MemoryRouter>
        <RandomNumberPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Random Number Generator/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Générer un nombre aléatoire/i })).toBeInTheDocument();
  });

  it('given a click on generate button, then calls the API and displays the result', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ number: 42, hiragana: 'よんじゅうに', romaji: 'yonjūni', allPronunciations: [{ hiragana: 'よんじゅうに', romaji: 'yonjūni', isStandard: true }] }),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <RandomNumberPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Générer un nombre aléatoire/i }));

    await waitFor(() => {
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });

  it('given a result, when clicking show pronunciation, then displays hiragana and romaji', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ number: 42, hiragana: 'よんじゅうに', romaji: 'yonjūni', allPronunciations: [{ hiragana: 'よんじゅうに', romaji: 'yonjūni', isStandard: true }, { hiragana: 'しじゅうに', romaji: 'shijūni', isStandard: false }] }),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <RandomNumberPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Générer un nombre aléatoire/i }));

    await waitFor(() => {
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Afficher la prononciation/i }));

    expect(screen.getByText('よんじゅうに')).toBeInTheDocument();
    expect(screen.getByText('yonjūni')).toBeInTheDocument();
  });
});
