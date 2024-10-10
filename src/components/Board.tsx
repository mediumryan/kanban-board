// hooks
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
// components
import Item from './Item';
// types
import { ToDoProps } from '../atom';

const BoardWrapper = styled.div<{ isDraggingOver: boolean }>`
  width: 420px;
  height: 600px;
  background-color: ${(props) => (props.isDraggingOver ? 'pink' : 'aliceblue')};
  margin: 5rem 1rem 0 1rem;
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin: 1rem 0;
    font-size: 1.5rem;
    font-style: italic;
    font-weight: bold;
  }
`;

interface iBoardProps {
  droppableId: string;
  toDo: ToDoProps[];
}

function Board({ toDo, droppableId }: iBoardProps) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, info) => {
        return (
          <BoardWrapper
            isDraggingOver={info.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h1>{droppableId}</h1>
            {toDo.map((item, index) => {
              return (
                <Item
                  key={item.id}
                  toDoId={item.id}
                  toDoText={item.text}
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
