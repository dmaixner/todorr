import { FILTER } from "../consts";

function TodoListFilter({ allCount, activeCount, filter, setFilter }) {
  return (
    <div className="panel-tabs">
      <a
        href="#"
        className={filter === FILTER.ALL ? "is-active" : ""}
        onClick={() => setFilter(FILTER.ALL)}
      >
        All <span className="tag is-primary is-rounded">{allCount}</span>
      </a>
      <a
        href="#"
        className={filter === FILTER.ACTIVE ? "is-active" : ""}
        onClick={() => setFilter(FILTER.ACTIVE)}
      >
        Active <span className="tag is-primary is-rounded">{activeCount}</span>
      </a>
      <a
        href="#"
        className={filter === FILTER.COMPLETED ? "is-active" : ""}
        onClick={() => setFilter(FILTER.COMPLETED)}
      >
        Completed <span className="tag is-primary is-rounded">{allCount - activeCount}</span>
      </a>
    </div>
  )
}

export default TodoListFilter;
