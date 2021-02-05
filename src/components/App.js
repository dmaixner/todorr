import TodoList from "./TodoList";

function App({ todos }) {
  return (
    <section class="section">
      <div class="columns is-centered">
        <div class="column is-6 is-5-fullhd">
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
            <TodoList />
          </nav>
        </div>
      </div>
    </section>
  );
}

export default App;
