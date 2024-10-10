import { atom } from 'recoil';

export type ToDoType = {
  id: number;
  text: string;
};

interface IToDosAtomProps {
  [key: string]: ToDoType[];
}

export const toDosAtom = atom<IToDosAtomProps>({
  key: 'ToDos',
  default: {
    ToDo: [
      {
        id: 1,
        text: 'hello',
      },
      {
        id: 2,
        text: 'bye',
      },
    ],
    Doing: [
      {
        id: 3,
        text: 'hello',
      },
      {
        id: 4,
        text: 'bye',
      },
    ],
    Done: [
      {
        id: 5,
        text: 'hello',
      },
      {
        id: 6,
        text: 'bye',
      },
    ],
  },
});
