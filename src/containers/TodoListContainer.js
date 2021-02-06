import { connect } from 'react-redux';
import { filterTodos } from '../actions';
import TodoList from '../components/TodoList';

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    filter: state.filter,
    filteredTodos: state.filteredTodos
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
