import { SET_TODOS, FILTER_TODOS } from '../actions';
import { FILTER } from '../consts';

const initialState = {
  todos: null,
  filter: FILTER.ALL,
  filteredTodos: null
}

function filterTodos(todos, filter) {
  return todos.filter(t =>
    filter === FILTER.ALL ||
    (!t.completed && filter === FILTER.ACTIVE) ||
    (t.completed && filter === FILTER.COMPLETED))
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.todos, filteredTodos: filterTodos(action.todos, state.filter) };
    case FILTER_TODOS:
      return { ...state, filter: action.filter, filteredTodos: filterTodos(state.todos, action.filter) };
    default:
      return state;
  }
}

export default todoReducer;