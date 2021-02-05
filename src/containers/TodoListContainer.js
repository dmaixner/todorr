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
const mapDispatchToProps = (dispatch) => {
  return {
    // fetchTodos: () => {
    //   dispatch(fetchTodos());
    // },
    filterTodos: (filter) => {
      dispatch(filterTodos(filter));
    },
  }
}

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoListContainer;
