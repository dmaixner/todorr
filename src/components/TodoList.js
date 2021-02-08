import { FILTER } from "../consts";
import TodoListInputContainer from "../containers/TodoListInputContainer";
import TodoListFilterContainer from "../containers/TodoListFilterContainer";
import TodoItemContainer from "../containers/TodoItemContainer";

function TodoList({ allCount, activeCount, filter, filteredTodos, fetchSwitchTodo }) {
  if (filteredTodos) {
    return (
      <div className="panel is-primary">
        <div className="panel-heading has-text-centered">
          ToDo RR
        </div>
        <TodoListInputContainer />
        <TodoListFilterContainer />
        <div className="panel-block">
          <div className="control">
            <div className="field is-grouped">
              <div className="control">
                <button
                  className="button is-small is-success is-light"
                  title="complete all visible ToDo items"
                  disabled={filteredTodos.length === 0 || filter === FILTER.COMPLETED}
                  onClick={() => filteredTodos.forEach(t => { if (!t.completed) { fetchSwitchTodo(t.id, true) } })}
                >
                  <span className="icon">
                    <i className="fas fa-check-double" aria-hidden="true"></i>
                  </span>
                  <span>Complete visible</span>
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-small"
                  title="incomplete all visible ToDo items"
                  disabled={filteredTodos.length === 0 || filter === FILTER.ACTIVE}
                  onClick={() => filteredTodos.forEach(t => { if (t.completed) { fetchSwitchTodo(t.id, false) } })}
                >
                  <span className="icon">
                    <i className="fas fa-check-double" aria-hidden="true"></i>
                  </span>
                  <span>Incomplete visible</span>
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-small is-danger is-light"
                  title="delete completed ToDo items"
                  disabled={allCount - activeCount === 0}
                >
                  <span className="icon">
                    <i className="fas fa-dumpster fa-lg" aria-hidden="true"></i>
                  </span>
                  <span>Delete completed</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {
          filteredTodos.map((todo) =>
            <TodoItemContainer key={todo.id} todo={todo} />
          )
        }
      </div>
    );
  } else {
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
  }
}

export default TodoList;
