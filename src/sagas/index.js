import { all, call, takeLatest, put } from 'redux-saga/effects';
import { FETCH_TODOS, setTodos, FETCH_ADD_TODO, setAddTodo, setInputText } from '../actions';

const fetchTodosFromApi = () => {
  return fetch("http://localhost:8080/todos")
    .then(res => res.json())
    .then(json => json)
    .catch(err => { });
}

function* fetchTodos() {
  const todos = yield call(fetchTodosFromApi);
  yield put(setTodos(todos));
}

function* watchFetchTodos() {
  yield takeLatest(FETCH_TODOS, fetchTodos);
}

const fetchAddTodoFromApi = (text) => {
  return fetch("http://localhost:8080/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 'text': text })
  })
    .then(res => res.json())
    .then(json => json)
    .catch(err => { });
}

function* fetchAddTodo(action) {
  const todo = yield call(fetchAddTodoFromApi, action.text);
  yield put(setInputText(''));
  yield put(setAddTodo(todo));
}

function* watchFetchAddTodo() {
  yield takeLatest(FETCH_ADD_TODO, fetchAddTodo);
}

const todosSagas = [
  fetchTodos(),
  watchFetchTodos(),
  watchFetchAddTodo()
];

export default function* rootSaga() {
  yield all(todosSagas);
}