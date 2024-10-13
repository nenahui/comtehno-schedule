import type { RootState } from '@/app/store';
import { axiosApi } from '@/axiosApi';
import type { Group, Schedule } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGroups = createAsyncThunk<Group[], void, { state: RootState }>(
  'home/fetchGroups',
  async (_arg, { getState }) => {
    const state = getState().home;
    const { data: groups } = await axiosApi.get<Group[]>(
      `/groups?course=${state.selectedCourse ? state.selectedCourse.toString() : ''}`
    );

    return groups;
  }
);

export const fetchSchedules = createAsyncThunk<Schedule[], void, { state: RootState }>(
  'home/fetchSchedules',
  async (_arg, { getState }) => {
    const state = getState().home;
    const { data: schedules } = await axiosApi.get<Schedule[]>(
      `/schedules?dayOfWeek=${state.selectedDay.toString()}&groupId=${state.selectedGroup ? state.selectedGroup.toString() : ''}&course=${state.selectedCourse ? state.selectedCourse : ''}`
    );

    return schedules;
  }
);
