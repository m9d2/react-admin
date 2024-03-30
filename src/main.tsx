import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from "@/App.tsx";
import '@/styles/global.scss';
import {worker} from "@/mocks/browser.ts";
import Loading from "@/components/loading.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Suspense fallback={<Loading/>}>
            <App/>
        </Suspense>
    </React.StrictMode>
);

worker.start({
    serviceWorker: {
        url: 'mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass',
}).then()