export const FETCH_TODOS = 'FETCH_TODOS';
export const fetchTodos = () => ({
  type: FETCH_TODOS
});

export const SET_TODOS = 'SET_TODOS';
export const setTodos = (todos) => ({
  type: SET_TODOS,
  todos
});

export const FETCH_ADD_TODO = 'FETCH_ADD_TODO';
export const fetchAddTodo = (text) => ({
  type: FETCH_ADD_TODO,
  text
});

export const SET_ADD_TODO = 'SET_ADD_TODO';
export const setAddTodo = (todo) => ({
  type: SET_ADD_TODO,
  todo
});

export const SET_FILTER = 'SET_FILTER';
export const setFilter = (filter) => ({
  type: SET_FILTER,
  filter
});

export const SET_INPUT_TEXT = 'SET_INPUT_TEXT';
export const setInputText = (inputText) => ({
  type: SET_INPUT_TEXT,
  inputText
});

export const SET_ALERT = 'SET_ALERT';
export const setAlert = (text, style) => ({
  type: SET_ALERT,
  text,
  style
});

export const FETCH_DELETE_TODO = 'FETCH_DELETE_TODO';
export const fetchDeleteTodo = (id) => ({
  type: FETCH_DELETE_TODO,
  id
});

export const SET_DELETE_TODO = 'SET_DELETE_TODO';
export const setDeleteTodo = (id) => ({
  type: SET_DELETE_TODO,
  id
});

export const SET_TODO_UPDATING = 'SET_TODO_UPDATING';
export const setTodoUpdating = (id, text) => ({
  type: SET_TODO_UPDATING,
  id,
  text
});

export const FETCH_UPDATE_TODO = 'FETCH_UPDATE_TODO';
export const fetchUpdateTodo = (id, text) => ({
  type: FETCH_UPDATE_TODO,
  id,
  text
});

export const SET_UPDATE_TODO = 'SET_UPDATE_TODO';
export const setUpdateTodo = (id, text) => ({
  type: SET_UPDATE_TODO,
  id,
  text
});

export const FETCH_SWITCH_TODO = 'FETCH_SWITCH_TODO';
export const fetchSwitchTodo = (id, completed) => ({
  type: FETCH_SWITCH_TODO,
  id,
  completed
});

export const SET_SWITCH_TODO = 'SET_SWITCH_TODO';
export const setSwitchTodo = (id, completed) => ({
  type: SET_SWITCH_TODO,
  id,
  completed
});

