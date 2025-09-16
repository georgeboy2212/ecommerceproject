import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import 'uikit/dist/js/uikit-icons.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
