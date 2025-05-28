// store.ts
import { configureStore } from "@reduxjs/toolkit";
import quizResultReducer from "./reducers/quizResultSlice";

const store = configureStore({
  reducer: {
    quizResult: quizResultReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
