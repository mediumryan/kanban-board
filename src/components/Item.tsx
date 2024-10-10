// hooks
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
// icons
import { FaRegTrashAlt } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import { toDosAtom } from '../atom';

const ItemWrapper = styled.li<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  background-color: ${(props) => (props.isDragging ? 'steelblue' : 'skyblue')};
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  color: white;
  text-shadow: steelblue 1px 0 10px;
  transition: 300ms background-color ease-in-out;
`;

const TrashIcon = styled(FaRegTrashAlt)`
  transition: 300ms all;
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 50%;
  background-color: aliceblue;
  color: steelblue;
  &:hover {
    color: aliceblue;
    background-color: steelblue;
  }
`;

interface IItemProps {
  toDoId: number;
  toDoText: string;
  index: number;
  droppableId: string;
}

function Item({ toDoId, toDoText, index, droppableId }: IItemProps) {
  const setToDos = useSetRecoilState(toDosAtom);

  const deleteToDo = () => {
    setToDos((pre) => {
      const newBoard = [...pre[droppableId]];
      newBoard.splice(index, 1);
      return {
        ...pre,
        [droppableId]: newBoard,
      };
    });
  };

  return (
    <Draggable draggableId={String(toDoId)} index={index}>
      {(provided, info) => {
        return (
          <ItemWrapper
            isDragging={info.isDragging}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            {toDoText}
            <TrashIcon onClick={deleteToDo} />
          </ItemWrapper>
        );
      }}
    </Draggable>
  );
}

export default React.memo(Item);
