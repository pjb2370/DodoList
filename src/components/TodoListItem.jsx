import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete, MdModeEditOutline } from "react-icons/md";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;
const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 1rem;
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const TodoListItem = ({
  todo,
  onRemove,
  onToggle,
  onInsertToggle,
  setSeletedTodo,
}) => {
  const { id, done, text } = todo;

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle(id)}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Edit
        onClick={() => {
          onInsertToggle();
          setSeletedTodo((prev) => todo);
        }}
      >
        <MdModeEditOutline />
      </Edit>
      <onRemove onClick={onRemove}>
        <MdDelete />
      </onRemove>
    </TodoItemBlock>
  );
};

export default React.memo(TodoListItem);
