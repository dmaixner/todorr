import { all, call, takeLatest, takeEvery, put } from 'redux-saga/effects';
import { setTodosLoaded, FETCH_TODOS, setTodos, FETCH_ADD_TODO, setAddTodo, setInputText, setAlert, FETCH_DELETE_TODO, setDeleteTodo, FETCH_UPDATE_TODO, setTodoUpdating, setUpdateTodo, FETCH_SWITCH_TODO, setSwitchTodo, fetchDeleteTodo as fetchDeleteTodoAction, FETCH_DELETE_COMPLETED } from '../actions';
import { ALERT } from "../consts";

const fetchTodosFromApi = () => {
  return fetch("http://localhost:8080/todos")
    .then(res => res.json())
    .then(json => json)
    .catch(err => null);
}

function* fetchTodos() {
  yield put(setTodosLoaded(false));
  const todos = yield call(fetchTodosFromApi);
  if (todos) {
    yield put(setTodos(todos));
  } else {
    yield put(setAlert('Error while trying to connect to backend service. Please reload this app, once backend is available.', ALERT.ERROR));
  }
  yield put(setTodosLoaded(true));
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
  yield takeEvery(FETCH_DELETE_TODO, fetchDeleteTodo);
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

const fetchSwitchTodoFromApi = (id, completed) => {
  const method = completed ? 'complete' : 'incomplete';
  return fetch("http://localhost:8080/todos/" + id + '/' + method, {
    method: "POST"
  })
    .then(res => res.json())
    .then(json => json)
    .catch(err => { });
}

function* fetchSwitchTodo(action) {
  const todo = yield call(fetchSwitchTodoFromApi, action.id, action.completed);
  yield put(setSwitchTodo(todo.id, todo.completed));
}

function* watchFetchSwitchTodo() {
  yield takeEvery(FETCH_SWITCH_TODO, fetchSwitchTodo);
}

const fetchGetCompletedFromApi = () => {
  return fetch("http://localhost:8080/todos/completed")
    .then(res => res.json())
    .then(json => json)
    .catch(err => { });
}

function* fetchDeleteCompleted() {
  const todos = yield call(fetchGetCompletedFromApi);
  for (const todo of todos) {
    yield put(fetchDeleteTodoAction(todo.id));
  }
}

function* watchFetchDeleteCompleted() {
  yield takeLatest(FETCH_DELETE_COMPLETED, fetchDeleteCompleted);
}

const todosSagas = [
  fetchTodos(),
  watchFetchTodos(),
  watchFetchAddTodo(),
  watchFetchDeleteTodo(),
  watchFetchUpdateTodo(),
  watchFetchSwitchTodo(),
  watchFetchDeleteCompleted()
];

export default function* rootSaga() {
  yield all(todosSagas);
}