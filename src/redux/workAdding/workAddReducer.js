// local storage
import {
  saveToLocal,
  removeFromLocal,
  editLocal,
  getFromLocal,
} from '../../Function/localStorageHandler';

const initState = {
  workList: [],
};

const workAddReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_WORK':
      state.workList = [...state.workList, action.payload];
      saveToLocal(action.payload);
      return state;
    case 'DONE_WORK':
      const indexDone = state.workList.findIndex((e) => e.id === action.payload.id);
      state.workList[indexDone] = { ...action.payload, isDone: true };
      editLocal(state.workList[indexDone], 'DONE');
      return state;
    case 'UNDONE_WORK':
      const indexUndone = state.workList.findIndex((e) => e.id === action.payload.id);
      state.workList[indexUndone] = { ...action.payload, isDone: false };
      editLocal(state.workList[indexUndone], 'UNDONE');
      return state;
    case 'REMOVE_WORK':
      const newState = state.workList.filter((e) => e.id !== action.payload.id);
      removeFromLocal(action.payload);
      return { workList: newState };
    case 'GET_FROM_LOCAL':
      return { workList: getFromLocal() };
    default:
      return state;
  }
};

export default workAddReducer;
