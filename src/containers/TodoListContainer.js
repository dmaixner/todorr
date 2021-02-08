import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { getTodosLoaded, getTodos, getFilteredTodos } from '../selectors';

const mapStateToProps = (state) => {
  let props = {
    todosLoaded: getTodosLoaded(state)
  }
  if (getTodos(state)) {
    props.filteredTodos = getFilteredTodos(state);
  }
  return props;
}

const TodoListContainer = connect(
  mapStateToProps
)(TodoList);

export default TodoListContainer;
