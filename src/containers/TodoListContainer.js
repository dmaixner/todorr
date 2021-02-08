import { connect } from 'react-redux';
import { fetchAddTodo, setFilter, setInputText, fetchSwitchTodo } from '../actions';
import TodoList from '../components/TodoList';
import { getTodos, getAllCount, getActiveCount, getFilter, getFilteredTodos, getInputText } from '../selectors';

const mapStateToProps = (state) => {
  if (getTodos(state)) {
    return {
      allCount: getAllCount(state),
      activeCount: getActiveCount(state),
      filter: getFilter(state),
      filteredTodos: getFilteredTodos(state),
      inputText: getInputText(state)
    }
  } else {
    return {}
  }
}

const actions = {
  fetchAddTodo,
  setFilter,
  setInputText,
  fetchSwitchTodo
}

const TodoListContainer = connect(
  mapStateToProps,
  actions
)(TodoList);

export default TodoListContainer;
