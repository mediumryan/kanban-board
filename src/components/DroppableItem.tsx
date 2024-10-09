// hooks
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
// components
import DraggableItem from './DraggableItem';

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
`;

const BoardTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 1rem;
`;

interface IDroppableItemProps {
  boardId: string;
  toDo: string[];
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
              return <DraggableItem toDoItem={toDoItem} index={index} />;
            })}
          </Board>
        );
      }}
    </Droppable>
  );
}
