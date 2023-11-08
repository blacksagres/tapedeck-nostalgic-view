import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';
import App from '@/App.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@/components/theme-provider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
