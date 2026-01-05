// src/errors/ErrorBoundary.tsx
import { Component, type ComponentType, type ReactNode } from 'react';
import { ErrorView } from '../ui/feedback/ErrorView';

type FallbackProps = { message?: string; onRetry?: () => void };

type Props = {
  children: ReactNode;
  // 👇 AQUI é tipo, não valor:
  FallbackComponent?: ComponentType<FallbackProps>;
  onRetry?: () => void;
};

type State = { hasError: boolean; message?: string };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: undefined };

  static getDerivedStateFromError(err: unknown): State {
    return { hasError: true, message: String((err as any)?.message ?? err) };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // opcional: log
  }

  private handleRetry = () => {
    this.setState({ hasError: false, message: undefined });
    this.props.onRetry?.();
  };

  render() {
    const { children, FallbackComponent = ErrorView } = this.props; // aqui é valor
    if (this.state.hasError) {
      return <FallbackComponent message={this.state.message} onRetry={this.handleRetry} />;
    }
    return children;
  }
}
