import { createSelector } from 'reselect';
import { FILTER } from '../consts';

export const getTodos = (state) => state.todos;

export const getFilter = (state) => state.filter;

function filterTodos(todos, filter) {
  return todos.filter(t =>
    filter === FILTER.ALL ||
    (!t.completed && filter === FILTER.ACTIVE) ||
    (t.completed && filter === FILTER.COMPLETED))
}

export const getFilteredTodos = createSelector([getTodos, getFilter], filterTodos);
