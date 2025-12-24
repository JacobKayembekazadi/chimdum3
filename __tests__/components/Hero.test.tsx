import { describe, it, expect, vi } from 'vitest';

import Hero from '../../components/Hero';
import { render, screen } from '../../src/test-utils';

describe('Hero', () => {
  it('should render hero content', () => {
    const onStartText = vi.fn();
    const onStartVoice = vi.fn();

    render(<Hero onStartText={onStartText} onStartVoice={onStartVoice} />);

    expect(screen.getByText(/Learn What Your/i)).toBeInTheDocument();
    expect(screen.getByText(/Take the Quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/Speak to Guide/i)).toBeInTheDocument();
  });

  it('should call onStartText when quiz button is clicked', () => {
    const onStartText = vi.fn();
    const onStartVoice = vi.fn();

    render(<Hero onStartText={onStartText} onStartVoice={onStartVoice} />);

    const quizButton = screen.getByText(/Take the Quiz/i);
    quizButton.click();

    expect(onStartText).toHaveBeenCalledTimes(1);
  });

  it('should call onStartVoice when voice button is clicked', () => {
    const onStartText = vi.fn();
    const onStartVoice = vi.fn();

    render(<Hero onStartText={onStartText} onStartVoice={onStartVoice} />);

    const voiceButton = screen.getByText(/Speak to Guide/i);
    voiceButton.click();

    expect(onStartVoice).toHaveBeenCalledTimes(1);
  });
});

