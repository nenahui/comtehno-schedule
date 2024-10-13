import {
  fetchAudiences,
  fetchDisciplines,
  fetchGroups,
  fetchTeachers,
} from '@/features/createSchedule/createScheduleThunks';
import type { Audience, Discipline, Group, Teacher } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  groups: Group[];
  teachers: Teacher[];
  audiences: Audience[];
  disciplines: Discipline[];
  groupsFetching: boolean;
  teachersFetching: boolean;
  disciplinesFetching: boolean;
  audiencesFetching: boolean;
}

const initialState: AdminState = {
  groups: [],
  teachers: [],
  disciplines: [],
  audiences: [],
  groupsFetching: false,
  teachersFetching: false,
  disciplinesFetching: false,
  audiencesFetching: false,
};

export const createScheduleSlice = createSlice({
  name: 'createSchedule',
  initialState,
  reducers: {
    setAdminGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.pending, (state) => {
      state.groupsFetching = true;
    });
    builder.addCase(fetchGroups.fulfilled, (state, { payload: groups }) => {
      state.groups = groups;
      state.groupsFetching = false;
    });
    builder.addCase(fetchGroups.rejected, (state) => {
      state.groupsFetching = false;
    });

    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.teachersFetching = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, { payload: teachers }) => {
        state.teachers = teachers;
        state.teachersFetching = false;
      })
      .addCase(fetchTeachers.rejected, (state) => {
        state.teachersFetching = false;
      });

    builder
      .addCase(fetchDisciplines.pending, (state) => {
        state.disciplinesFetching = true;
      })
      .addCase(fetchDisciplines.fulfilled, (state, { payload: discipline }) => {
        state.disciplines = discipline;
        state.disciplinesFetching = false;
      })
      .addCase(fetchDisciplines.rejected, (state) => {
        state.disciplinesFetching = false;
      });

    builder
      .addCase(fetchAudiences.pending, (state) => {
        state.audiencesFetching = true;
      })
      .addCase(fetchAudiences.fulfilled, (state, { payload: audiences }) => {
        state.audiences = audiences;
        state.audiencesFetching = false;
      })
      .addCase(fetchAudiences.rejected, (state) => {
        state.audiencesFetching = false;
      });
  },
  selectors: {
    selectAdminGroups: (state) => state.groups,
    selectAdminGroupsFetching: (state) => state.groupsFetching,
    selectAdminTeachers: (state) => state.teachers,
    selectAdminTeachersFetching: (state) => state.teachersFetching,
    selectAdminDisciplines: (state) => state.disciplines,
    selectAdminDisciplinesFetching: (state) => state.disciplinesFetching,
    selectAdminAudiences: (state) => state.audiences,
    selectAdminAudiencesFetching: (state) => state.audiencesFetching,
  },
});

export const { setAdminGroups } = createScheduleSlice.actions;
export const {
  selectAdminGroups,
  selectAdminGroupsFetching,
  selectAdminTeachersFetching,
  selectAdminTeachers,
  selectAdminDisciplinesFetching,
  selectAdminDisciplines,
  selectAdminAudiencesFetching,
  selectAdminAudiences,
} = createScheduleSlice.selectors;
