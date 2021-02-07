function TodoItem({ todo, fetchDeleteTodo }) {
  return (
    <label className="panel-block is-unselectable">
      <div className="control">
        <div className="columns is-vcentered is-mobile">
          <div className={"column has-text-left todoitem" + (todo.completed ? " strikethrough" : "")}>
            {todo.text}
          </div>
          <div className="column is-narrow has-text-right">
            <button className="has-background-danger delete" onClick={() => fetchDeleteTodo(todo.id)} />
          </div>
        </div>
      </div>
    </label>
  );
}

export default TodoItem;
