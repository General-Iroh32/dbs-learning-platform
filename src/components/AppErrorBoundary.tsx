import { Component, type ErrorInfo, type ReactNode } from 'react';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unbehandelter Anwendungsfehler', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="mx-auto flex min-h-screen max-w-2xl items-center px-6">
          <section className="w-full rounded-lg bg-white p-8 shadow-md" role="alert">
            <h1 className="mb-3 text-2xl font-bold text-gray-900">Die Anwendung konnte nicht geladen werden</h1>
            <p className="mb-6 text-gray-600">
              Ein unerwarteter Fehler ist aufgetreten. Lade die Seite neu, um die Sitzung zurückzusetzen.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Seite neu laden
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
