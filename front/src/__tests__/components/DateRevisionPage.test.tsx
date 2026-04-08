import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DateRevisionPage from '../../DateRevisionPage';

beforeEach(() => {
  vi.restoreAllMocks();
});

const mockDateResponse = {
  year: 2024,
  month: 6,
  day: 20,
  hiragana: 'にせんにじゅうよんねんろくがつつはつか',
  romaji: 'nisennijūyonnenrokugatsuhatsuka',
  japaneseFormat: '2024年6月20日',
  allPronunciations: [
    {
      hiragana: 'にせんにじゅうよんねんろくがつつはつか',
      romaji: 'nisennijūyonnenrokugatsuhatsuka',
      isStandard: true,
    },
  ],
};

const mockSimpleDateResponse = {
  year: 2024,
  month: 2,
  day: 16,
  hiragana: 'にせんにじゅうよんねんにがつつじゅうろくにち',
  romaji: 'nisennijūyonennigatsujūrokunichi',
  japaneseFormat: '2024年2月16日',
  allPronunciations: [
    {
      hiragana: 'にせんにじゅうよんねんにがつつじゅうろくにち',
      romaji: 'nisennijūyonennigatsujūrokunichi',
      isStandard: true,
    },
  ],
};

describe('DateRevisionPage', () => {
  it('given the page, then displays mode selector buttons', () => {
    render(
      <MemoryRouter>
        <DateRevisionPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /Japonais → Français/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Français → Japonais/i })).toBeInTheDocument();
  });

  it('given jp-to-fr mode, then shows audio controls by default', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockDateResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <DateRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Nouvelle date/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Réécouter/i })).toBeInTheDocument();
    });
  });

  it('given switching to fr-to-jp mode, then shows answer input', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockDateResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <DateRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouvelle date/i }));

    await waitFor(() => {
      expect(screen.getByText('2024年6月20日')).toBeInTheDocument();
    });
    expect(screen.getByLabelText(/Écrivez en hiragana ou romaji/i)).toBeInTheDocument();
  });

  it('given jp-to-fr mode, then shows correct feedback when answering correctly', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSimpleDateResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <DateRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Nouvelle date/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Réécouter/i })).toBeInTheDocument();
    });

    const input = screen.getByLabelText(/Quelle date est-ce/i);
    fireEvent.change(input, { target: { value: '16 février 2024' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
  });

  it('given jp-to-fr mode, then shows incorrect feedback when answering incorrectly', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSimpleDateResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <DateRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Nouvelle date/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Réécouter/i })).toBeInTheDocument();
    });

    const input = screen.getByLabelText(/Quelle date est-ce/i);
    fireEvent.change(input, { target: { value: '17 février 2024' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    expect(await screen.findByText(/✗ Incorrect/i)).toBeInTheDocument();
  });

  it('given fr-to-jp mode, then shows correct feedback when answering in hiragana correctly', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSimpleDateResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <DateRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouvelle date/i }));

    await waitFor(() => {
      expect(screen.getByText('2024年2月16日')).toBeInTheDocument();
    });

    const input = screen.getByLabelText(/Écrivez en hiragana ou romaji/i);
    fireEvent.change(input, { target: { value: 'にせんにじゅうよんねんにがつつじゅうろくにち' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
  });

  it('given fr-to-jp mode, then shows correct feedback when answering in romaji correctly', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSimpleDateResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <DateRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouvelle date/i }));

    await waitFor(() => {
      expect(screen.getByText('2024年2月16日')).toBeInTheDocument();
    });

    const input = screen.getByLabelText(/Écrivez en hiragana ou romaji/i);
    fireEvent.change(input, { target: { value: 'nisennijūyonennigatsujūrokunichi' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
  });

  it('given fr-to-jp mode, then shows incorrect feedback when answering incorrectly', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSimpleDateResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <DateRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouvelle date/i }));

    await waitFor(() => {
      expect(screen.getByText('2024年2月16日')).toBeInTheDocument();
    });

    const input = screen.getByLabelText(/Écrivez en hiragana ou romaji/i);
    fireEvent.change(input, { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    expect(await screen.findByText(/✗ Incorrect/i)).toBeInTheDocument();
  });

  it('given fr-to-jp mode, then displays both hiragana and romaji after answering', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockDateResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <DateRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouvelle date/i }));

    await waitFor(() => {
      expect(screen.getByText('2024年6月20日')).toBeInTheDocument();
    });

    const input = screen.getByLabelText(/Écrivez en hiragana ou romaji/i);
    fireEvent.change(input, { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    await waitFor(() => {
      expect(screen.getByText(/✗ Incorrect/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Afficher les prononciations/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/にせんにじゅうよんねんろくがつつはつか/i).length).toBeGreaterThan(
        0
      );
      expect(screen.getAllByText(/nisennijūyonnenrokugatsuhatsuka/i).length).toBeGreaterThan(0);
    });
  });
});
