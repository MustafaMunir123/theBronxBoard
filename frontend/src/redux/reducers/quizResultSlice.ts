// store/quizResultSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizResultState {
  result: any | null;
}

const initialState: QuizResultState = {
  result: null,
};

const quizResultSlice = createSlice({
  name: "quizResult",
  initialState,
  reducers: {
    setQuizResult(state, action: PayloadAction<any>) {
      state.result = action.payload;
    },
    clearQuizResult(state) {
      state.result = null;
    },
  },
});

export const { setQuizResult, clearQuizResult } = quizResultSlice.actions;
export default quizResultSlice.reducer;
