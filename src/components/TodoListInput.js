function TodoListInput({ fetchAddTodo, setInputText, inputText }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); fetchAddTodo(inputText); }}>
      <div className="panel-block">
        <div className="control">
          <div className="field has-addons">
            <div className="control has-icons-left is-expanded">
              <input
                className="input is-primary"
                value={inputText}
                type="text"
                onKeyDown={(e) => { if (e.key === 'Esc' || e.key === 'Escape') { setInputText('') } }}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="what needs to be done"
                autoFocus
              />
              <span className="icon is-left">
                <i className="fas fa-plus" aria-hidden="true"></i>
              </span>
            </div>
            <div className="control">
              <button className="button is-primary" title="add new ToDo item">
                <span className="icon is-left">
                  <i className="fas fa-plus" aria-hidden="true"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default TodoListInput;
