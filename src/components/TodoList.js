import { FILTER } from "../consts";
import TodoItem from "./TodoItem";

function TodoList({ allCount, activeCount, filter, filteredTodos, setFilter, fetchAddTodo, setInputText, inputText }) {
  if (filteredTodos) {
    return (
      <nav className="panel is-primary">
        <div className="panel-heading has-text-centered">
          ToDo RR
        </div>
        <form onSubmit={() => fetchAddTodo(inputText)}>
          <div className="panel-block">
            <p className="control has-icons-left">
              <input className="input is-primary" value={inputText} type="text" onChange={(e) => setInputText(e.target.value)} placeholder="what needs to be done" />
              <span className="icon is-left">
                <i className="fas fa-plus" aria-hidden="true"></i>
              </span>
            </p>
          </div>
        </form>
        <div className="panel-tabs">
          <a href="#" className={filter === FILTER.ALL ? "is-active" : ""} onClick={() => setFilter(FILTER.ALL)}>All <span className="tag is-primary is-rounded">{allCount}</span></a>
          <a href="#" className={filter === FILTER.ACTIVE ? "is-active" : ""} onClick={() => setFilter(FILTER.ACTIVE)}>Active <span className="tag is-primary is-rounded">{activeCount}</span></a>
          <a href="#" className={filter === FILTER.COMPLETED ? "is-active" : ""} onClick={() => setFilter(FILTER.COMPLETED)}>Completed <span className="tag is-primary is-rounded">{allCount - activeCount}</span></a>
        </div>
        {
          filteredTodos.map((todo) =>
            <TodoItem key={todo.id} todo={todo} />
          )
        }
      </nav >
    );
  } else {
    return (
      <div className="has-text-centered">
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
