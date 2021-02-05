function TodoItem({ todo }) {
  return (
    <label className="panel-block">
      <input type="checkbox" />
      {todo.text}
    </label>
  );
}

export default TodoItem;
