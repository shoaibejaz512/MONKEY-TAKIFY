import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FirebaseProvider } from './context/FirebaseAuthContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer,Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Don't forget the CSS
import 'hover.css/css/hover-min.css';
import 'animate.css'; 
import { Howl } from "howler";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseProvider>
      <Router>
        <App />
        <ToastContainer
        />
      </Router>
    </FirebaseProvider>
  </StrictMode>,
)
