import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-blue/theme.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
