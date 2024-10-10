import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const ItemWrapper = styled.div<{ isDragging: boolean }>`
  text-align: center;
  list-style: none;
  background-color: ${(props) => (props.isDragging ? 'steelblue' : 'skyblue')};
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem 0;
  border-radius: 10px;
  transition: 300ms background-color ease-in-out;
`;

interface IItemProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function Item({ toDoId, toDoText, index }: IItemProps) {
  return (
    <Draggable key={toDoId} draggableId={toDoText} index={index}>
      {(provided, info) => {
        return (
          <ItemWrapper
            isDragging={info.isDragging}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            {toDoText}
          </ItemWrapper>
        );
      }}
    </Draggable>
  );
}

export default React.memo(Item);
