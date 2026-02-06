import React from 'react';
import Container from './Container';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white flex items-center">
          <Container className="py-16 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex justify-center">
                <div className="bg-red-100 p-6 rounded-full">
                  <AlertTriangle size={64} className="text-red-600" />
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900">Oops! Something went wrong</h1>

              <p className="text-lg text-gray-600">
                We're sorry, but something unexpected happened. Please try refreshing the page or return to the home page.
              </p>

              {import.meta.env.DEV && this.state.error && (
                <div className="bg-gray-100 p-4 rounded-lg text-left">
                  <p className="text-sm text-gray-700 font-mono">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={this.handleReset}
                >
                  Go to Home
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </Button>
              </div>
            </div>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
