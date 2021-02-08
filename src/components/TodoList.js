import TodoListInputContainer from "../containers/TodoListInputContainer";
import TodoListFilterContainer from "../containers/TodoListFilterContainer";
import TodoListToolbarContainer from "../containers/TodoListToolbarContainer";
import TodoItemContainer from "../containers/TodoItemContainer";

function TodoList({ todosLoaded, filteredTodos }) {
  if (filteredTodos) {
    return (
      <div className="panel is-primary">
        <div className="panel-heading has-text-centered">
          ToDo RR
        </div>
        <TodoListInputContainer />
        <TodoListFilterContainer />
        <TodoListToolbarContainer />
        {
          filteredTodos.map((todo) =>
            <TodoItemContainer key={todo.id} todo={todo} />
          )
        }
      </div>
    );
  } else if (!todosLoaded) {
    return (
      <div className="section is-large has-text-centered">
        <div><h3 className="title is-3 has-text-primary">Loading data... While waiting, enjoy some random cat. :)</h3></div>
        <div className="media pt-4 pb-4">
          <div className="media-content">
            <img src={"https://cataas.com/cat/gif?d=" + Date.now()} alt="random cat" />
          </div>
        </div>
        <div><progress className="progress is-small is-primary" max="100"></progress></div>
      </div>
    )
  } else {
    return null;
  }
}

export default TodoList;
