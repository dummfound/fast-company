import { useState } from "react";
import { useEffect } from "react";
import actions from "./store/actions";

import { initiateStore } from "./store/store";

const taskStore = initiateStore();

function App() {
  const [state, setState] = useState(taskStore.getState());
  useEffect(() => {
    taskStore.subscribe(() => setState(taskStore.getState()));
  }, []);

  const completeTask = (taskId) =>
    taskStore.dispatch(actions.teskCompleted(taskId));
  const removeTask = (taskId) => {
    taskStore.dispatch(actions.taskRemoved(taskId));
  };
  const changeTitle = (taskId) => {
    taskStore.dispatch(actions.titleChanged(taskId));
  };

  return (
    <>
      <h1>app</h1>
      <hr />

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Complete</button>
            <button onClick={() => changeTitle(el.id)}>changeTitle</button>
            <button onClick={() => removeTask(el.id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
