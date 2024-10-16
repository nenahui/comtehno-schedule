import { createTeacher, fetchTeachers } from '@/features/teachers/teachersThunks';
import type { Teacher } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface TeachersState {
  teachers: Teacher[];
  teachersFetching: boolean;
  teachersCreating: boolean;
  teachersDeleting: number | null;
  teachersEditing: boolean;
}

const initialState: TeachersState = {
  teachers: [],
  teachersFetching: false,
  teachersCreating: false,
  teachersDeleting: null,
  teachersEditing: false,
};

export const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.teachersFetching = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, { payload: teacehrs }) => {
        state.teachers = teacehrs;
        state.teachersFetching = false;
      })
      .addCase(fetchTeachers.rejected, (state) => {
        state.teachersFetching = false;
      });

    builder
      .addCase(createTeacher.pending, (state) => {
        state.teachersCreating = true;
      })
      .addCase(createTeacher.fulfilled, (state, { payload: teacher }) => {
        state.teachers.push(teacher);
        state.teachersCreating = false;
      })
      .addCase(createTeacher.rejected, (state) => {
        state.teachersCreating = false;
      });
  },
  selectors: {
    selectTeachers: (state: TeachersState) => state.teachers,
    selectTeachersFetching: (state) => state.teachersFetching,
    selectTeachersCreating: (state) => state.teachersCreating,
    selectTeachersDeleting: (state) => state.teachersDeleting,
    selectTeachersEditing: (state) => state.teachers,
  },
});

export const {
  selectTeachers,
  selectTeachersFetching,
  selectTeachersCreating,
  selectTeachersDeleting,
  selectTeachersEditing,
} = teachersSlice.selectors;
