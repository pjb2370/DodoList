import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoEdit from "./components/TodoEdit";

const GlobalStyle = createGlobalStyle`
body {
  background: #e9ecef;
}
`;

function App() {
  const [todos, setTodos] = useState([]);
  const [insertToggle, setInsertToggle] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const nextId = useRef(1);

  const onInsert = (text) => {
    const todo = {
      id: nextId,
      text: text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current++;
  };

  const onInsertToggle = () => {
    setInsertToggle((prev) => !prev);
  };

  const onRemove = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const onToggle = async (id) => {
    try {
      const data = await axios({
        url: `http://localhost:4000/todos/check/${id}`,
        method: "PATCH",
      });
      setTodos(data.data);
    } catch (e) {
      setError(e);
    }
  };

  const onUpdate = (id, text) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    onInsertToggle();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: "http://localhost:4000/todos",
          method: "GET",
        });

        setTodos(data.data);
        setIsLoading(false);
      } catch (e) {
        setError(e);
      }
    };
    getData();
  });

  if (error) {
    return <>에러: {error.message}</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList
          todos={todos}
          onRemove={onRemove}
          onToggle={onToggle}
          onInsertToggle={onInsertToggle}
          setSeletedTodo={setSelectedTodo}
        />
        {insertToggle && (
          <TodoEdit
            onInsertToggle={onInsertToggle}
            selectedTodo={selectedTodo}
            onUpdate={onUpdate}
          />
        )}
      </TodoTemplate>
    </>
  );
}

export default App;
