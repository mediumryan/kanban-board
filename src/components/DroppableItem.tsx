// hooks
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
// components
import DraggableItem from './DraggableItem';
import { IToDoProps } from '../data/atom';

const Board = styled.ul<{ isDraggingOver: boolean }>`
  width: 320px;
  height: 500px;
  background-color: ${(props) => (props.isDraggingOver ? 'pink' : '#daeff7')};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0.5rem;
  margin: 0.5rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  transition: 300ms background-color ease-in-out;
`;

const BoardTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 1rem;
`;

interface IDroppableItemProps {
  boardId: string;
  toDo: IToDoProps[];
}

export default function DroppableItem({ boardId, toDo }: IDroppableItemProps) {
  return (
    <Droppable droppableId={boardId}>
      {(provided, info) => {
        return (
          <Board
            isDraggingOver={info.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <BoardTitle>{boardId}</BoardTitle>
            {toDo.map((toDoItem, index) => {
              return (
                <DraggableItem
                  toDoId={toDoItem.id}
                  toDoText={toDoItem.text}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Board>
        );
      }}
    </Droppable>
  );
}
