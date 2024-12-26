// redux/quizSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizData: {
    quizTitle: '',
    description: '',
    category: '',
    difficulty: '',
  },
  questions: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    updateQuizData: (state, action) => {
      state.quizData = { ...state.quizData, ...action.payload };
    },
    resetQuizData: (state) => {
      state.quizData = initialState.quizData;
      state.questions = [];
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    updateQuestion: (state, action) => {
      const { index, question } = action.payload;
      state.questions[index] = question;
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter((_, idx) => idx !== action.payload);
    },
  },
});

export const {
  updateQuizData,
  resetQuizData,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = quizSlice.actions;

export default quizSlice.reducer;
