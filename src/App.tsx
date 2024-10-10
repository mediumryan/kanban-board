// hooks
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
// atoms
import { toDoAtom } from './atom';
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

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function App() {
  const [toDos, setToDos] = useRecoilState(toDoAtom);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      setToDos((pre) => {
        const newBoard = [...pre[source.droppableId]];
        const taskObj = newBoard[source.index];
        newBoard.splice(source.index, 1);
        newBoard.splice(destination.index, 0, taskObj);
        return {
          ...pre,
          [source.droppableId]: newBoard,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((pre) => {
        const sourceBoard = [...pre[source.droppableId]];
        const destinationBoard = [...pre[destination.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
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
        <InnerWrapper>
          {Object.keys(toDos).map((droppableId, index) => {
            return (
              <Board
                key={index}
                droppableId={droppableId}
                toDo={toDos[droppableId]}
              />
            );
          })}
        </InnerWrapper>
      </MainWrapper>
    </DragDropContext>
  );
}
