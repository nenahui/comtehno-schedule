import { axiosApi } from '@/axiosApi';
import type { Audience, Discipline, Group, ScheduleMutation, Teacher } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGroups = createAsyncThunk<Group[], string>('admin/fetchGroups', async (course) => {
  const { data: groups } = await axiosApi.get<Group[]>('/groups?course=' + course);

  return groups;
});

export const fetchTeachers = createAsyncThunk('admin/fetchTeachers', async () => {
  const { data: teachers } = await axiosApi.get<Teacher[]>('/teachers');

  return teachers;
});

export const fetchDisciplines = createAsyncThunk('admin/fetchDisciplines', async () => {
  const { data: disciplines } = await axiosApi.get<Discipline[]>('/disciplines');

  return disciplines;
});

export const fetchAudiences = createAsyncThunk('admin/fetchAudiences', async () => {
  const { data: audiences } = await axiosApi.get<Audience[]>('/audiences');

  return audiences;
});

export const createSchedule = createAsyncThunk<void, ScheduleMutation>(
  'admin/createSchedule',
  async (scheduleMutatioon) => {
    await axiosApi.post('/schedules', scheduleMutatioon);
  }
);
