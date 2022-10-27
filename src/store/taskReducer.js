export function taskReducer(state, action) {
  switch (action.type) {
    case "task/updated": {
      const newState = [...state];
      const elementIndex = newState.findIndex(
        (el) => el.id === action.payload.id
      );
      newState[elementIndex] = {
        ...newState[elementIndex],
        ...action.payload,
      };
      return newState;
    }

    case "task/removed": {
      const prevState = [...state];
      const filteredState = prevState.filter((el) => {
        return el.id !== action.payload.id;
      });
      return filteredState;
    }

    default:
      return state;
  }
}
