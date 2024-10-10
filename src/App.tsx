// hooks
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
// atoms
import { toDosAtom } from './atom';
// components
import Board from './components/Board';
import Form from './components/Form';

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoardOuter = styled.div`
  display: flex;
`;

export default function App() {
  const [toDos, setToDos] = useRecoilState(toDosAtom);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      setToDos((pre) => {
        const newBoard = [...pre[source.droppableId]];
        const obj = newBoard[source.index];
        newBoard.splice(source.index, 1);
        newBoard.splice(destination.index, 0, obj);
        return {
          ...pre,
          [source.droppableId]: newBoard,
        };
      });
    }
    if (source.droppableId !== destination.droppableId) {
      setToDos((pre) => {
        const sourceBoard = [...pre[source.droppableId]];
        const destinationBoard = [...pre[destination.droppableId]];
        const obj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, obj);
        return {
          ...pre,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <MainWrapper>
        <Form />
        <BoardOuter>
          {Object.keys(toDos).map((droppableId, index) => {
            return (
              <Board
                key={index}
                toDo={toDos[droppableId]}
                droppableId={droppableId}
              />
            );
          })}
        </BoardOuter>
      </MainWrapper>
    </DragDropContext>
  );
}
