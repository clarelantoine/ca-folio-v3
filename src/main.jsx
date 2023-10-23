import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';

import { Loader } from '@react-three/drei';
import App from './App';
import Experience from './components/Experience';

import './index.scss';
import { PortfolioProvider } from './contexts/portfolio.context';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <PortfolioProvider>
                <Canvas
                    gl={{ antialias: false }}
                    dpr={[1, 1.5]}
                    // camera={{
                    //     fov: 75,
                    //     near: 0.1,
                    //     far: 1000,
                    //     position: [0, 0, 5],
                    // }}
                >
                    <Suspense fallback={null}>
                        <Experience />
                    </Suspense>
                </Canvas>
                <App />
                <Loader />
            </PortfolioProvider>
        </BrowserRouter>
    </React.StrictMode>
);
