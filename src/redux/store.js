import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import store from './reducer';

export default createStore(
  store,
  applyMiddleware(thunk, createLogger({ collapsed: true }))
);
