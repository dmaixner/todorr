import { createSelector } from 'reselect';
import { FILTER } from '../consts';

export const getTodos = (state) => state.todos;
export const getFilter = (state) => state.filter;

export const getAllCount = createSelector(getTodos, (todos) => todos.length);
export const getActiveCount = createSelector(getTodos, (todos) => todos.filter(t => !t.completed).length);

export const getFilteredTodos = createSelector([getTodos, getFilter], (todos, filter) => {
  return todos.filter(t =>
    filter === FILTER.ALL ||
    (!t.completed && filter === FILTER.ACTIVE) ||
    (t.completed && filter === FILTER.COMPLETED))
});
