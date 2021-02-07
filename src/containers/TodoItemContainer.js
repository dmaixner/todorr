import { connect } from 'react-redux';
import TodoItem from '../components/TodoItem';
import { fetchDeleteTodo } from '../actions';

const actions = {
  fetchDeleteTodo
}

const TodoItemContainer = connect(
  null,
  actions
)(TodoItem);

export default TodoItemContainer;
