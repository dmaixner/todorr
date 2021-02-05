import { FILTER } from "../consts";
import TodoItem from "./TodoItem";

function TodoList({ todos, filter, filteredTodos, filterTodos }) {
  if (todos) {
    const allCount = todos.length;
    const activeCount = todos.filter(t => !t.completed).length;

    return (
      <nav className="panel is-primary">
        <div className="panel-heading has-text-centered">
          ToDo RR
        </div>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input className="input is-primary" type="text" placeholder="what needs to be done" />
            <span className="icon is-left">
              <i className="fas fa-plus" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <div className="panel-tabs">
          <a href="#" className={filter === FILTER.ALL ? "is-active" : ""} onClick={() => filterTodos(FILTER.ALL)}>All <span className="tag is-primary is-rounded">{allCount}</span></a>
          <a href="#" className={filter === FILTER.ACTIVE ? "is-active" : ""} onClick={() => filterTodos(FILTER.ACTIVE)}>Active <span className="tag is-primary is-rounded">{activeCount}</span></a>
          <a href="#" className={filter === FILTER.COMPLETED ? "is-active" : ""} onClick={() => filterTodos(FILTER.COMPLETED)}>Completed <span className="tag is-primary is-rounded">{allCount - activeCount}</span></a>
        </div>
        {
          filteredTodos.map((todo) =>
            <TodoItem key={todo.id} todo={todo} />
          )
        }
      </nav >
    );
  } else {
    return (<progress className="progress is-small is-primary" max="100"></progress>)
  }
}

export default TodoList;
