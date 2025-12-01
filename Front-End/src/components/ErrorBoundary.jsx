import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can log the error to an external service here
    // console.error('ErrorBoundary caught error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2 style={{ margin: 0, color: '#111827' }}>Something went wrong.</h2>
          <p style={{ color: '#6b7280' }}>The dashboard encountered an error while rendering. Open the browser console for details.</p>
          <details style={{ whiteSpace: 'pre-wrap', background: '#fff', padding: 12, borderRadius: 6 }}>
            {String(this.state.error && this.state.error.toString())}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
