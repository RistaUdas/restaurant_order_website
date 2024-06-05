import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// index.js or App.js
import '@fortawesome/fontawesome-free/css/all.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
