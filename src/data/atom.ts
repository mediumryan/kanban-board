import { atom } from 'recoil';

interface IToDosAtomProps {
  [key: string]: string[];
}

export const toDosAtom = atom<IToDosAtomProps>({
  key: 'toDos',
  default: {
    ToDo: ['1', '2', '3', '4', '5'],
    Doing: ['6', '7', '8', '9', '10'],
    Done: ['11', '12', '13', '14', '15'],
  },
});
