import React from 'react';
import ReactDOM from 'react-dom';
import { StateInspector } from 'reinspect';
import App from './App';
import './assets/sass/theme.scss';

let MountedApp = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (process.env.NODE_ENV === 'development') {
  MountedApp = (
    <StateInspector name="App">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StateInspector>
  );
}

ReactDOM.render(MountedApp, document.getElementById('root'));