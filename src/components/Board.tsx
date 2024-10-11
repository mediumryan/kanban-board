import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Item from './Item';
import { IToDosAtomProps, toDosAtom } from '../atom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';

const BoardWrapper = styled.ul<{ isDraggingOver: boolean }>`
  position: relative;
  background-color: ${(props) =>
    props.isDraggingOver ? 'steelblue' : 'aliceblue'};
  flex: 1;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem;
  transition: 300ms background-color ease-in-out;
`;

const BoardTitle = styled.h1<{ isDraggingOver: boolean }>`
  font-size: 1.25rem;
  font-style: italic;
  font-weight: bold;
  color: ${(props) => (props.isDraggingOver ? 'aliceblue' : 'steelblue')};
  margin-bottom: 1rem;
  transition: 300ms color ease-in-out;
  span {
    padding: 0 1rem;
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    color: steelblue;
    padding: 2px;
    border-radius: 10px;
    cursor: pointer;
    &:hover svg {
      transform: rotate(15deg);
    }
  }
`;

const TrashBinIcon = styled(FaRegTrashAlt)`
  width: inherit;
  height: inherit;
  transition: 300ms all ease-in;
`;

interface IBoardProps {
  toDoList: IToDosAtomProps;
}

function Board({ toDoList }: IBoardProps) {
  const setToDos = useSetRecoilState(toDosAtom);
  const deleteBoard = () => {
    setToDos((pre) => {
      const newToDos = [...pre];
      const targetBoardIndex = newToDos.findIndex(
        (toDo) => toDo.title === toDoList.title
      );
      newToDos.splice(targetBoardIndex, 1);
      return newToDos;
    });
  };
  const deleteConfirm = () => {
    Swal.fire({
      title: `Are you sure?`,
      showCancelButton: true,
      confirmButtonText: 'DELETE',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBoard();
        Swal.fire('Deleted!', '', 'success');
      } else return;
    });
  };

  // update board title
  const updateBoardTitle = async () => {
    const targetBoardTitle = toDoList.title;
    if (targetBoardTitle === 'TASK') return;
    const { value } = await Swal.fire({
      title: `Update board title`,
      input: 'text',
      inputValue: targetBoardTitle,
    });
    if (value) {
      setToDos((pre) => {
        const newToDos = [...pre];
        const targetBoardIndex = pre.findIndex(
          (toDo) => toDo.title === targetBoardTitle
        );
        const newTask = [...pre[targetBoardIndex].task];
        newToDos[targetBoardIndex] = {
          title: value,
          task: newTask,
        };
        return newToDos;
      });
    }
  };

  return (
    <Droppable droppableId={toDoList.title}>
      {(provided, info) => {
        return (
          <BoardWrapper
            isDraggingOver={info.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <BoardTitle isDraggingOver={info.isDraggingOver}>
              <span onClick={updateBoardTitle}>{toDoList.title}</span>
              {toDoList.title !== 'TASK' && (
                <button>
                  <TrashBinIcon onClick={deleteConfirm} />
                </button>
              )}
            </BoardTitle>
            {toDoList.task.map((toDo, index) => {
              return (
                <Item
                  key={toDo.id}
                  boardTitle={toDoList.title}
                  toDo={toDo}
                  index={index}
                />
              );
            })}
          </BoardWrapper>
        );
      }}
    </Droppable>
  );
}

export default React.memo(Board);
