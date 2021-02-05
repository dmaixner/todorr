import { all, call, takeLatest, put } from 'redux-saga/effects';
import { setTodos, FETCH_TODOS } from '../actions';

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

const todosSagas = [
  fetchTodos(),
  watchFetchTodos()
];

export default function* rootSaga() {
  yield all(todosSagas);
}