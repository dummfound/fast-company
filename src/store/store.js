import taskReducer from "./task";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { logger } from "./middleware/logger";
import errorReduser from "./errors";

// const initialState = [
//   { id: 1, title: "Task 1", completed: false },
//   { id: 2, title: "Task 2", completed: false },
// ];

const rootReduser = combineReducers({
  errors: errorReduser,
  tasks: taskReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export default createStore;
