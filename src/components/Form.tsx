// hooks
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
// atoms
import { toDosAtom } from '../atom';

const FormWrapper = styled.form`
  margin-top: 2rem;
  margin-bottom: 1rem;
  input,
  button {
    border: 2px solid transparent;
    outline: none;
    border-radius: 4px;
    margin: 0 0.25rem;
    font-size: 1.15rem;
    padding: 0.25rem;
    background-color: aliceblue;
    transition: 300ms border ease-in;
  }
  button {
    cursor: pointer;
    color: steelblue;
    &:hover {
      border: 2px solid steelblue;
    }
  }
  input {
    &:focus {
      border: 2px solid steelblue;
    }
  }
`;

function Form() {
  const setToDos = useSetRecoilState(toDosAtom);
  const [inputValue, setInputValue] = useState('');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToDos((pre) => {
      const newToDos = [...pre];
      const toDoIndex = newToDos.findIndex((toDo) => toDo.title === 'TASK');
      const newToDo = [...newToDos[toDoIndex].task];
      newToDo.unshift({ id: Number(new Date()), value: inputValue });
      newToDos[toDoIndex] = {
        title: 'TASK',
        task: newToDo,
      };
      return newToDos;
    });
    setInputValue('');
  };
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <FormWrapper onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter any task"
        value={inputValue}
        onChange={onChange}
      />
      <button>Submit</button>
    </FormWrapper>
  );
}

export default React.memo(Form);
