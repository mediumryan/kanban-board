import React from 'react';

import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';
import styled from 'styled-components';
import { ToDoType } from '../atom';

const BoardWrapper = styled.div<{ isDraggingOver: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => (props.isDraggingOver ? 'pink' : 'aliceblue')};
  width: 320px;
  height: 500px;
  border-radius: 10px;
  padding: 2rem;
  margin: 0 1rem;
  transition: 300ms background-color ease-in-out;
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
            {toDo.map((item, index) => {
              return (
                <Item
                  key={item.id}
                  index={index}
                  toDoId={item.id}
                  toDoText={item.text}
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
