import { useState } from "react";
import "./App.css";

/* Components */

function Todo({ todo }) {
  return (
    <div className="todo-container">
      <p>{todo.content}</p>
    </div>
  );
}

function App() {
  /* Properties */

  const initData = { id: 0, content: "" };
  const [todo, setTodo] = useState(initData);
  const [todos, setTodos] = useState([]);

  /* Handlers */

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const onAddHandler = () => {
    if (todo.content === "") {
      return;
    }

    const newTodo = { ...todo, id: todos.length };
    setTodos([...todos, newTodo]);

    init();
  };

  /* Helper */

  function init() {
    setTodo(initData);
  }

  /* Output */
  return (
    <div className="App">
      <div className="input-container">
        <input
          className="input-container__form"
          name="content"
          value={todo.content}
          onChange={onChangeInputHandler}
        ></input>
        <button onClick={onAddHandler}>추가하기</button>
      </div>
      <h1>Todo List</h1>
      <div className="list-container">
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default App;
