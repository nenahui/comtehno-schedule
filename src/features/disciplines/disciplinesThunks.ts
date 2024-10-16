import { axiosApi } from '@/axiosApi';
import type { DeleteError, Discipline, DisciplineMutation } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export const fetchDisciplines = createAsyncThunk('admin/fetchDisciplines', async () => {
  const { data: disciplines } = await axiosApi.get<Discipline[]>('/disciplines');

  return disciplines;
});

export const createDiscipline = createAsyncThunk(
  'admin/createDiscipline',
  async (disciplineMutation: DisciplineMutation) => {
    const { data: discipline } = await axiosApi.post<Discipline>('/disciplines', disciplineMutation);

    return discipline;
  }
);

export const deleteDiscipline = createAsyncThunk<void, number>(
  'admin/deleteDiscipline',
  async (id, { rejectWithValue }) => {
    try {
      await axiosApi.delete(`/disciplines/${id}`);
    } catch (error) {
      const errorMessage = (error as DeleteError).response.data.message;
      toast.error(errorMessage, {
        className: 'border',
      });
      return rejectWithValue(errorMessage || 'Unknown error');
    }
  }
);
