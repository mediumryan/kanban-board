import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDosAtom } from '../atom';

const FormWrapper = styled.form`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  input {
    height: 2rem;
    border: none;
    border-radius: 4px;
    outline: none;
    padding: 0.25rem 0.5rem;
    transition: 300ms all;
    &:focus {
      outline: 3px solid steelblue;
    }
  }
  button {
    height: 2rem;
    border: none;
    outline: none;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    margin-left: 0.25rem;
    background-color: aliceblue;
    color: steelblue;
    transition: 300ms all;
    &:hover {
      background-color: steelblue;
      color: aliceblue;
    }
    cursor: pointer;
  }
`;

function Form() {
  const [inputValue, setInputValue] = useState('');
  const setToDos = useSetRecoilState(toDosAtom);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newToDo = {
      id: Number(new Date()),
      text: inputValue,
    };
    if (inputValue) {
      setToDos((pre) => {
        const newToDoBoard = [...pre['ToDo']];
        newToDoBoard.unshift(newToDo);
        return {
          ...pre,
          ['ToDo']: newToDoBoard,
        };
      });
      setInputValue('');
    }
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <FormWrapper onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter any ToDo"
        onChange={onChange}
        value={inputValue}
      />
      <button>Submit</button>
    </FormWrapper>
  );
}

export default React.memo(Form);
