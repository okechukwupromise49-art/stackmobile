import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Toaster } from "react-hot-toast";
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#111",
              borderRadius: "12px",
              padding: "16px",
              fontSize: "14px",
            },
          }}
        />
        <App />
      </BrowserRouter>
  
  </React.StrictMode>
);