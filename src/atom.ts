import { atom } from 'recoil';

export type ToDoProps = {
  id: number;
  text: string;
};

interface ItoDoAtomProps {
  [key: string]: ToDoProps[];
}

export const toDoAtom = atom<ItoDoAtomProps>({
  key: 'ToDos',
  default: {
    ToDo: [
      { id: 1, text: 'hello' },
      { id: 2, text: 'bye' },
    ],
    Doing: [
      { id: 3, text: 'hello' },
      { id: 4, text: 'bye' },
    ],
    Done: [
      { id: 5, text: 'hello' },
      { id: 6, text: 'bye' },
    ],
  },
});
