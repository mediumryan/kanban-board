import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface ITaskProps {
  id: number;
  value: string;
}

export interface IToDosAtomProps {
  title: string;
  task: ITaskProps[];
}

export const toDosAtom = atom<IToDosAtomProps[]>({
  key: 'ToDo',
  default: [
    {
      title: 'TASK',
      task: [],
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
