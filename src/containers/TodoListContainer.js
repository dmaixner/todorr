import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { getTodos, getFilteredTodos } from '../selectors';

const mapStateToProps = (state) => {
  if (getTodos(state)) {
    return {
      filteredTodos: getFilteredTodos(state),
    }
  } else {
    return {}
  }
}

const TodoListContainer = connect(
  mapStateToProps
)(TodoList);

export default TodoListContainer;
