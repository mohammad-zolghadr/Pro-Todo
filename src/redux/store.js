import { configureStore } from '@reduxjs/toolkit';

import workAddReducer from './workAdding/workAddReducer';

const store = configureStore({
  reducer: workAddReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
