import { all, call, takeLatest, takeEvery, put } from 'redux-saga/effects';
import { setTodosLoaded, FETCH_TODOS, setTodos, FETCH_ADD_TODO, setAddTodo, setInputText, setAlert, FETCH_DELETE_TODO, setDeleteTodo, FETCH_UPDATE_TODO, setTodoUpdating, setUpdateTodo, FETCH_SWITCH_TODO, setSwitchTodo, fetchDeleteTodo as fetchDeleteTodoAction, FETCH_DELETE_COMPLETED } from '../actions';
import { ALERT } from "../consts";
import { v4 as uuidv4 } from 'uuid';

const fetchTodosFromApi = () => {
  const todos = localStorage['TODORR'] || "[]";
  return JSON.parse(todos);
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
  const todo = {
    id: uuidv4(),
    completed: false,
    text: text
  }
  localStorage['TODORR'] = JSON.stringify([...fetchTodosFromApi(), todo]);
  return todo;
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
  localStorage['TODORR'] = JSON.stringify([...fetchTodosFromApi().filter(t => t.id !== id)]);
  return true;
}

function* fetchDeleteTodo(action) {
  const ok = yield call(fetchDeleteTodoFromApi, action.id);
  if (ok === null) {
    yield put(backendError());
  } else {
    yield put(setDeleteTodo(action.id));
  }
}

function* watchFetchDeleteTodo() {
  yield takeEvery(FETCH_DELETE_TODO, fetchDeleteTodo);
}

const fetchUpdateTodoFromApi = (id, text) => {
  let result = null;
  localStorage['TODORR'] = JSON.stringify([
    ...fetchTodosFromApi().map(t => {
      if (t.id === id) {
        result = { ...t, text: text };
        return result
      } else {
        return t
      }
    })
  ]);
  return result;
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
  let result = null;
  localStorage['TODORR'] = JSON.stringify([
    ...fetchTodosFromApi().map(t => {
      if (t.id === id) {
        result = { ...t, completed: completed };
        return result
      } else {
        return t
      }
    })
  ]);
  return result;
}

function* fetchSwitchTodo(action) {
  const todo = yield call(fetchSwitchTodoFromApi, action.id, action.completed);
  if (todo === null) {
    yield put(backendError());
  } else {
    yield put(setSwitchTodo(todo.id, todo.completed));
  }
}

function* watchFetchSwitchTodo() {
  yield takeEvery(FETCH_SWITCH_TODO, fetchSwitchTodo);
}

const fetchGetCompletedFromApi = () => {
  return [...fetchTodosFromApi().filter(t => t.completed)];
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