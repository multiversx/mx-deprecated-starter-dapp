import React from 'react';
import ReactDOM from 'react-dom';
import { StateInspector } from 'reinspect';
import App from './App';
import './assets/styles/theme.scss';

let MountedApp = <App />;

if (process.env.NODE_ENV === 'development') {
  MountedApp = (
    <StateInspector name="App">
      <App />
    </StateInspector>
  );
}

ReactDOM.render(MountedApp, document.getElementById('root'));
