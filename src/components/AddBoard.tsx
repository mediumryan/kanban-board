// hooks
import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useSetRecoilState } from 'recoil';
// icons
import { FaCirclePlus } from 'react-icons/fa6';
// atoms
import { toDosAtom } from '../atom';
// constants
import { MEDIA_QUERY_SM } from '../constants/const';

const AddBoardWrapper = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: aliceblue;
  z-index: 999;
  p {
    font-size: 1.15rem;
  }
  button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }
  @media only screen and (${MEDIA_QUERY_SM}) {
    top: 1rem;
    right: 1rem;
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
