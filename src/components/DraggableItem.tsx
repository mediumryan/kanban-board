import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.li<{ isDragging: Boolean }>`
  background-color: ${(props) => (props.isDragging ? '#11546e' : '#87ceeb')};
  color: ${(props) => props.isDragging && 'white'};
  width: 100%;
  text-align: center;
  border-radius: 10px;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  transition: 300ms all ease-in-out;
`;

function DraggableItem({
  toDoId,
  toDoText,
  index,
}: {
  toDoId: number;
  toDoText: string;
  index: number;
}) {
  return (
    <Draggable key={toDoId} draggableId={String(toDoId)} index={index}>
      {(provided, info) => {
        return (
          <Card
            isDragging={info.isDragging}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            {toDoText}
          </Card>
        );
      }}
    </Draggable>
  );
}

export default React.memo(DraggableItem);
