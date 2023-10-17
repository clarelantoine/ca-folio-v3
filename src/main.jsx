import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import { PerspectiveCamera, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import App from './App';
import Slider from './components/slider/slider.component';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
                <ambientLight intensity={1.5} />
                <Suspense>
                    <Slider />
                    <Preload />
                </Suspense>
            </Canvas>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
