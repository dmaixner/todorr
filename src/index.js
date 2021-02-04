import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'

import App from './components/App';
import AppReducers from './reducers/index';

import './index.css';

const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true
});

let store = createStore(AppReducers, applyMiddleware(logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
