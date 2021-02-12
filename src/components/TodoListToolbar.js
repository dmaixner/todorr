import { FILTER } from "../consts";

function TodoListToolbar({ allCount, activeCount, filter, filteredTodos, fetchSwitchTodo, fetchDeleteCompleted }) {
  return (
    <div className="panel-block">
      <div className="control">
        <div className="buttons">
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
          <button
            className="button is-small is-danger is-light"
            title="delete completed ToDo items"
            disabled={allCount - activeCount === 0}
            onClick={() => fetchDeleteCompleted()}
          >
            <span className="icon">
              <i className="fas fa-dumpster fa-lg" aria-hidden="true"></i>
            </span>
            <span>Delete completed</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoListToolbar;
