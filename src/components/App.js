import TodoListContainer from "../containers/TodoListContainer";

function App() {
  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-6 is-5-fullhd">
          <TodoListContainer />
        </div>
      </div>
    </section>
  );
}

export default App;
