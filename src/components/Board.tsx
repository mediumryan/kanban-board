// hooks
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
// components
import Item from './Item';
// atoms
import { ToDoType } from '../atom';

const BoardWrapper = styled.div<{ isDraggingOver: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => (props.isDraggingOver ? 'pink' : 'aliceblue')};
  width: 320px;
  min-height: 500px;
  max-height: 600px;
  overflow: auto;
  border-radius: 10px;
  padding: 2rem;
  margin: 0 1rem;
  transition: 300ms background-color ease-in-out;
  h1 {
    color: steelblue;
    text-shadow: skyblue 1px 0 10px;
    font-size: 1.5rem;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 1rem;
  }
`;

interface IBoardProps {
  toDo: ToDoType[];
  droppableId: string;
}

function Board({ toDo, droppableId }: IBoardProps) {
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
                  index={index}
                  toDoId={item.id}
                  toDoText={item.text}
                  droppableId={droppableId}
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
