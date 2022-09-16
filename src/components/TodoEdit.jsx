import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.548);
`;

const Todoedit_insert = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .h2 {
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    text-align: center;
    padding: 0.5rem;
    background-color: #9c88ff;
    color: white;
  }
  .input {
    margin: 2rem 0;
    padding: 0.3rem;
    border: none;
    outline: none;
    border-bottom: 1px solid #9c88ff;
  }
  .button {
    cursor: pointer;
    background-color: #9c88ff;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
  }
`;

const TodoEdit = ({ selectedTodo, onUpdate, onInsertToggle }) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    onUpdate(selectedTodo.id, value);
    setValue("");
  };
  useEffect(() => {
    setValue(selectedTodo.text);
  }, [selectedTodo]);

  return (
    <Background
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        onInsertToggle();
      }}
    >
      <Todoedit_insert onSubmit={onSubmit}>
        <h2>수정하기</h2>
        <input
          onChange={onChange}
          value={value}
          placeholder="할 일을 입력하세요"
        />
        <button type="submit">수정하기</button>
      </Todoedit_insert>
    </Background>
  );
};

export default TodoEdit;
