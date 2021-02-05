import TodoItem from "./TodoItem";
function TodoList({ todos }) {
  if (todos) {
    return (
      <nav class="panel is-primary">
        <p class="panel-heading has-text-centered">
          ToDo RR
            </p>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input class="input is-primary" type="text" placeholder="what needs to be done" />
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <p class="panel-tabs">
          <a class="is-active">All <span class="tag is-primary is-rounded">3</span></a>
          <a>Active <span class="tag is-primary is-rounded">3</span></a>
          <a>Completed <span class="tag is-primary is-rounded">3</span></a>
        </p>
        <TodoItem />
      </nav>
    );
  } else {
    return (<progress class="progress is-small is-primary" max="100"></progress>)
  }
}

export default TodoList;
