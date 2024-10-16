import { axiosApi } from '@/axiosApi';
import type { DeleteError, Teacher, TeacherMutation } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export const fetchTeachers = createAsyncThunk('admin/fetchTeachers', async () => {
  const { data: teachers } = await axiosApi.get<Teacher[]>('/teachers');

  return teachers;
});

export const createTeacher = createAsyncThunk<Teacher, TeacherMutation>(
  'admin/createTeacher',
  async (teachersMutation) => {
    const { data: teacher } = await axiosApi.post<Teacher>('/teachers', teachersMutation);

    return teacher;
  }
);

export const deleteTeacher = createAsyncThunk<void, number>('admin/deleteTeacher', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/teachers/${id}`);
  } catch (error) {
    const errorMessage = (error as DeleteError).response.data.message;
    toast.error(errorMessage, {
      className: 'border',
    });
    return rejectWithValue(errorMessage || 'Unknown error');
  }
});
