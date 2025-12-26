import { describe, it, expect, vi } from 'vitest';

import ErrorDisplay from '../../components/ErrorDisplay';
import { render, screen } from '../../src/test-utils';

describe('ErrorDisplay', () => {
  it('should render error message', () => {
    render(<ErrorDisplay message="Test error message" />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('should render custom title', () => {
    render(<ErrorDisplay title="Custom Title" message="Error" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('should call onRetry when retry button is clicked', () => {
    const onRetry = vi.fn();
    render(<ErrorDisplay message="Error" onRetry={onRetry} showRetry={true} />);

    const retryButton = screen.getByLabelText('Retry operation');
    retryButton.click();

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should call onDismiss when dismiss button is clicked', () => {
    const onDismiss = vi.fn();
    render(<ErrorDisplay message="Error" onDismiss={onDismiss} />);

    const dismissButton = screen.getByLabelText('Dismiss error');
    dismissButton.click();

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('should not show retry button when showRetry is false', () => {
    render(<ErrorDisplay message="Error" showRetry={false} />);
    expect(screen.queryByLabelText('Retry operation')).not.toBeInTheDocument();
  });
});

