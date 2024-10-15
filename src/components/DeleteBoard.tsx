// hooks
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
// icons
import { BsTrash2, BsTrash2Fill } from 'react-icons/bs';

const DeleteBoardWrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const EmptyIcon = styled(BsTrash2)`
  width: 150px;
  height: 150px;
  color: steelblue;
`;

const FillIcon = styled(BsTrash2Fill)`
  width: 150px;
  height: 150px;
  color: steelblue;
`;

export default function DeleteBoard() {
  return (
    <Droppable droppableId="deleteZone">
      {(provided, info) => {
        return (
          <DeleteBoardWrapper
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {info.isDraggingOver ? <FillIcon /> : <EmptyIcon />}
          </DeleteBoardWrapper>
        );
      }}
    </Droppable>
  );
}
