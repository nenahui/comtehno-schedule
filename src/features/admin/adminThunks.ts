import { axiosApi } from '@/axiosApi';
import type {
  Audience,
  AudienceMutation,
  AudienceType,
  DeleteError,
  Discipline,
  DisciplineMutation,
  Group,
  GroupMutation,
  ScheduleMutation,
  Teacher,
  TeacherMutation,
} from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';

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

export const createTeacher = createAsyncThunk<Teacher, TeacherMutation>(
  'admin/createTeacher',
  async (teachersMutation) => {
    const { data: teacher } = await axiosApi.post<Teacher>('/teachers', teachersMutation);

    return teacher;
  }
);

export const createGroup = createAsyncThunk<Group, GroupMutation>(
  'admin/createGroup',
  async (groupMutation: GroupMutation) => {
    const { data: group } = await axiosApi.post<Group>('/groups', groupMutation);

    return group;
  }
);

export const createDiscipline = createAsyncThunk(
  'admin/createDiscipline',
  async (disciplineMutation: DisciplineMutation) => {
    const { data: discipline } = await axiosApi.post<Discipline>('/disciplines', disciplineMutation);

    return discipline;
  }
);

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
