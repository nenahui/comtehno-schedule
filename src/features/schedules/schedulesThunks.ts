import type { RootState } from '@/app/store';
import { axiosApi } from '@/axiosApi';
import type { DeleteError, Schedule, ScheduleMutation } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export const fetchSchedules = createAsyncThunk<Schedule[], void, { state: RootState }>(
  'home/fetchSchedules',
  async (_arg, { getState }) => {
    const state = getState().schedules;
    const { data: schedules } = await axiosApi.get<Schedule[]>(
      `/schedules?dayOfWeek=${state.selectedDay.toString()}&groupId=${state.selectedGroup ? state.selectedGroup.toString() : ''}&course=${state.selectedCourse ? state.selectedCourse : ''}`
    );

    return schedules;
  }
);

export const createSchedule = createAsyncThunk<void, ScheduleMutation>(
  'admin/createSchedule',
  async (scheduleMutatioon) => {
    await axiosApi.post('/schedules', scheduleMutatioon);
  }
);

export const deleteSchedule = createAsyncThunk<void, number>(
  'admin/deleteSchedule',
  async (id, { rejectWithValue }) => {
    try {
      await axiosApi.delete(`/schedules/${id}`);
    } catch (error) {
      const errorMessage = (error as DeleteError).response.data.message;
      toast.error(errorMessage, {
        className: 'border',
      });
      return rejectWithValue(errorMessage || 'Unknown error');
    }
  }
);
