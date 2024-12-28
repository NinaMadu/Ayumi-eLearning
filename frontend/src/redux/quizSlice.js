import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizData: {
    quizTitle: "",
    description: "",
    category: "",
    difficulty: "",
  },
  questions: [],
  totalMarks: 0,
  passingScore: 0,
  duration: 0,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    updateQuizData: (state, action) => {
      state.quizData = { ...state.quizData, ...action.payload };
    },
    resetQuizData: (state) => {
      state.quizData = initialState.quizData;
      state.questions = [];
      state.totalMarks = 0;
      state.passingScore = 0;
      state.duration = 0;
    },
    addQuestion: (state, action) => {
      state.questions.push({
        questionType: '',
        questionText: '',
        answers: [],
        correctAnswer: '',
        ...action.payload,
      });
    },
    updateQuestion: (state, action) => {
      const { index, question } = action.payload;
      if (index >= 0 && index < state.questions.length) {
        state.questions[index] = { ...state.questions[index], ...question };
      }
    },
    deleteQuestion: (state, action) => {
      state.questions.splice(action.payload, 1);
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    updateMarkPoint: (state, action) => {
      const { index, markPoint } = action.payload;
      if (index >= 0 && index < state.questions.length) {
        state.questions[index].markPoint = markPoint;
      }
    },
    setTotalMarks: (state, action) => {
      state.totalMarks = action.payload;
    },
    setPassingScore: (state, action) => {
      state.passingScore = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

export const {
  updateQuizData,
  resetQuizData,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  setQuestions,
  updateMarkPoint,
  setTotalMarks,
  setPassingScore,
  setDuration,
} = quizSlice.actions;

export default quizSlice.reducer;
