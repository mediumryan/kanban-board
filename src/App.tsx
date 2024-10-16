// hooks
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';
// components
import Form from './components/Form';
import AddBoard from './components/AddBoard';
import DeleteBoard from './components/DeleteBoard';
import Board from './components/Board';
// atoms
import { toDosAtom } from './atom';
// constants
import { MEDIA_QUERY_SM } from './constants/const';

const RootWrapper = styled.div`
  position: relative;
  background-color: skyblue;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  @media only screen and (${MEDIA_QUERY_SM}) {
    padding-bottom: 5rem;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 85%;
  @media only screen and (${MEDIA_QUERY_SM}) {
    width: 95%;
    margin-top: 2.5rem;
    justify-content: center;
  }
`;

const BoardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  const [toDos, setToDos] = useRecoilState(toDosAtom);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const onDragEnd = ({ type, source, destination }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === 'deleteZone') {
      setToDos((pre) => {
        const newToDos = [...pre];
        const targetBoardIndex = pre.findIndex(
          (toDo) => toDo.title === source.droppableId
        );
        const newTask = [...pre[targetBoardIndex].task];
        newTask.splice(source.index, 1);
        newToDos[targetBoardIndex] = {
          title: source.droppableId,
          task: newTask,
        };
        return newToDos;
      });

      return;
    }
    if (type === 'board') {
      setToDos((pre) => {
        const newToDos = [...pre];
        const sourceBoard = pre[source.index];
        newToDos.splice(source.index, 1);
        newToDos.splice(destination.index, 0, sourceBoard);
        return newToDos;
      });
    } else {
      if (source.droppableId === 'deleteZone') {
        console.log('hi');
        return;
      }
      if (source.droppableId === destination.droppableId) {
        const sourceIndex = toDos.findIndex(
          (toDo) => toDo.title === source.droppableId
        );
        setToDos((pre) => {
          const newToDos = [...pre];
          const newBoard = [...pre[sourceIndex].task];
          const obj = newBoard[source.index];
          newBoard.splice(source.index, 1);
          newBoard.splice(destination.index, 0, obj);
          newToDos[sourceIndex] = {
            title: source.droppableId,
            task: newBoard,
          };
          return newToDos;
        });
      }
      if (source.droppableId !== destination.droppableId) {
        const sourceIndex = toDos.findIndex(
          (toDo) => toDo.title === source.droppableId
        );
        const destinationIndex = toDos.findIndex(
          (toDo) => toDo.title === destination.droppableId
        );
        setToDos((pre) => {
          const newToDos = [...pre];
          const sourceBoard = [...pre[sourceIndex].task];
          const destinationBoard = [...pre[destinationIndex].task];
          const obj = sourceBoard[source.index];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination.index, 0, obj);
          newToDos[sourceIndex] = {
            title: source.droppableId,
            task: sourceBoard,
          };
          newToDos[destinationIndex] = {
            title: destination.droppableId,
            task: destinationBoard,
          };
          return newToDos;
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <RootWrapper>
        <Form />
        <Droppable
          type="board"
          droppableId="boardZone"
          direction={isMobile ? 'vertical' : 'horizontal'}
        >
          {(parentProvided) => {
            return (
              <InnerWrapper
                ref={parentProvided.innerRef}
                {...parentProvided.droppableProps}
              >
                {toDos.map((toDoList, index) => {
                  return (
                    <Draggable
                      key={toDoList.title}
                      draggableId={toDoList.title}
                      index={index}
                    >
                      {(provided, i) => {
                        return (
                          <BoardWrapper
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            <Board toDoList={toDoList} i={i} />
                          </BoardWrapper>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {parentProvided.placeholder}
              </InnerWrapper>
            );
          }}
        </Droppable>
        <AddBoard />
        <DeleteBoard />
      </RootWrapper>
    </DragDropContext>
  );
}
