// hooks
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';
// icons
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuPencil } from 'react-icons/lu';
// atoms
import { ITaskProps, toDosAtom } from '../atom';

const ItemWrapper = styled.li<{ isDragging: boolean }>`
  width: 85%;
  min-height: 1.5rem;
  color: steelblue;
  background-color: ${(props) => (props.isDragging ? 'aliceblue' : 'skyblue')};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
  padding: 1rem;
  transition: 300ms background-color ease-in-out;
  & > div {
    display: flex;
  }
`;

const ModifyIcon = styled(LuPencil)`
  width: 25px;
  height: 25px;
  padding: 4px;
  margin-left: 2rem;
  margin-right: 0.5rem;
  transition: 300ms color ease-in;
  &:hover {
    color: aliceblue;
  }
`;

const TrashBinIcon = styled(FaRegTrashAlt)`
  width: 25px;
  height: 25px;
  padding: 4px;
  transition: 300ms color ease-in;
  &:hover {
    color: aliceblue;
  }
`;

interface IItemProps {
  boardTitle: string;
  toDo: ITaskProps;
  index: number;
}

function Item({ boardTitle, toDo, index }: IItemProps) {
  const setToDos = useSetRecoilState(toDosAtom);
  // update task
  const updateTask = async (taskValue: string) => {
    const { value } = await Swal.fire({
      title: `Update task`,
      input: 'text',
      inputValue: taskValue,
    });
    if (value) {
      setToDos((pre) => {
        const newToDos = [...pre];
        const targetBoardIndex = pre.findIndex(
          (toDo) => toDo.title === boardTitle
        );
        const newTask = [...pre[targetBoardIndex].task];
        newTask.splice(index, 1);
        newTask.splice(index, 0, { id: Number(new Date()), value: value });
        newToDos[targetBoardIndex] = {
          title: boardTitle,
          task: newTask,
        };
        return newToDos;
      });
    }
  };
  // delete task
  const deleteTask = () => {
    setToDos((pre) => {
      const targetBoardIndex = pre.findIndex(
        (toDo) => toDo.title === boardTitle
      );
      const newToDos = [...pre];
      const newTask = [...pre[targetBoardIndex].task];
      newTask.splice(index, 1);
      newToDos[targetBoardIndex] = {
        title: boardTitle,
        task: newTask,
      };
      return newToDos;
    });
  };

  return (
    <Draggable index={index} draggableId={String(toDo.id)}>
      {(cardDragProvide, info) => {
        return (
          <ItemWrapper
            isDragging={info.isDragging}
            ref={cardDragProvide.innerRef}
            {...cardDragProvide.dragHandleProps}
            {...cardDragProvide.draggableProps}
          >
            <span>{toDo.value}</span>
            <div>
              <ModifyIcon
                onClick={() => {
                  updateTask(toDo.value);
                }}
              />
              <TrashBinIcon onClick={deleteTask} />
            </div>
          </ItemWrapper>
        );
      }}
    </Draggable>
  );
}

export default React.memo(Item);
