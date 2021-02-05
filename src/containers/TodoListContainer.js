import { connect } from 'react-redux';
import { fetchTodos } from '../actions';
import TodoList from '../components/TodoList';

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodos: () => {
      dispatch(fetchTodos());
    }
  }
}

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoListContainer;
