'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './button';
import { Card } from './card';
import * as Sentry from '@sentry/nextjs';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
  errorInfo?: React.ErrorInfo;
}

// Компонент отображения ошибки по умолчанию
function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="mx-auto max-w-md border-slate-700 bg-slate-800/50">
        <div className="p-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>

          <h1 className="mb-3 text-xl font-semibold text-white">
            Упс! Что-то пошло не так
          </h1>

          <p className="mb-6 text-sm text-slate-400">
            Произошла неожиданная ошибка. Мы уже работаем над её исправлением.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <details className="mb-6 text-left">
              <summary className="mb-2 cursor-pointer text-sm font-medium text-red-400">
                Детали ошибки (только для разработки)
              </summary>
              <div className="rounded-lg bg-slate-900/50 p-4 text-xs text-slate-300">
                <pre className="whitespace-pre-wrap break-words">
                  {error.name}: {error.message}
                  {error.stack && (
                    <>
                      {'\n\nStack trace:\n'}
                      {error.stack}
                    </>
                  )}
                </pre>
              </div>
            </details>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={resetError}
              className="flex items-center justify-center gap-2"
              variant="default"
            >
              <RefreshCw className="h-4 w-4" />
              Попробовать снова
            </Button>

            <Button
              onClick={handleGoHome}
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              На главную
            </Button>

            <Button
              onClick={handleReload}
              variant="ghost"
              className="text-slate-400 hover:text-white"
            >
              Перезагрузить
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Error Boundary класс
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Отправляем ошибку в Sentry
    Sentry.withScope((scope) => {
      scope.setTag('errorBoundary', true);
      scope.setLevel('error');
      scope.setContext('errorInfo', {
        componentStack: errorInfo.componentStack,
      });
      scope.setContext('errorBoundary', {
        fallbackType: this.props.fallback ? 'custom' : 'default',
        hasError: this.state.hasError,
      });
      Sentry.captureException(error);
    });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;

      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
          errorInfo={this.state.errorInfo || undefined}
        />
      );
    }

    return this.props.children;
  }
}

// Hook для использования в функциональных компонентах
export function useErrorHandler() {
  return React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);

    // Отправляем ошибку в Sentry через хук
    Sentry.withScope((scope) => {
      scope.setTag('errorHandler', true);
      scope.setLevel('error');
      if (errorInfo) {
        scope.setContext('errorInfo', {
          componentStack: errorInfo.componentStack,
        });
      }
      Sentry.captureException(error);
    });
  }, []);
}

// Компонент-обертка для легкого использования
export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: React.ComponentType<ErrorFallbackProps>
) {
  const WrappedComponent = (props: T) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
