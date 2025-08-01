import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export const enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return {
      [Categories.TO_DO]: toDos.filter(
        (toDo) => toDo.category === Categories.TO_DO
      ),
      [Categories.DOING]: toDos.filter(
        (toDo) => toDo.category === Categories.DOING
      ),
      [Categories.DONE]: toDos.filter(
        (toDo) => toDo.category === Categories.DONE
      ),
    };
  },
});
