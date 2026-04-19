import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdjectiveRevisionPage from '../../AdjectiveRevisionPage';
import * as revisionService from '../../services/revisionService';

vi.mock('../../services/revisionService');

const mockIAdjective = {
  hiragana: 'たかい',
  type: 'i' as const,
  translation: 'high/expensive',
  tense: 'present' as const,
  polarity: 'negative' as const,
  register: 'familiar' as const,
  answers: ['たかくない'],
};

const mockNaAdjective = {
  hiragana: 'きれい',
  type: 'na' as const,
  translation: 'clean/pretty',
  tense: 'present' as const,
  polarity: 'affirmative' as const,
  register: 'familiar' as const,
  answers: ['きれいだ'],
};

describe('AdjectiveRevisionPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
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
    vi.mocked(revisionService.getRandomAdjective).mockResolvedValue(mockIAdjective);

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
    vi.mocked(revisionService.getRandomAdjective).mockResolvedValue(mockIAdjective);

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
    vi.mocked(revisionService.getRandomAdjective).mockResolvedValue(mockIAdjective);
    vi.mocked(revisionService.checkAnswer).mockResolvedValue(true);

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
    vi.mocked(revisionService.getRandomAdjective).mockResolvedValue(mockIAdjective);
    vi.mocked(revisionService.checkAnswer).mockResolvedValue(false);

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

  it('when incorrect answer submitted and multiple answers exist, then shows all answers in feedback', async () => {
    // Given
    const mockPoliteNegative = {
      hiragana: 'たかい',
      type: 'i' as const,
      translation: 'high/expensive',
      tense: 'present' as const,
      polarity: 'negative' as const,
      register: 'polite' as const,
      answers: ['たかくありません', 'たかくないです'],
    };
    vi.mocked(revisionService.getRandomAdjective).mockResolvedValue(mockPoliteNegative);
    vi.mocked(revisionService.checkAnswer).mockResolvedValue(false);

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
    fireEvent.change(input, { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

    // Then
    expect(await screen.findByText(/たかくありません/i)).toBeInTheDocument();
    expect(await screen.findByText(/たかくないです/i)).toBeInTheDocument();
  });

  it('when pressing Enter in answer input, then submits answer', async () => {
    // Given
    vi.mocked(revisionService.getRandomAdjective).mockResolvedValue(mockIAdjective);
    vi.mocked(revisionService.checkAnswer).mockResolvedValue(true);

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
    vi.mocked(revisionService.getRandomAdjective).mockResolvedValue(mockIAdjective);
    vi.mocked(revisionService.checkAnswer).mockResolvedValue(false);

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
    vi.mocked(revisionService.getRandomAdjective).mockResolvedValue(mockNaAdjective);
    fireEvent.click(screen.getByRole('button', { name: /Nouvel adjectif/i }));

    // Then
    await waitFor(() => {
      expect(screen.queryByText(/✗ Incorrect/i)).not.toBeInTheDocument();
      expect(input.value).toBe('');
    });
  });
});
