import { connect } from 'react-redux';
import { filterTodos } from '../actions';
import TodoList from '../components/TodoList';
import { getTodos, getFilter, getFilteredTodos } from '../selectors';

const mapStateToProps = (state) => {
  return {
    todos: getTodos(state),
    filter: getFilter(state),
    filteredTodos: getFilteredTodos(state)
  }
}

const actions = {
  filterTodos
}

const TodoListContainer = connect(
  mapStateToProps,
  actions
)(TodoList);

export default TodoListContainer;
