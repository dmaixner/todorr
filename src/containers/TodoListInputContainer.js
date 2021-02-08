import { connect } from 'react-redux';
import { fetchAddTodo, setInputText } from '../actions';
import TodoListInput from '../components/TodoListInput';
import { getInputText } from '../selectors';

const mapStateToProps = (state) => {
  return {
    inputText: getInputText(state)
  }
}

const actions = {
  fetchAddTodo,
  setInputText,
}

const TodoListInputContainer = connect(
  mapStateToProps,
  actions
)(TodoListInput);

export default TodoListInputContainer;
