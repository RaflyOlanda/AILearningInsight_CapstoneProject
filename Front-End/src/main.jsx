// src/main.jsx

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Pastikan path dan nama file CSS benar (index.css)
import App from './App.jsx'; // WAJIB: Cek casing A pada App.jsx

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> // WAJIB: Pastikan App dipanggil seperti ini
  </StrictMode>
);