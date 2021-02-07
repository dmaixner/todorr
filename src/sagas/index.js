import { all, call, takeLatest, put } from 'redux-saga/effects';
import { FETCH_TODOS, setTodos, FETCH_ADD_TODO, setAddTodo, setInputText, setAlert, FETCH_DELETE_TODO, setDeleteTodo, FETCH_UPDATE_TODO, setTodoUpdating, setUpdateTodo } from '../actions';
import { ALERT } from "../consts";

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
  if (action.text && action.text.trim()) {
    const actionText = action.text.trim();
    const todo = yield call(fetchAddTodoFromApi, actionText);
    yield put(setInputText(''));
    yield put(setAddTodo(todo));
  } else {
    yield put(setAlert('Please enter TODO text first.', ALERT.ERROR));
  }
}

function* watchFetchAddTodo() {
  yield takeLatest(FETCH_ADD_TODO, fetchAddTodo);
}

const fetchDeleteTodoFromApi = (id) => {
  return fetch("http://localhost:8080/todos/" + id, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(json => json)
    .catch(err => { });
}

function* fetchDeleteTodo(action) {
  yield call(fetchDeleteTodoFromApi, action.id);
  yield put(setDeleteTodo(action.id));
}

function* watchFetchDeleteTodo() {
  yield takeLatest(FETCH_DELETE_TODO, fetchDeleteTodo);
}

const fetchUpdateTodoFromApi = (id, text) => {
  return fetch("http://localhost:8080/todos/" + id, {
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

function* fetchUpdateTodo(action) {
  if (action.text && action.text.trim()) {
    const actionText = action.text.trim();
    const todo = yield call(fetchUpdateTodoFromApi, action.id, actionText);
    yield put(setTodoUpdating(null, ''));
    yield put(setUpdateTodo(todo.id, todo.text));
  } else {
    yield put(setAlert('Please enter TODO text first.', ALERT.ERROR));
  }
}

function* watchFetchUpdateTodo() {
  yield takeLatest(FETCH_UPDATE_TODO, fetchUpdateTodo);
}

const todosSagas = [
  fetchTodos(),
  watchFetchTodos(),
  watchFetchAddTodo(),
  watchFetchDeleteTodo(),
  watchFetchUpdateTodo()
];

export default function* rootSaga() {
  yield all(todosSagas);
}