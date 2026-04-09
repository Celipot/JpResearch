import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GrammarRevisionPage from '../../GrammarRevisionPage';

beforeEach(() => {
  vi.restoreAllMocks();
});

const mockFillInTheBlankExercise = {
  type: 'fill-in-the-blank',
  rule: { id: 'wa', particle: 'は', name: 'Topic', description: 'Marque le sujet du discours' },
  question: 'わたし___がくせいです。',
  correctAnswers: ['は'],
  options: null,
  explanation: 'は marque le topic : わたし est ce dont on parle.',
};

const mockMultipleChoiceExercise = {
  type: 'multiple-choice',
  rule: { id: 'wa', particle: 'は', name: 'Topic', description: 'Marque le sujet du discours' },
  question: 'やまださん___いしゃです。',
  correctAnswers: ['は'],
  options: ['は', 'が', 'を', 'に', 'で'],
  explanation: 'は marque le topic.',
};

const mockTranslationExercise = {
  type: 'translation',
  rule: { id: 'wa', particle: 'は', name: 'Topic', description: 'Marque le sujet du discours' },
  question: 'Je suis étudiant.',
  correctAnswers: ['わたしはがくせいです', 'watashi wa gakusei desu'],
  options: null,
  explanation: 'わたし + は + がくせいです.',
};

const mockTranslationWithMacronExercise = {
  type: 'translation',
  rule: { id: 'wa', particle: 'は', name: 'Topic', description: 'Marque le sujet du discours' },
  question: "C'est bon, n'est-ce pas ?",
  correctAnswers: ['おいしいですね', 'oishii desu ne'],
  options: null,
  explanation: "おいしい (délicieux) + ですね (n'est-ce pas ?).",
};

const mockFetch = (response: object) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(response) })
  ) as unknown as typeof fetch;
};

