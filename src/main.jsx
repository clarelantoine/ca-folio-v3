import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';

import App from './App';
import Experience from './components/Experience';

import './index.scss';
import { PortfolioProvider } from './contexts/portfolio.context';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <PortfolioProvider>
                <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
                    <Suspense>
                        <Experience />
                    </Suspense>
                </Canvas>
                <App />
            </PortfolioProvider>
        </BrowserRouter>
    </React.StrictMode>
);
