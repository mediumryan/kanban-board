import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.li`
  background-color: #87ceeb;
  width: 100%;
  text-align: center;
  border-radius: 10px;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
`;

function DraggableItem({
  toDoItem,
  index,
}: {
  toDoItem: string;
  index: number;
}) {
  return (
    <Draggable key={toDoItem} draggableId={toDoItem} index={index}>
      {(provided) => {
        return (
          <Card
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            {toDoItem}
          </Card>
        );
      }}
    </Draggable>
  );
}

export default React.memo(DraggableItem);
