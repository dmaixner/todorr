import { all, call, takeLatest, takeEvery, put } from 'redux-saga/effects';
import { setTodosLoaded, FETCH_TODOS, setTodos, FETCH_ADD_TODO, setAddTodo, setInputText, setAlert, FETCH_DELETE_TODO, setDeleteTodo, FETCH_UPDATE_TODO, setTodoUpdating, setUpdateTodo, FETCH_SWITCH_TODO, setSwitchTodo, fetchDeleteTodo as fetchDeleteTodoAction, FETCH_DELETE_COMPLETED } from '../actions';
import { ALERT } from "../consts";

const fetchTodosFromApi = () => {
  return fetch("http://localhost:8080/todos")
    .then(res => res.json())
    .then(json => json)
    .catch(err => null);
}

function backendError() {
  return setAlert('Error while trying to connect to backend service. Please, reload the page once backend service is available.', ALERT.ERROR);
}

function* fetchTodos() {
  yield put(setTodosLoaded(false));
  const todos = yield call(fetchTodosFromApi);
  if (todos) {
    yield put(setTodos(todos));
  } else {
    yield put(backendError());
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
    .catch(err => null);
}

function* fetchAddTodo(action) {
  if (action.text && action.text.trim()) {
    const actionText = action.text.trim();
    const todo = yield call(fetchAddTodoFromApi, actionText);
    if (todo) {
      yield put(setInputText(''));
      yield put(setAddTodo(todo));
    } else {
      yield put(backendError());
    }
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
    .then(res => res.ok)
    .catch(err => null);
}

function* fetchDeleteTodo(action) {
  const ok = yield call(fetchDeleteTodoFromApi, action.id);
  if (ok === null) {
    yield put(backendError());
  } else {
    if (!ok) {
      yield put(setAlert('Unable to delete this ToDo item at backend service. It was probably already deleted.', ALERT.WARNING));
    }
    yield put(setDeleteTodo(action.id));
  }
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
    .catch(err => null);
}

function* fetchUpdateTodo(action) {
  if (action.text && action.text.trim()) {
    const actionText = action.text.trim();
    const todo = yield call(fetchUpdateTodoFromApi, action.id, actionText);
    if (todo) {
      yield put(setTodoUpdating(null, ''));
      yield put(setUpdateTodo(todo.id, todo.text));
    } else {
      yield put(backendError());
    }
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
    .then(res => res.text())
    .then(text => {
      try {
        return JSON.parse(text);
      } catch (err) {
        return "";
      }
    })
    .catch(err => null);
}

function* fetchSwitchTodo(action) {
  const todo = yield call(fetchSwitchTodoFromApi, action.id, action.completed);
  if (todo === null) {
    yield put(backendError());
  } else if (todo === "") {
    yield put(setAlert('Unable to switch state of this ToDo item at backend service. It was probably already switched.', ALERT.WARNING));
    yield put(setSwitchTodo(action.id, action.completed));
  } else {
    yield put(setSwitchTodo(todo.id, todo.completed));
  }
}

function* watchFetchSwitchTodo() {
  yield takeEvery(FETCH_SWITCH_TODO, fetchSwitchTodo);
}

const fetchGetCompletedFromApi = () => {
  return fetch("http://localhost:8080/todos/completed")
    .then(res => res.json())
    .then(json => json)
    .catch(err => null);
}

function* fetchDeleteCompleted() {
  const todos = yield call(fetchGetCompletedFromApi);
  if (todos) {
    for (const todo of todos) {
      yield put(fetchDeleteTodoAction(todo.id));
    }
  } else {
    yield put(backendError());
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