import { connect } from 'react-redux';
import { fetchTodos } from '../actions';
import App from '../components/App';

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

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
