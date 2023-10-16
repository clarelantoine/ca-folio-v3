import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalCanvas } from '@14islands/r3f-scroll-rig';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalCanvas />
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
