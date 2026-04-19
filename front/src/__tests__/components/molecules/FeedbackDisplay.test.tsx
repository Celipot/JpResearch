import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeedbackDisplay } from '../../../components/molecules/FeedbackDisplay';

describe('FeedbackDisplay', () => {
  it('when feedback is null, then renders nothing', () => {
    // Given
    const { container } = render(<FeedbackDisplay feedback={null} />);

    // Then
    expect(container).toBeEmptyDOMElement();
  });

  it('when feedback is correct, then shows correct message', () => {
    // Given
    render(<FeedbackDisplay feedback="correct" />);

    // Then
    expect(screen.getByText(/✓ Correct/i)).toBeInTheDocument();
  });

  it('when feedback is incorrect, then shows incorrect message', () => {
    // Given
    render(<FeedbackDisplay feedback="incorrect" />);

    // Then
    expect(screen.getByText(/✗ Incorrect/i)).toBeInTheDocument();
  });

  it('when feedback is correct with correctMessage, then shows extra content', () => {
    // Given
    render(<FeedbackDisplay feedback="correct" correctMessage={<> C'était 42.</>} />);

    // Then
    expect(screen.getByText(/C'était 42/i)).toBeInTheDocument();
  });
});
