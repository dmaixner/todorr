import TodoListContainer from "../containers/TodoListContainer";
import AlertContainer from "../containers/AlertContainer";

function App() {
  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-12-mobile is-10-tablet is-8-desktop is-7-widescreen is-6-fullhd">
          <AlertContainer />
          <TodoListContainer />
        </div>
      </div>
    </section>
  );
}

export default App;
