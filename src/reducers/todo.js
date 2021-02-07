import { SET_TODOS, SET_FILTER, SET_ADD_TODO, SET_INPUT_TEXT } from '../actions';
import { FILTER } from '../consts';

const initialState = {
  todos: null,
  filter: FILTER.ALL,
  inputText: ''
}

const todo = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.todos };
    case SET_FILTER:
      return { ...state, filter: action.filter };
    case SET_ADD_TODO:
      return { ...state, todos: [action.todo, ...state.todos] };
    case SET_INPUT_TEXT:
      return { ...state, inputText: action.inputText };
    default:
      return state;
  }
}

export default todo;