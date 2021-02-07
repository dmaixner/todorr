import { combineReducers } from 'redux';
import todoList from './todolist';
import alert from './alert';

const reducers = combineReducers({
  todoList,
  alert
})

export default reducers;