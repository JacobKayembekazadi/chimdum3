import React, { Component, ErrorInfo, ReactNode } from 'react';

import { logReactError, getUserFriendlyErrorMessage } from '../utils/errorLogger';

import ErrorDisplay from './ErrorDisplay';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error for debugging
    logReactError(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorMessage = this.state.error
        ? getUserFriendlyErrorMessage(this.state.error)
        : 'An unexpected error occurred. Please refresh the page.';

      return (
        <ErrorDisplay
          title="Application Error"
          message={errorMessage}
          onRetry={this.handleReset}
          showRetry={true}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

