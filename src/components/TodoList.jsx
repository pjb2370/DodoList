import React from "react";
import styled from "styled-components";
import TodoListItem from "./TodoListItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const TodoList = ({
  todos,
  onRemove,
  onToggle,
  onInsertToggle,
  setSeletedTodo,
}) => {
  return (
    <TodoListBlock>
      {todos.map((todo, index) => {
        return (
          <TodoListItem
            todo={todo}
            key={index}
            onRemove={onRemove}
            onToggle={onToggle}
            onInsertToggle={onInsertToggle}
            setSeletedTodo={setSeletedTodo}
          />
        );
      })}
    </TodoListBlock>
  );
};

export default TodoList;
