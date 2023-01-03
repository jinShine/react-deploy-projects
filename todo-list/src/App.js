import { useState } from "react";
import "./App.css";

/* Components */

function Todo({ todo, setTodo, onDeleteTodoHandler }) {
  return (
    <div className="todo-container">
      <p>{todo.content}</p>
      <div>
        <button onClick={() => onDeleteTodoHandler(todo.id)}>삭제</button>
      </div>
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

  const onDeleteTodoHandler = (id) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    console.log("!@#!@#", id);
    setTodos(newTodos);
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
          <Todo
            key={todo.id}
            todo={todo}
            onDeleteTodoHandler={onDeleteTodoHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
