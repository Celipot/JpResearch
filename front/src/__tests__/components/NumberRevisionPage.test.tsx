import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NumberRevisionPage from '../../NumberRevisionPage';

beforeEach(() => {
  vi.restoreAllMocks();
});

const mockNumberResponse = {
  number: 414,
  hiragana: 'よんひゃくじゅうよん',
  romaji: 'yonhyakujuuyon',
  allPronunciations: [
    { hiragana: 'よんひゃくじゅうよん', romaji: 'yonhyakujuuyon', isStandard: false },
    { hiragana: 'よんひゃくじゅうし', romaji: 'yonhyakujuushi', isStandard: false },
    { hiragana: 'よんひゃくじゅうよん', romaji: 'yonhyakujūyon', isStandard: true },
    { hiragana: 'よんひゃくじゅうし', romaji: 'yonhyakujuushi', isStandard: true },
  ],
};

const mockSimpleNumberResponse = {
  number: 10,
  hiragana: 'じゅう',
  romaji: 'jū',
  allPronunciations: [{ hiragana: 'じゅう', romaji: 'jū', isStandard: true }],
};

describe('NumberRevisionPage', () => {
  it('displays mode selector buttons', () => {
    // Given
    render(
      <MemoryRouter>
        <NumberRevisionPage />
      </MemoryRouter>
    );

    // Then
    expect(screen.getByRole('button', { name: /Japonais → Français/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Français → Japonais/i })).toBeInTheDocument();
  });

  it('displays range selector inputs', () => {
    // Given
    render(
      <MemoryRouter>
        <NumberRevisionPage />
      </MemoryRouter>
    );

    // Then
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs).toHaveLength(2);
    expect(inputs[0]).toHaveAttribute('min', '1');
    expect(inputs[0]).toHaveAttribute('max', '1000000000');
    expect(inputs[1]).toHaveAttribute('min', '1');
    expect(inputs[1]).toHaveAttribute('max', '1000000000');
  });

  it('default max value is 1000000000', () => {
    // Given
    render(
      <MemoryRouter>
        <NumberRevisionPage />
      </MemoryRouter>
    );

    // Then
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs[1]).toHaveValue(1000000000);
  });

  it('jp-to-fr mode shows audio controls by default', async () => {
    // Given
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockNumberResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <NumberRevisionPage />
      </MemoryRouter>
    );

    // When
    fireEvent.click(screen.getByRole('button', { name: /Nouveau nombre/i }));

    // Then
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Réécouter/i })).toBeInTheDocument();
    });
  });

  it('switching to fr-to-jp mode shows answer input', async () => {
    // Given
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockNumberResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <NumberRevisionPage />
      </MemoryRouter>
    );

    // When
    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouveau nombre/i }));

    // Then
    await waitFor(() => {
      expect(screen.getByText('414')).toBeInTheDocument();
    });
    expect(screen.getByLabelText(/Écrivez en hiragana ou romaji/i)).toBeInTheDocument();
  });

  it('fr-to-jp mode shows correct feedback when answering in hiragana correctly', async () => {
    // Given
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSimpleNumberResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <NumberRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouveau nombre/i }));

    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Écrivez en hiragana ou romaji/i);
    fireEvent.change(input, { target: { value: 'じゅう' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    // Then
    expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
  });

  it('fr-to-jp mode shows correct feedback when answering in romaji with double u', async () => {
    // Given
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSimpleNumberResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <NumberRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouveau nombre/i }));

    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Écrivez en hiragana ou romaji/i);
    fireEvent.change(input, { target: { value: 'juu' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    // Then
    expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
  });

  it('fr-to-jp mode shows correct feedback when answering with multiple u (juuu)', async () => {
    // Given
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSimpleNumberResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <NumberRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouveau nombre/i }));

    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Écrivez en hiragana ou romaji/i);
    fireEvent.change(input, { target: { value: 'juuu' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    // Then
    expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
  });

  it('fr-to-jp mode shows correct feedback when answering with macron (jū)', async () => {
    // Given
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSimpleNumberResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <NumberRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouveau nombre/i }));

    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Écrivez en hiragana ou romaji/i);
    fireEvent.change(input, { target: { value: 'jū' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    // Then
    expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
  });

  it('fr-to-jp mode shows incorrect feedback when answering incorrectly', async () => {
    // Given
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSimpleNumberResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <NumberRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouveau nombre/i }));

    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Écrivez en hiragana ou romaji/i);
    fireEvent.change(input, { target: { value: 'nana' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    // Then
    expect(await screen.findByText(/✗ Incorrect/i)).toBeInTheDocument();
  });

  it('fr-to-jp mode displays both hiragana and romaji after answering', async () => {
    // Given
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockNumberResponse),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <NumberRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouveau nombre/i }));

    await waitFor(() => {
      expect(screen.getByText('414')).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Écrivez en hiragana ou romaji/i);
    fireEvent.change(input, { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    await waitFor(() => {
      expect(screen.getByText(/✗ Incorrect/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Afficher les prononciations/i }));

    // Then
    await waitFor(() => {
      expect(screen.getAllByText(/よんひゃくじゅうよん/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/yonhyakujuuyon/i).length).toBeGreaterThan(0);
    });
  });
});
