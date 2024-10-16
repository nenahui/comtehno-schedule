import { createSchedule, fetchSchedules } from '@/features/schedules/schedulesThunks';
import type { Schedule } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SchedulesState {
  schedules: Schedule[];
  schedulesFetching: boolean;
  schedulesCreating: boolean;
  schedulesDeleting: number | null;
  schedulesEditing: boolean;
  selectedGroup: number | null;
  selectedDay: number;
  selectedCourse: number | null;
}

const now = new Date().getDay();

const initialState: SchedulesState = {
  schedules: [],
  schedulesFetching: false,
  schedulesCreating: false,
  schedulesDeleting: null,
  schedulesEditing: false,
  selectedCourse: null,
  selectedDay: now,
  selectedGroup: null,
};

export const schedulesSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    setCourse: (state, action: PayloadAction<number>) => {
      state.schedules = [];
      state.selectedGroup = null;
      state.selectedCourse = action.payload;
    },
    setDay: (state, action: PayloadAction<number>) => {
      state.selectedDay = action.payload;
    },
    setGroup: (state, action: PayloadAction<number>) => {
      state.selectedGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
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
      .addCase(createSchedule.pending, (state) => {
        state.schedulesCreating = true;
      })
      .addCase(createSchedule.fulfilled, (state) => {
        state.schedulesCreating = false;
      })
      .addCase(createSchedule.rejected, (state) => {
        state.schedulesCreating = false;
      });
  },
  selectors: {
    selectSchedules: (state: SchedulesState) => state.schedules,
    selectSchedulesFetching: (state: SchedulesState) => state.schedulesFetching,
    selectSchedulesCreating: (state: SchedulesState) => state.schedulesCreating,
    selectSchedulesDeleting: (state: SchedulesState) => state.schedulesDeleting,
    selectSchedulesEditing: (state: SchedulesState) => state.schedulesEditing,
    selectGroup: (state: SchedulesState) => state.selectedGroup,
    selectDay: (state: SchedulesState) => state.selectedDay,
    selectCourse: (state: SchedulesState) => state.selectedCourse,
  },
});

export const {
  selectSchedules,
  selectSchedulesDeleting,
  selectSchedulesFetching,
  selectSchedulesEditing,
  selectSchedulesCreating,
  selectGroup,
  selectDay,
  selectCourse,
} = schedulesSlice.selectors;
export const { setGroup, setDay, setCourse } = schedulesSlice.actions;
