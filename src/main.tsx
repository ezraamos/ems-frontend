import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className='flex flex-col items-center'>
        <div className='max-w-screen-3xl flex w-full  '>
          <div className='flex-grow'>
            <App />
          </div>
          <Toaster />
        </div>
      </div>
    </QueryClientProvider>
  </StrictMode>
);
