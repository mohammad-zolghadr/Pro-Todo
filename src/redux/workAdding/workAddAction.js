const addWork = (data) => {
  return { type: 'ADD_WORK', payload: data };
};

const doneWork = (data) => {
  return { type: 'DONE_WORK', payload: data };
};

const undoneWork = (data) => {
  return { type: 'UNDONE_WORK', payload: data };
};

const removeWork = (data) => {
  return { type: 'REMOVE_WORK', payload: data };
};

const getAllWorks = () => {
  return { type: 'GET_FROM_LOCAL' };
};

export { addWork, doneWork, undoneWork, removeWork, getAllWorks };
