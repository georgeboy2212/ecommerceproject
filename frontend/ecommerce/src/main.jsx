import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import 'uikit/dist/js/uikit-icons.min.js';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
