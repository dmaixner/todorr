function TodoItem({ todo, updating, updatingText, fetchDeleteTodo, setTodoUpdating, fetchUpdateTodo }) {
  return (
    <label className="panel-block is-unselectable">
      <div className="control">
        <div className="columns is-vcentered is-mobile">
          <div className={"column has-text-left todoitem" + (todo.completed ? " strikethrough" : "")}>
            {
              updating ? (
                <form onSubmit={() => fetchUpdateTodo(todo.id, updatingText)}>
                  <div className="control has-icons-left is-expanded">
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
              <button className="button is-success is-light">
                <span className="icon">
                  <i className="fas fa-check" aria-hidden="true"></i>
                </span>
              </button>
              <button className="button" onClick={() => setTodoUpdating(todo.id, todo.text)} >
                <span className="icon">
                  <i className="far fa-edit fa-lg" aria-hidden="true"></i>
                </span>
              </button>
              <button className="button is-danger is-light" onClick={() => fetchDeleteTodo(todo.id)} >
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
