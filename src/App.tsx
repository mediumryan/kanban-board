import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { toDosAtom } from './atom';
import Board from './components/Board';
import styled from 'styled-components';

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardOuter = styled.div`
  display: flex;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      font-size: 1.5rem;
      font-weight: bold;
      font-style: italic;
      margin-bottom: 1rem;
    }
  }
`;

export default function App() {
  const [toDos, setToDos] = useRecoilState(toDosAtom);

  const onDragEnd = ({ draggableId, source, destination }: DropResult) => {
    if (!destination) return;
    //   if (source.droppableId === destination.droppableId) {
    //     setToDos((pre) => {
    //       const newBoard = [...pre[source.droppableId]];
    //       newBoard.splice(source.index, 1);
    //       newBoard.splice(destination.index, 0, draggableId);
    //       return {
    //         ...pre,
    //         [source.droppableId]: newBoard,
    //       };
    //     });
    //   }
    //   if (source.droppableId !== destination.droppableId) {
    //     setToDos((pre) => {
    //       const sourceBoard = [...pre[source.droppableId]];
    //       const destinationBoard = [...pre[destination.droppableId]];
    //       sourceBoard.splice(source.index, 1);
    //       destinationBoard.splice(destination.index, 0, draggableId);
    //       return {
    //         ...pre,
    //         [source.droppableId]: sourceBoard,
    //         [destination.droppableId]: destinationBoard,
    //       };
    //     });
    //   }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <MainWrapper>
        <BoardOuter>
          {Object.keys(toDos).map((droppableId, index) => {
            return (
              <div key={index}>
                <h1>{droppableId}</h1>
                <Board toDo={toDos[droppableId]} droppableId={droppableId} />
              </div>
            );
          })}
        </BoardOuter>
      </MainWrapper>
    </DragDropContext>
  );
}
