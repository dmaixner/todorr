function TodoItem({ todo, updating, updatingText, fetchDeleteTodo, setTodoUpdating, fetchUpdateTodo, fetchSwitchTodo }) {
  return (
    <label className="panel-block is-unselectable">
      <div className="control">
        <div className="columns is-vcentered is-mobile">
          <div className="column is-narrow">
            <button className={"button is-small" + (todo.completed ? " is-success is-light" : "")} onClick={() => fetchSwitchTodo(todo.id, !todo.completed)} title="switch ToDo item state">
              <span className="icon">
                <i className="fas fa-check" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className={"column has-text-left todoitem" + (todo.completed ? " strikethrough" : "")} onClick={(e) => { e.preventDefault(); }}>
            {
              updating ? (
                <form onSubmit={() => fetchUpdateTodo(todo.id, updatingText)}>
                  <div className="control has-icons-left">
                    <input
                      className="input is-primary"
                      value={updatingText}
                      type="text"
                      onBlur={() => fetchUpdateTodo(todo.id, updatingText)}
                      onKeyDown={(e) => { if (e.key === 'Esc' || e.key === 'Escape') { setTodoUpdating(null, '') } }}
                      onChange={(e) => setTodoUpdating(todo.id, e.target.value)}
                      autoFocus
                    />
                    <span className="icon is-left">
                      <i className="far fa-edit" aria-hidden="true"></i>
                    </span>
                  </div>
                </form>
              ) :
                todo.text
            }
          </div>
          <div className="column is-narrow">
            <div className="buttons are-small">
              <button className="button" onClick={() => setTodoUpdating(todo.id, todo.text)} title="update ToDo item">
                <span className="icon">
                  <i className="far fa-edit fa-lg" aria-hidden="true"></i>
                </span>
              </button>
              <button className="button is-danger is-light" onClick={() => fetchDeleteTodo(todo.id)} title="delete ToDo item">
                <span className="icon">
                  <i className="far fa-trash-alt fa-lg" aria-hidden="true"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </label>
  );
}

export default TodoItem;
