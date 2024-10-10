// hooks
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const ItemWrapper = styled.li<{ isDragging: boolean }>`
  list-style: none;
  background-color: ${(props) => (props.isDragging ? 'steelblue' : 'skyblue')};
  border-radius: 10px;
  padding: 1rem 2rem;
  margin: 0.5rem 0;
  width: 100%;
  text-align: center;
`;

interface IItemProps {
  index: number;
  toDoId: number;
  toDoText: string;
}
function Item({ index, toDoId, toDoText }: IItemProps) {
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
          </ItemWrapper>
        );
      }}
    </Draggable>
  );
}

export default React.memo(Item);
