function TodoItem({ todo }) {
  return (
    <label className="panel-block is-unselectable">
      <input type="checkbox" />
      {todo.text}
    </label>
  );
}

export default TodoItem;
