import React from 'react';
import styled from 'styled-components';
import { FaCirclePlus } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { useSetRecoilState } from 'recoil';
import { toDosAtom } from '../atom';

const AddBoardWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: aliceblue;
  p {
    font-size: 1.15rem;
  }
  button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

const PlusIcon = styled(FaCirclePlus)`
  color: aliceblue;
  width: 40px;
  height: 40px;
  transition: 300ms all ease-in;
  &:hover {
    color: steelblue;
    transform: scale(1.15);
  }
`;

function AddBoard() {
  const setToDos = useSetRecoilState(toDosAtom);
  const onClick = async () => {
    const { value: boardTitle } = await Swal.fire({
      title: `What is the new board's title?`,
      input: 'text',
      inputPlaceholder: 'Enter new board title',
    });
    if (boardTitle) {
      const newBoard = {
        title: boardTitle,
        task: [],
      };
      setToDos((pre) => {
        const newToDos = [...pre];
        newToDos.push(newBoard);
        return newToDos;
      });
    }
  };

  return (
    <AddBoardWrapper>
      <p>AddBoard</p>
      <button onClick={onClick}>
        <PlusIcon />
      </button>
    </AddBoardWrapper>
  );
}

export default React.memo(AddBoard);
