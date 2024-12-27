// redux/quizSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizData: {
    quizTitle: '',
    description: '',
    category: '',
    difficulty: '',
  
  questions: [],
}};

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
      if (!state.questions) {
          state.questions = []; // Initialize the array if undefined
      }
      state.questions.push(action.payload);
  },
  
    updateQuestion: (state, action) => {
      const { index, question } = action.payload; // Payload structure: { index, question }
      if (index >= 0 && index < state.questions.length) {
        state.questions[index] = question; // Update question at index
      }
    },
    deleteQuestion: (state, action) => {
      state.questions.splice(action.payload, 1); // Remove question by index
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
