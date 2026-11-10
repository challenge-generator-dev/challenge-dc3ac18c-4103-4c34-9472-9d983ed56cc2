import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="font-bold">Error</h2>
          <p>{error.message}</p>
          <button
            onClick={resetErrorBoundary}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reintentar
          </button>
        </div>
      )}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);