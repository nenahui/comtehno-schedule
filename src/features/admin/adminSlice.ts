import {
  createAudience,
  createDiscipline,
  createGroup,
  createSchedule,
  createTeacher,
  deleteAudience,
  deleteDiscipline,
  deleteGroup,
  deleteTeacher,
  fetchAudiences,
  fetchAudienceTypes,
  fetchDisciplines,
  fetchGroups,
  fetchTeachers,
} from '@/features/admin/adminThunks';
import type { Audience, AudienceType, Discipline, Group, Teacher } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  groups: Group[];
  teachers: Teacher[];
  audiences: Audience[];
  disciplines: Discipline[];
  audienceTypes: AudienceType[];
  audienceTypesFetching: boolean;
  audienceCreating: boolean;
  groupsFetching: boolean;
  teachersFetching: boolean;
  groupsCreating: boolean;
  disciplinesFetching: boolean;
  audiencesFetching: boolean;
  teachersCreating: boolean;
  schedulesCreating: boolean;
  disciplinesCreating: boolean;
  teachersDeleting: number | null;
  disciplinesDeleting: number | null;
  groupsDeleting: number | null;
  audienceDeleting: number | null;
}

const initialState: AdminState = {
  groups: [],
  teachers: [],
  disciplines: [],
  audiences: [],
  audienceTypes: [],
  audienceTypesFetching: false,
  audienceCreating: false,
  groupsFetching: false,
  teachersFetching: false,
  disciplinesFetching: false,
  schedulesCreating: false,
  audiencesFetching: false,
  groupsCreating: false,
  teachersCreating: false,
  disciplinesCreating: false,
  teachersDeleting: null,
  disciplinesDeleting: null,
  groupsDeleting: null,
  audienceDeleting: null,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
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
      .addCase(fetchTeachers.pending, (state) => {
        state.teachersFetching = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, { payload: teachers }) => {
        state.teachers = teachers;
        state.teachersFetching = false;
      })
      .addCase(fetchTeachers.rejected, (state) => {
        state.teachersFetching = false;
      });

    builder
      .addCase(fetchDisciplines.pending, (state) => {
        state.disciplinesFetching = true;
      })
      .addCase(fetchDisciplines.fulfilled, (state, { payload: discipline }) => {
        state.disciplines = discipline;
        state.disciplinesFetching = false;
      })
      .addCase(fetchDisciplines.rejected, (state) => {
        state.disciplinesFetching = false;
      });

    builder
      .addCase(fetchAudiences.pending, (state) => {
        state.audiencesFetching = true;
      })
      .addCase(fetchAudiences.fulfilled, (state, { payload: audiences }) => {
        state.audiences = audiences;
        state.audiencesFetching = false;
      })
      .addCase(fetchAudiences.rejected, (state) => {
        state.audiencesFetching = false;
      });

    builder
      .addCase(createTeacher.pending, (state) => {
        state.teachersCreating = true;
      })
      .addCase(createTeacher.fulfilled, (state, { payload: teacher }) => {
        state.teachersCreating = false;
        state.teachers.push(teacher);
      })
      .addCase(createTeacher.rejected, (state) => {
        state.teachersCreating = false;
      });

    builder
      .addCase(createDiscipline.pending, (state) => {
        state.disciplinesCreating = true;
      })
      .addCase(createDiscipline.fulfilled, (state, { payload: discipline }) => {
        state.disciplinesCreating = false;
        state.disciplines.push(discipline);
      })
      .addCase(createDiscipline.rejected, (state) => {
        state.disciplinesCreating = false;
      });

    builder
      .addCase(fetchAudienceTypes.pending, (state) => {
        state.audienceTypesFetching = true;
      })
      .addCase(fetchAudienceTypes.fulfilled, (state, { payload: audienceTypes }) => {
        state.audienceTypes = audienceTypes;
        state.audienceTypesFetching = false;
      })
      .addCase(fetchAudienceTypes.rejected, (state) => {
        state.audienceTypesFetching = false;
      });

    builder
      .addCase(createAudience.pending, (state) => {
        state.audienceCreating = true;
      })
      .addCase(createAudience.fulfilled, (state, { payload: audience }) => {
        state.audienceCreating = false;
        state.audiences.push(audience);
      })
      .addCase(createAudience.rejected, (state) => {
        state.audienceCreating = false;
      });

    builder
      .addCase(deleteTeacher.pending, (state, { meta }) => {
        state.teachersDeleting = meta.arg;
      })
      .addCase(deleteTeacher.fulfilled, (state, { meta }) => {
        state.teachersDeleting = null;
        state.teachers = state.teachers.filter((teacher) => teacher.id !== meta.arg);
      })
      .addCase(deleteTeacher.rejected, (state) => {
        state.teachersDeleting = null;
      });

    builder
      .addCase(deleteDiscipline.pending, (state, { meta }) => {
        state.disciplinesDeleting = meta.arg;
      })
      .addCase(deleteDiscipline.fulfilled, (state, { meta }) => {
        state.disciplinesDeleting = null;
        state.disciplines = state.disciplines.filter((discipline) => discipline.id !== meta.arg);
      })
      .addCase(deleteDiscipline.rejected, (state) => {
        state.disciplinesDeleting = null;
      });

    builder
      .addCase(deleteGroup.pending, (state, { meta }) => {
        state.groupsDeleting = meta.arg;
      })
      .addCase(deleteGroup.fulfilled, (state, { meta }) => {
        state.groupsDeleting = null;
        state.groups = state.groups.filter((group) => group.id !== meta.arg);
      })
      .addCase(deleteGroup.rejected, (state) => {
        state.groupsDeleting = null;
      });

    builder
      .addCase(deleteAudience.pending, (state, { meta }) => {
        state.audienceDeleting = meta.arg;
      })
      .addCase(deleteAudience.fulfilled, (state, { meta }) => {
        state.audiences = state.audiences.filter((audience) => audience.id !== meta.arg);
        state.audienceDeleting = null;
      })
      .addCase(deleteAudience.rejected, (state) => {
        state.audienceDeleting = null;
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

    builder
      .addCase(createGroup.pending, (state) => {
        state.groupsCreating = true;
      })
      .addCase(createGroup.fulfilled, (state, { payload: group }) => {
        state.groups.push(group);
        state.groupsCreating = false;
      })
      .addCase(createGroup.rejected, (state) => {
        state.groupsCreating = false;
      });
  },
  selectors: {
    selectAdminGroups: (state) => state.groups,
    selectAdminGroupsFetching: (state) => state.groupsFetching,
    selectAdminTeachers: (state) => state.teachers,
    selectAdminTeachersFetching: (state) => state.teachersFetching,
    selectAdminDisciplines: (state) => state.disciplines,
    selectAdminDisciplinesFetching: (state) => state.disciplinesFetching,
    selectAdminAudiences: (state) => state.audiences,
    selectAdminAudiencesFetching: (state) => state.audiencesFetching,
    selectAdminTeachersCreating: (state) => state.teachersCreating,
    selectAdminDisciplinesCreating: (state) => state.disciplinesCreating,
    selectAdminScheduleCreating: (state) => state.schedulesCreating,
    selectAdminAudienceTypes: (state) => state.audienceTypes,
    selectAdminAudienceTypesFetching: (state) => state.audienceTypesFetching,
    selectAdminAudienceCreating: (state) => state.audienceCreating,
    selectAdminTeachersDeleting: (state) => state.teachersDeleting,
    selectAdminDisciplinesDeleting: (state) => state.disciplinesDeleting,
    selectAdminGroupsDeleting: (state) => state.groupsDeleting,
    selectAdminAudienceDeleting: (state) => state.audienceDeleting,
    selectAdminGroupsCreating: (state) => state.groupsCreating,
  },
});

export const { setAdminGroups } = adminSlice.actions;
export const {
  selectAdminGroups,
  selectAdminGroupsFetching,
  selectAdminTeachersFetching,
  selectAdminTeachers,
  selectAdminDisciplinesFetching,
  selectAdminTeachersDeleting,
  selectAdminDisciplines,
  selectAdminAudiencesFetching,
  selectAdminAudiences,
  selectAdminGroupsCreating,
  selectAdminTeachersCreating,
  selectAdminDisciplinesCreating,
  selectAdminAudienceTypesFetching,
  selectAdminAudienceTypes,
  selectAdminAudienceCreating,
  selectAdminDisciplinesDeleting,
  selectAdminScheduleCreating,
  selectAdminGroupsDeleting,
  selectAdminAudienceDeleting,
} = adminSlice.selectors;
