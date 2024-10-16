import { axiosApi } from '@/axiosApi';
import type { Audience, AudienceMutation, AudienceType, DeleteError } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export const fetchAudiences = createAsyncThunk('admin/fetchAudiences', async () => {
  const { data: audiences } = await axiosApi.get<Audience[]>('/audiences');

  return audiences;
});

export const fetchAudienceTypes = createAsyncThunk('admin/fetchAudienceTypes', async () => {
  const { data: audienceTypes } = await axiosApi.get<AudienceType[]>('/audiences/types');

  return audienceTypes;
});

export const createAudience = createAsyncThunk<Audience, AudienceMutation>(
  'admin/createAudience',
  async (audience: AudienceMutation) => {
    const { data: newAudience } = await axiosApi.post<Audience>('/audiences', audience);

    return newAudience;
  }
);

export const deleteAudience = createAsyncThunk<void, number>(
  'admin/deleteAudience',
  async (id, { rejectWithValue }) => {
    try {
      await axiosApi.delete(`/audiences/${id}`);
    } catch (error) {
      const errorMessage = (error as DeleteError).response.data.message;
      toast.error(errorMessage, {
        className: 'border',
      });
      return rejectWithValue(errorMessage || 'Unknown error');
    }
  }
);
