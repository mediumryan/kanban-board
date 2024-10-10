import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoAtom } from '../atom';

const FormWrapper = styled.form``;

export default function Form() {
  const [newTask, setNewTask] = useState('');
  const setToDos = useSetRecoilState(toDoAtom);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newToDo = {
      id: Number(new Date()),
      text: newTask,
    };
    if (newTask) {
      setToDos((pre) => {
        const newToDoBoard = [...pre['ToDo']];
        newToDoBoard.unshift(newToDo);
        return {
          ...pre,
          ['ToDo']: newToDoBoard,
        };
      });
      setNewTask('');
    }
  };

  const getNewTask = (e: React.FormEvent<HTMLInputElement>) => {
    setNewTask(e.currentTarget.value);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter any ToDo"
        onChange={getNewTask}
        value={newTask}
      />
      <button>Submit</button>
    </FormWrapper>
  );
}
