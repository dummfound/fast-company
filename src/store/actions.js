import actionTypes from "./actionTypes";
function teskCompleted(taskId) {
  return {
    type: actionTypes.taskUpdate,
    payload: { id: taskId, completed: true },
  };
}
function taskRemoved(taskId) {
  return {
    type: actionTypes.taskRemove,
    payload: { id: taskId },
  };
}
function titleChanged(taskId) {
  return {
    type: actionTypes.taskUpdate,
    payload: { id: taskId, title: `new title for task ${taskId}` },
  };
}

const actions = {
  teskCompleted,
  taskRemoved,
  titleChanged,
};

export default actions;