describe('GrammarRevisionPage', () => {
  it('displays the page title', () => {
    // Given
    render(
      <MemoryRouter>
        <GrammarRevisionPage />
      </MemoryRouter>
    );

    // Then
    expect(screen.getByText(/Révision de grammaire/i)).toBeInTheDocument();
  });

  it('displays a button to fetch a new exercise', () => {
    // Given
    render(
      <MemoryRouter>
        <GrammarRevisionPage />
      </MemoryRouter>
    );

    // Then
    expect(screen.getByRole('button', { name: /Nouvel exercice/i })).toBeInTheDocument();
  });

  describe('fill-in-the-blank', () => {
    it('displays the question with a blank', async () => {
      // Given
      mockFetch(mockFillInTheBlankExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );

      // When
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));

      // Then
      await waitFor(() => {
        expect(screen.getByText(/わたし___がくせいです。/)).toBeInTheDocument();
      });
    });

    it('displays a text input for the answer', async () => {
      // Given
      mockFetch(mockFillInTheBlankExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );

      // When
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));

      // Then
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
    });

    it('shows correct feedback when the answer is は', async () => {
      // Given
      mockFetch(mockFillInTheBlankExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));
      await waitFor(() => screen.getByRole('textbox'));

      // When
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'は' } });
      fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

      // Then
      expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
    });

    it('shows correct feedback when the answer is romaji wa instead of は', async () => {
      // Given
      mockFetch(mockFillInTheBlankExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));
      await waitFor(() => screen.getByRole('textbox'));

      // When
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'wa' } });
      fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

      // Then
      expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
    });

    it('shows correct feedback when the answer is alternate romaji ha instead of は', async () => {
      // Given
      mockFetch(mockFillInTheBlankExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));
      await waitFor(() => screen.getByRole('textbox'));

      // When
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'ha' } });
      fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

      // Then
      expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
    });

    it('shows incorrect feedback when the answer is wrong', async () => {
      // Given
      mockFetch(mockFillInTheBlankExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));
      await waitFor(() => screen.getByRole('textbox'));

      // When
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'が' } });
      fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

      // Then
      expect(await screen.findByText(/✗ Incorrect/i)).toBeInTheDocument();
    });

    it('shows explanation after answering', async () => {
      // Given
      mockFetch(mockFillInTheBlankExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));
      await waitFor(() => screen.getByRole('textbox'));

      // When
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'が' } });
      fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

      // Then
      expect(
        await screen.findByText(/は marque le topic : わたし est ce dont on parle./i)
      ).toBeInTheDocument();
    });
  });

  describe('multiple-choice', () => {
    it('displays option buttons', async () => {
      // Given
      mockFetch(mockMultipleChoiceExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );

      // When
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));

      // Then
      await waitFor(() => {
        expect(screen.getByText(/やまださん___いしゃです。/)).toBeInTheDocument();
        const buttons = screen.getAllByRole('button');
        expect(buttons.some((b) => b.textContent === 'は')).toBe(true);
        expect(buttons.some((b) => b.textContent === 'が')).toBe(true);
        expect(buttons.some((b) => b.textContent === 'を')).toBe(true);
        expect(buttons.some((b) => b.textContent === 'に')).toBe(true);
        expect(buttons.some((b) => b.textContent === 'で')).toBe(true);
      });
    });

    it('shows correct feedback when the correct option is selected', async () => {
      // Given
      mockFetch(mockMultipleChoiceExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));
      await waitFor(() => {
        expect(screen.getByText(/やまださん___いしゃです。/)).toBeInTheDocument();
      });

      // When
      const buttons = screen.getAllByRole('button');
      const waButton = buttons.find(
        (b) => b.textContent === 'は' && b.className.includes('option-btn')
      );
      fireEvent.click(waButton!);

      // Then
      expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
    });

    it('shows incorrect feedback when a wrong option is selected', async () => {
      // Given
      mockFetch(mockMultipleChoiceExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));
      await waitFor(() => {
        expect(screen.getByText(/やまださん___いしゃです。/)).toBeInTheDocument();
      });

      // When
      const buttons = screen.getAllByRole('button');
      const gaButton = buttons.find(
        (b) => b.textContent === 'が' && b.className.includes('option-btn')
      );
      fireEvent.click(gaButton!);

      // Then
      expect(await screen.findByText(/✗ Incorrect/i)).toBeInTheDocument();
    });
  });

  describe('translation', () => {
    it('displays the french sentence to translate', async () => {
      // Given
      mockFetch(mockTranslationExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );

      // When
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));

      // Then
      await waitFor(() => {
        expect(screen.getByText('Je suis étudiant.')).toBeInTheDocument();
      });
    });

    it('shows correct feedback when the hiragana answer is correct', async () => {
      // Given
      mockFetch(mockTranslationExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));
      await waitFor(() => screen.getByRole('textbox'));

      // When
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'わたしはがくせいです' },
      });
      fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

      // Then
      expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
    });

    it('shows correct feedback when the romaji answer is correct', async () => {
      // Given
      mockFetch(mockTranslationExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));
      await waitFor(() => screen.getByRole('textbox'));

      // When
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'watashi wa gakusei desu' },
      });
      fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

      // Then
      expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
    });

    it('shows incorrect feedback when the answer is wrong', async () => {
      // Given
      mockFetch(mockTranslationExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));
      await waitFor(() => screen.getByRole('textbox'));

      // When
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'mauvaise réponse' } });
      fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

      // Then
      expect(await screen.findByText(/✗ Incorrect/i)).toBeInTheDocument();
    });

    it('shows correct feedback when the romaji answer is correct (watashi wa gakusei desu)', async () => {
      // Given
      mockFetch(mockTranslationExercise);
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));
      await waitFor(() => screen.getByRole('textbox'));

      // When
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'watashi wa gakusei desu' },
      });
      fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

      // Then
      expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
    });

    it('accepts double vowel (oo) when the correct answer uses a macron (ō)', async () => {
      // Given — correct answer stored with macron ō
      mockFetch({
        ...mockTranslationWithMacronExercise,
        correctAnswers: ['おおきいです', 'ōkii desu'],
      });
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));
      await waitFor(() => screen.getByRole('textbox'));

      // When — user types with double vowel instead of macron
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'ookii desu' } });
      fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

      // Then
      expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
    });

    it('accepts double vowel (uu) when the correct answer uses a macron (ū)', async () => {
      // Given — correct answer stored with macron ū
      mockFetch({
        ...mockTranslationWithMacronExercise,
        correctAnswers: ['じゅうです', 'jū desu'],
      });
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));
      await waitFor(() => screen.getByRole('textbox'));

      // When — user types with double u instead of macron
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'juu desu' } });
      fireEvent.click(screen.getByRole('button', { name: /Vérifier/i }));

      // Then
      expect(await screen.findByText(/✓ Correct/i)).toBeInTheDocument();
    });
  });

  describe('rule selector', () => {
    type RuleButtonTestCase = {
      particle: string;
      ruleId: string;
    };

    const RULE_BUTTONS: RuleButtonTestCase[] = [
      { particle: 'は', ruleId: 'wa' },
      { particle: 'を', ruleId: 'wo' },
      { particle: 'が', ruleId: 'ga' },
      { particle: 'に', ruleId: 'ni' },
      { particle: 'で', ruleId: 'de' },
      { particle: 'から', ruleId: 'kara' },
      { particle: 'まで', ruleId: 'made' },
      { particle: 'も', ruleId: 'mo' },
      { particle: 'の', ruleId: 'no' },
      { particle: 'へ', ruleId: 'he' },
      { particle: 'と', ruleId: 'to' },
      { particle: 'や', ruleId: 'ya' },
      { particle: 'より', ruleId: 'yori' },
      { particle: 'だけ', ruleId: 'dake' },
    ];

    it('displays buttons for all supported rules', () => {
      // Given
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );

      // Then
      RULE_BUTTONS.forEach(({ particle }) => {
        expect(screen.getByRole('button', { name: particle })).toBeInTheDocument();
      });
    });

    it('は is selected by default', () => {
      // Given
      render(
        <MemoryRouter>
          <GrammarRevisionPage />
        </MemoryRouter>
      );

      // Then
      expect(screen.getByRole('button', { name: 'は' })).toHaveClass('active');
      expect(screen.getByRole('button', { name: 'を' })).not.toHaveClass('active');
      expect(screen.getByRole('button', { name: 'が' })).not.toHaveClass('active');
    });

    describe('single rule selection', () => {
      RULE_BUTTONS.forEach(({ particle, ruleId }) => {
        it(`given rule ${particle} is selected, then fetch uses rule=${ruleId}`, async () => {
          // Given
          mockFetch(mockFillInTheBlankExercise);
          vi.spyOn(Math, 'random').mockReturnValue(0.6);
          render(
            <MemoryRouter>
              <GrammarRevisionPage />
            </MemoryRouter>
          );

          // When
          if (particle !== 'は') {
            fireEvent.click(screen.getByRole('button', { name: particle }));
          }
          fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));

          // Then
          await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(`rule=${ruleId}`));
          });
        });
      });
    });

    describe('multi-selection', () => {
      it('allows selecting multiple rules', () => {
        // Given
        render(
          <MemoryRouter>
            <GrammarRevisionPage />
          </MemoryRouter>
        );

        // When
        fireEvent.click(screen.getByRole('button', { name: 'を' }));
        fireEvent.click(screen.getByRole('button', { name: 'が' }));

        // Then
        expect(screen.getByRole('button', { name: 'は' })).toHaveClass('active');
        expect(screen.getByRole('button', { name: 'を' })).toHaveClass('active');
        expect(screen.getByRole('button', { name: 'が' })).toHaveClass('active');
      });

      it('allows deselecting a rule', () => {
        // Given
        render(
          <MemoryRouter>
            <GrammarRevisionPage />
          </MemoryRouter>
        );

        // When
        fireEvent.click(screen.getByRole('button', { name: 'は' }));

        // Then
        expect(screen.getByRole('button', { name: 'は' })).not.toHaveClass('active');
      });

      it('given multiple rules are selected, fetch should use one of them', async () => {
        // Given
        mockFetch(mockFillInTheBlankExercise);
        render(
          <MemoryRouter>
            <GrammarRevisionPage />
          </MemoryRouter>
        );

        // When
        fireEvent.click(screen.getByRole('button', { name: 'を' }));
        fireEvent.click(screen.getByRole('button', { name: 'が' }));
        fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));

        // Then
        await waitFor(() => {
          const call = (global.fetch as any).mock.calls[0][0];
          expect(call).toMatch(/rule=(wa|wo|ga|ni|de|kara|made|mo|no|he|to|ya|yori|dake)/);
        });
      });

      it('does not fetch when no rule is selected', async () => {
        // Given
        mockFetch(mockFillInTheBlankExercise);
        render(
          <MemoryRouter>
            <GrammarRevisionPage />
          </MemoryRouter>
        );

        // When
        fireEvent.click(screen.getByRole('button', { name: 'は' }));
        fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));

        // Then
        await waitFor(() => {
          expect(global.fetch).not.toHaveBeenCalled();
        });
      });

      it('clears the exercise when a rule is toggled', async () => {
        // Given
        mockFetch(mockFillInTheBlankExercise);
        render(
          <MemoryRouter>
            <GrammarRevisionPage />
          </MemoryRouter>
        );
        fireEvent.click(screen.getByRole('button', { name: /Nouvel exercice/i }));
        await waitFor(() => {
          expect(screen.getByText(/わたし___がくせいです。/)).toBeInTheDocument();
        });

        // When
        fireEvent.click(screen.getByRole('button', { name: 'を' }));

        // Then
        expect(screen.queryByText(/わたし___がくせいです。/)).not.toBeInTheDocument();
      });
    });
  });

  describe('navigation', () => {
    it('displays a link to navigate to this page', () => {
      // Given
      render(
        <MemoryRouter initialEntries={['/grammar']}>
          <GrammarRevisionPage />
        </MemoryRouter>
      );

      // Then — page renders without crashing
      expect(screen.getByText(/Révision de grammaire/i)).toBeInTheDocument();
    });
  });
});
