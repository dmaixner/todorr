import { SET_TODOS, FILTER_TODOS } from '../actions';
import { FILTER } from '../consts';

const initialState = {
  todos: null,
  filter: FILTER.ALL
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.todos };
    case FILTER_TODOS:
      return { ...state, filter: action.filter };
    default:
      return state;
  }
}

export default todoReducer;