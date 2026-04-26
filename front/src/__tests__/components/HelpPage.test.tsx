import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HelpPage from '../../HelpPage';

describe('HelpPage', () => {
  it('when rendering, then displays Japanese activation instructions', () => {
    // Given / When
    render(<HelpPage />);

    // Then
    expect(screen.getByRole('heading', { name: /Aide/i })).toBeInTheDocument();
    expect(screen.getByText(/Heure et langue/i)).toBeInTheDocument();
  });
});
