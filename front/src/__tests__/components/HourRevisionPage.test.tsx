import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HourRevisionPage from '../../HourRevisionPage';

beforeEach(() => {
  vi.restoreAllMocks();
});

const mockHourResponse = {
  hour: 4,
  minute: 4,
  hiragana: 'よじよんぷん',
  romaji: 'yojiyonpun',
  allPronunciations: [
    { hiragana: 'よじよんぷん', romaji: 'yojiyonpun', isStandard: true },
    { hiragana: 'よじしぷん', romaji: 'yojishipun', isStandard: false },
    { hiragana: 'しじよんぷん', romaji: 'shijiyonpun', isStandard: false },
    { hiragana: 'しじしぷん', romaji: 'shijishipun', isStandard: false },
  ],
};

const mockSimpleHourResponse = {
  hour: 12,
  minute: 30,
  hiragana: 'じゅうにじさんじゅっぷん',
  romaji: 'jūnijisanjuppun',
  allPronunciations: [
    { hiragana: 'じゅうにじさんじゅっぷん', romaji: 'jūnijisanjuppun', isStandard: true },
  ],
};

function mockFetch(hourResponse: object, checkAnswerCorrect?: boolean) {
  global.fetch = vi.fn((url: string | URL | Request) => {
    if (String(url).includes('check-answer')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ correct: checkAnswerCorrect }),
      });
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(hourResponse),
    });
  }) as unknown as typeof fetch;
}

describe('HourRevisionPage', () => {
  it('displays mode selector buttons', () => {
    // Given
    render(
      <MemoryRouter>
        <HourRevisionPage />
      </MemoryRouter>
    );

    // Then
    expect(screen.getByRole('button', { name: /Japonais → Français/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Français → Japonais/i })).toBeInTheDocument();
  });

  it('jp-to-fr mode shows audio controls by default', async () => {
    // Given
    mockFetch(mockHourResponse);

    render(
      <MemoryRouter>
        <HourRevisionPage />
      </MemoryRouter>
    );

    // When
    fireEvent.click(screen.getByRole('button', { name: /Nouvelle heure/i }));

    // Then
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Réécouter/i })).toBeInTheDocument();
    });
  });

  it('switching to fr-to-jp mode shows answer input', async () => {
    // Given
    mockFetch(mockHourResponse);

    render(
      <MemoryRouter>
        <HourRevisionPage />
      </MemoryRouter>
    );

    // When
    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouvelle heure/i }));

    // Then
    await waitFor(() => {
      expect(screen.getByText('4時04分')).toBeInTheDocument();
    });
    expect(screen.getByLabelText(/Écrivez en hiragana ou romaji/i)).toBeInTheDocument();
  });

  it('jp-to-fr mode shows correct feedback when answering correctly', async () => {
    // Given
    mockFetch(mockSimpleHourResponse);

    render(
      <MemoryRouter>
        <HourRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Nouvelle heure/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Réécouter/i })).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Quelle heure est-ce/i);
    fireEvent.change(input, { target: { value: '12h30' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    // Then
    expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
  });

  it('jp-to-fr mode shows incorrect feedback when answering incorrectly', async () => {
    // Given
    mockFetch(mockSimpleHourResponse);

    render(
      <MemoryRouter>
        <HourRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Nouvelle heure/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Réécouter/i })).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Quelle heure est-ce/i);
    fireEvent.change(input, { target: { value: '13h00' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    // Then
    expect(await screen.findByText(/✗ Incorrect/i)).toBeInTheDocument();
  });

  it('fr-to-jp mode shows correct feedback when answering in hiragana correctly', async () => {
    // Given
    mockFetch(mockSimpleHourResponse, true);

    render(
      <MemoryRouter>
        <HourRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouvelle heure/i }));

    await waitFor(() => {
      expect(screen.getByText('12時30分')).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Écrivez en hiragana ou romaji/i);
    fireEvent.change(input, { target: { value: 'じゅうにじさんじゅっぷん' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    // Then
    expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
  });

  it('fr-to-jp mode shows correct feedback when answering in romaji with uu', async () => {
    // Given
    mockFetch(mockSimpleHourResponse, true);

    render(
      <MemoryRouter>
        <HourRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouvelle heure/i }));

    await waitFor(() => {
      expect(screen.getByText('12時30分')).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Écrivez en hiragana ou romaji/i);
    fireEvent.change(input, { target: { value: 'juunijisanjuppun' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    // Then
    expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
  });

  it('fr-to-jp mode shows correct feedback when answering with multiple u (juuu)', async () => {
    // Given
    mockFetch(mockSimpleHourResponse, true);

    render(
      <MemoryRouter>
        <HourRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouvelle heure/i }));

    await waitFor(() => {
      expect(screen.getByText('12時30分')).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Écrivez en hiragana ou romaji/i);
    fireEvent.change(input, { target: { value: 'juuunijisanjuppun' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    // Then
    expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
  });

  it('fr-to-jp mode shows incorrect feedback when answering incorrectly', async () => {
    // Given
    mockFetch(mockSimpleHourResponse, false);

    render(
      <MemoryRouter>
        <HourRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouvelle heure/i }));

    await waitFor(() => {
      expect(screen.getByText('12時30分')).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Écrivez en hiragana ou romaji/i);
    fireEvent.change(input, { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    // Then
    expect(await screen.findByText(/✗ Incorrect/i)).toBeInTheDocument();
  });

  it('fr-to-jp mode displays both hiragana and romaji after answering', async () => {
    // Given
    mockFetch(mockHourResponse, false);

    render(
      <MemoryRouter>
        <HourRevisionPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Français → Japonais/i }));
    fireEvent.click(screen.getByRole('button', { name: /Nouvelle heure/i }));

    await waitFor(() => {
      expect(screen.getByText('4時04分')).toBeInTheDocument();
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
      expect(screen.getAllByText(/よじよんぷん/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/yojiyonpun/i).length).toBeGreaterThan(0);
    });
  });
});
