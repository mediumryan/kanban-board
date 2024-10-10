import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export type ToDoType = {
  id: number;
  text: string;
};

export interface IToDosAtomProps {
  [key: string]: ToDoType[];
}

export const toDosAtom = atom<IToDosAtomProps>({
  key: 'ToDos',
  default: {
    ToDo: [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
