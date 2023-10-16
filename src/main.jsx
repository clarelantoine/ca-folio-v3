import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalCanvas>
                {(globalChildren) => <Suspense>{globalChildren}</Suspense>}
            </GlobalCanvas>
            <SmoothScrollbar />
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
