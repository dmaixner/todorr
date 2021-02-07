import { combineReducers } from 'redux';
import todo from './todo';
import alert from './alert';

const reducers = combineReducers({
  todo,
  alert
})

export default reducers;