import { deleteSchedule } from '@/features/admin/adminThunks';
import { fetchGroups, fetchSchedules } from '@/features/home/homeThunks';
import type { Group, Schedule } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const now = new Date().getDay();

interface HomeState {
  groups: Group[];
  schedules: Schedule[];
  schedulesFetching: boolean;
  groupsFetching: boolean;
  selectedCourse: number | null;
  selectedDay: number;
  selectedGroup: number | null;
  schedulesDeleting: number | null;
}

const initialState: HomeState = {
  groups: [],
  schedules: [],
  schedulesFetching: false,
  groupsFetching: false,
  selectedCourse: 1,
  selectedDay: now,
  selectedGroup: null,
  schedulesDeleting: null,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSelectedCourse: (state, action: PayloadAction<number>) => {
      state.schedules = [];
      state.selectedGroup = null;
      state.selectedCourse = action.payload;
    },
    setSelectedDay: (state, action: PayloadAction<number>) => {
      state.selectedDay = action.payload;
    },
    setSelectedGroup: (state, action: PayloadAction<number>) => {
      state.selectedGroup = action.payload;
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
      .addCase(fetchSchedules.pending, (state) => {
        state.schedulesFetching = true;
      })
      .addCase(fetchSchedules.fulfilled, (state, { payload: schedules }) => {
        state.schedules = schedules;
        state.schedulesFetching = false;
      })
      .addCase(fetchSchedules.rejected, (state) => {
        state.schedulesFetching = false;
      });

    builder
      .addCase(deleteSchedule.pending, (state, { meta }) => {
        state.schedulesDeleting = meta.arg;
      })
      .addCase(deleteSchedule.fulfilled, (state, { meta }) => {
        state.schedules = state.schedules.filter((schedule) => schedule.id !== meta.arg);
        state.schedulesDeleting = null;
      })
      .addCase(deleteSchedule.rejected, (state) => {
        state.schedulesDeleting = null;
      });
  },
  selectors: {
    selectCourse: (state) => state.selectedCourse,
    selectGroups: (state) => state.groups,
    selectGroupsFetching: (state) => state.groupsFetching,
    selectSchedule: (state) => state.schedules,
    selectScheduleFetching: (state) => state.schedulesFetching,
    selectDay: (state) => state.selectedDay,
    selectGroup: (state) => state.selectedGroup,
    selectSchedulesDeleting: (state) => state.schedulesDeleting,
  },
});

export const { setSelectedCourse, setSelectedDay, setSelectedGroup } = homeSlice.actions;
export const {
  selectGroups,
  selectGroupsFetching,
  selectScheduleFetching,
  selectSchedule,
  selectCourse,
  selectDay,
  selectGroup,
  selectSchedulesDeleting,
} = homeSlice.selectors;
