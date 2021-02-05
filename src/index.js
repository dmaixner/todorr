import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import createSagaMiddleware from 'redux-saga';

import App from './components/App';
import todoReducer from './reducers';
import rootSaga from './sagas';

import './theme.scss';

const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true
});

const sagaMiddleware = createSagaMiddleware()

let store = createStore(todoReducer, applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
