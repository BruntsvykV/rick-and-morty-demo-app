import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Providers } from "./store/provider";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Providers>
        <App/>
      </Providers>
    </BrowserRouter>
  </React.StrictMode>
);
