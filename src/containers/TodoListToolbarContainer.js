import { connect } from 'react-redux';
import { fetchSwitchTodo, fetchDeleteCompleted } from '../actions';
import TodoListToolbar from '../components/TodoListToolbar';
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
  fetchSwitchTodo,
  fetchDeleteCompleted
}

const TodoListToolbarContainer = connect(
  mapStateToProps,
  actions
)(TodoListToolbar);

export default TodoListToolbarContainer;
