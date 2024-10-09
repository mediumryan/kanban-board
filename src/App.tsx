// styles
import './CSS/index.css';
// hooks
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
// atoms
import { toDosAtom } from './data/atom';
// components
import DroppableItem from './components/DroppableItem';
import { useState } from 'react';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #87ceeb;
`;

const Form = styled.form`
  margin-bottom: 1rem;
  div {
    display: flex;
    align-items: center;
  }
  div > label {
    font-size: 2rem;
    font-weight: bold;
  }
  div > input {
    margin: 0 0.5rem;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    border: 1px solid #daeff7;
    height: 2rem;
  }
  div > button {
    height: 2rem;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    border: 1px solid #daeff7;
    outline: none;
    cursor: pointer;
    background: none;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDosAtom);

  const [addToDo, setAddToDo] = useState('');
  const GetAddToDo = (e: React.FormEvent<HTMLInputElement>) => {
    setAddToDo(e.currentTarget.value);
  };

  const AddToDo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToDos((pre) => {
      const newToDo = [...pre['ToDo']];
      newToDo.push(addToDo);
      return {
        ...toDos,
        ['ToDo']: newToDo,
      };
    });
    setAddToDo('');
  };

  const onDropEnd = ({ draggableId, source, destination }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      setToDos((pre) => {
        const newBoard = [...pre[source.droppableId]];
        newBoard.splice(source.index, 1);
        newBoard.splice(destination.index, 0, draggableId);
        return {
          ...toDos,
          [source.droppableId]: newBoard,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((pre) => {
        const sourceBoard = [...pre[source.droppableId]];
        const destinationBoard = [...pre[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, draggableId);
        return {
          ...toDos,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDropEnd}>
      <Wrapper>
        <Form onSubmit={AddToDo}>
          <div>
            <label>Add ToDo</label>
            <input
              type="text"
              value={addToDo}
              placeholder="Enter any ToDo"
              onChange={GetAddToDo}
            />
            <button>Submit</button>
          </div>
        </Form>
        <InnerWrapper>
          {Object.keys(toDos).map((boardId) => {
            return (
              <DroppableItem
                key={boardId}
                boardId={boardId}
                toDo={toDos[boardId]}
              />
            );
          })}
        </InnerWrapper>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
