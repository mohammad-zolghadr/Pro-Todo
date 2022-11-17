const WORK_KEY = 'work-list-array';

const saveToLocal = (data) => {
  const loadedItems = getFromLocal();
  loadedItems.push(data);
  localStorage.setItem(WORK_KEY, JSON.stringify(loadedItems));
};

const getFromLocal = () => {
  const loadedItems = localStorage.getItem(WORK_KEY)
    ? JSON.parse(localStorage.getItem(WORK_KEY))
    : [];
  return loadedItems;
};

const removeFromLocal = (data) => {
  const loadedItems = getFromLocal();
  localStorage.setItem(WORK_KEY, JSON.stringify([]));
  const filteredItems = loadedItems.filter((e) => e.id !== data.id);
  filteredItems.forEach((e) => saveToLocal(e));
};

const editLocal = (data, type) => {
  const loadedItems = getFromLocal();
  const editItem = loadedItems.find((e) => e.id === data.id);
  removeFromLocal(editItem);
  let newItem;
  if (type === 'DONE') newItem = { ...editItem, isDone: true };
  else if (type === 'UNDONE') newItem = { ...editItem, isDone: false };
  saveToLocal(newItem);
};

export { saveToLocal, getFromLocal, removeFromLocal, editLocal };
