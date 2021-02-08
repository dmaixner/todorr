import { connect } from 'react-redux';
import { setFilter } from '../actions';
import TodoListFilter from '../components/TodoListFilter';
import { getTodos, getAllCount, getActiveCount, getFilter } from '../selectors';

const mapStateToProps = (state) => {
  if (getTodos(state)) {
    return {
      allCount: getAllCount(state),
      activeCount: getActiveCount(state),
      filter: getFilter(state),
    }
  } else {
    return {}
  }
}

const actions = {
  setFilter,
}

const TodoListFilterContainer = connect(
  mapStateToProps,
  actions
)(TodoListFilter);

export default TodoListFilterContainer;
