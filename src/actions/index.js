export const FETCH_TODOS = 'FETCH_TODOS';
export const fetchTodos = () => ({
  type: FETCH_TODOS
});

export const SET_TODOS = 'SET_TODOS';
export const setTodos = (todos) => ({
  type: SET_TODOS,
  todos
});