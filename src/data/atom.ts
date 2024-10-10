import { atom } from 'recoil';

export interface IToDoProps {
  id: number;
  text: string;
}

interface IToDosAtomProps {
  [key: string]: IToDoProps[];
}

export const toDosAtom = atom<IToDosAtomProps>({
  key: 'toDos',
  default: {
    ToDo: [],
    Doing: [],
    Done: [],
  },
});
