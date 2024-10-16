import type { RootState } from '@/app/store';
import { axiosApi } from '@/axiosApi';
import type { DeleteError, Group, GroupsMutation } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export const fetchGroups = createAsyncThunk<Group[], void, { state: RootState }>(
  'admin/fetchGroups',
  async (_arg, { getState }) => {
    const course = getState().schedules.selectedCourse;
    const { data: groups } = await axiosApi.get<Group[]>('/groups?course=' + course);

    return groups;
  }
);

export const createGroup = createAsyncThunk<Group, GroupsMutation>(
  'admin/createGroup',
  async (groupMutation: GroupsMutation) => {
    const { data: group } = await axiosApi.post<Group>('/groups', groupMutation);

    return group;
  }
);

export const deleteGroup = createAsyncThunk<void, number>('admin/deleteGroup', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/groups/${id}`);
  } catch (error) {
    const errorMessage = (error as DeleteError).response.data.message;
    toast.error(errorMessage, {
      className: 'border',
    });
    return rejectWithValue(errorMessage || 'Unknown error');
  }
});
