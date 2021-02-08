import { connect } from 'react-redux';
import TodoItem from '../components/TodoItem';
import { fetchDeleteTodo, setTodoUpdating, fetchUpdateTodo, fetchSwitchTodo } from '../actions';
import { getTodoUpdating, getTodoUpdatingText } from '../selectors';

const mapStateToProps = (state, ownProps) => {
  return {
    updating: getTodoUpdating(state, ownProps.todo.id),
    updatingText: getTodoUpdatingText(state)
  }
}

const actions = {
  fetchDeleteTodo,
  setTodoUpdating,
  fetchUpdateTodo,
  fetchSwitchTodo
}

const TodoItemContainer = connect(
  mapStateToProps,
  actions
)(TodoItem);

export default TodoItemContainer;
