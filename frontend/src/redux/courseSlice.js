import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    prerequisites: '',
    objectives: '',
    custom_duration: '',
    duration: 'hours',
    enroll: 'free',
    custom_price: '',
    price: 'lkr',
    visibility: 'public',
    loading: false,
    error: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourseData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetCourseData: () => initialState,
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCourseData, resetCourseData, setLoading, setError } = courseSlice.actions;
export default courseSlice.reducer;
