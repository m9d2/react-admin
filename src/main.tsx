import App from '@/App.tsx';
import Loading from '@/components/loading/loading.tsx';
import { worker } from '@/mocks/browser.ts';
import '@/styles/global.scss';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </React.StrictMode>,
);

document.addEventListener('DOMContentLoaded', function () {
  worker
    .start({
      serviceWorker: {
        url: 'mockServiceWorker.js',
      },
      onUnhandledRequest: 'bypass',
    })
    .then();
});
