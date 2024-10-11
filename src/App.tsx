import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import styled from 'styled-components';
import Board from './components/Board';
import { useRecoilState } from 'recoil';
import { toDosAtom } from './atom';
import Form from './components/Form';
import AddBoard from './components/AddBoard';
import DeleteBoard from './components/DeleteBoard';

const RootWrapper = styled.div`
  position: relative;
  background-color: skyblue;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 85%;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function App() {
  const [toDos, setToDos] = useRecoilState(toDosAtom);

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
        <Droppable type="board" droppableId="boardZone" direction="horizontal">
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
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            <Board toDoList={toDoList} />
                          </div>
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
