import { createStore } from "./createStore";
import { taskReducer } from "./taskReducer";

export const initialState = [
  { id: 1, title: "Task1", completed: false },
  { id: 2, title: "Task2", completed: false },
];

export function initiateStore() {
  return createStore(taskReducer, initialState);
}
