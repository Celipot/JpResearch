import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdjectiveRevisionPage from '../../AdjectiveRevisionPage';

const mockIAdjective = {
  hiragana: 'たかい',
  type: 'i' as const,
  translation: 'high/expensive',
  form: 'present_negative' as const,
  answer: 'たかくない',
};

const mockNaAdjective = {
  hiragana: 'きれい',
  type: 'na' as const,
  translation: 'clean/pretty',
  form: 'present_affirmative' as const,
  answer: 'きれいだ',
};

describe('AdjectiveRevisionPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('when page renders, then displays title', () => {
    // When
    render(
      <MemoryRouter>
        <AdjectiveRevisionPage />
      </MemoryRouter>
    );

    // Then
    expect(screen.getByRole('heading', { name: /Révision d'adjectifs/i })).toBeInTheDocument();
  });

  it('when page renders, then displays fetch button', () => {
    // When
    render(
      <MemoryRouter>
        <AdjectiveRevisionPage />
      </MemoryRouter>
    );

    // Then
    expect(screen.getByRole('button', { name: /Nouvel adjectif/i })).toBeInTheDocument();
  });

  it('when fetch button clicked, then displays adjective and form', async () => {
    // Given
    mockFetch(mockIAdjective);

    // When
    render(
      <MemoryRouter>
        <AdjectiveRevisionPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /Nouvel adjectif/i }));

    // Then
    await waitFor(() => {
      expect(screen.getByText(/たかい/i)).toBeInTheDocument();
      expect(screen.getByText(/présent négatif/i)).toBeInTheDocument();
    });
  });

  it('when adjective is loaded, then shows input field', async () => {
    // Given
    mockFetch(mockIAdjective);

    // When
    render(
      <MemoryRouter>
        <AdjectiveRevisionPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /Nouvel adjectif/i }));

    // Then
    await waitFor(() => {
      expect(screen.getByLabelText(/Conjugaison/i)).toBeInTheDocument();
    });
  });

  it('when correct answer submitted, then shows success feedback', async () => {
    // Given
    mockFetch(mockIAdjective);
    render(
      <MemoryRouter>
        <AdjectiveRevisionPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /Nouvel adjectif/i }));
    await waitFor(() => {
      expect(screen.getByLabelText(/Conjugaison/i)).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Conjugaison/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'たかくない' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    // Then
    expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
  });

  it('when incorrect answer submitted, then shows failure feedback with correct answer', async () => {
    // Given
    mockFetch(mockIAdjective);
    render(
      <MemoryRouter>
        <AdjectiveRevisionPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /Nouvel adjectif/i }));
    await waitFor(() => {
      expect(screen.getByLabelText(/Conjugaison/i)).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Conjugaison/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'wrong answer' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    // Then
    expect(await screen.findByText(/✗ Incorrect/i)).toBeInTheDocument();
    expect(await screen.findByText(/たかくない/i)).toBeInTheDocument();
  });

  it('when pressing Enter in answer input, then submits answer', async () => {
    // Given
    mockFetch(mockIAdjective);
    render(
      <MemoryRouter>
        <AdjectiveRevisionPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /Nouvel adjectif/i }));
    await waitFor(() => {
      expect(screen.getByLabelText(/Conjugaison/i)).toBeInTheDocument();
    });

    // When
    const input = screen.getByLabelText(/Conjugaison/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'たかくない' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // Then
    expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
  });

  it('when fetching new adjective after answer, then resets input and feedback', async () => {
    // Given
    mockFetch(mockIAdjective);
    render(
      <MemoryRouter>
        <AdjectiveRevisionPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /Nouvel adjectif/i }));
    await waitFor(() => {
      expect(screen.getByLabelText(/Conjugaison/i)).toBeInTheDocument();
    });
    const input = screen.getByLabelText(/Conjugaison/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));
    await waitFor(() => {
      expect(screen.getByText(/✗ Incorrect/i)).toBeInTheDocument();
    });

    // When
    mockFetch(mockNaAdjective);
    fireEvent.click(screen.getByRole('button', { name: /Nouvel adjectif/i }));

    // Then
    await waitFor(() => {
      expect(screen.queryByText(/✗ Incorrect/i)).not.toBeInTheDocument();
      expect(input.value).toBe('');
    });
  });
});

function mockFetch(response: object) {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response),
    })
  ) as unknown as typeof fetch;
}
