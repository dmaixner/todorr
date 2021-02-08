import { connect } from 'react-redux';
import { setFilter, fetchSwitchTodo } from '../actions';
import TodoList from '../components/TodoList';
import { getTodos, getAllCount, getActiveCount, getFilter, getFilteredTodos } from '../selectors';

const mapStateToProps = (state) => {
  if (getTodos(state)) {
    return {
      allCount: getAllCount(state),
      activeCount: getActiveCount(state),
      filter: getFilter(state),
      filteredTodos: getFilteredTodos(state),
    }
  } else {
    return {}
  }
}

const actions = {
  setFilter,
  fetchSwitchTodo
}

const TodoListContainer = connect(
  mapStateToProps,
  actions
)(TodoList);

export default TodoListContainer;
