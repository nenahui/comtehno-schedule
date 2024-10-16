import { createGroup, deleteGroup, fetchGroups } from '@/features/groups/groupsThunks';
import type { Group } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface GroupsState {
  groups: Group[];
  groupsFetching: boolean;
  groupsCreating: boolean;
  groupsDeleting: number | null;
  groupsEditing: boolean;
}

const initialState: GroupsState = {
  groups: [],
  groupsFetching: false,
  groupsCreating: false,
  groupsDeleting: null,
  groupsEditing: false,
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.groupsFetching = true;
      })
      .addCase(fetchGroups.fulfilled, (state, { payload: groups }) => {
        state.groups = groups;
        state.groupsFetching = false;
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.groupsFetching = false;
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

    builder
      .addCase(deleteGroup.pending, (state, { meta }) => {
        state.groupsDeleting = meta.arg;
      })
      .addCase(deleteGroup.fulfilled, (state, { meta }) => {
        state.groups = state.groups.filter((group) => group.id !== meta.arg);
        state.groupsDeleting = null;
      })
      .addCase(deleteGroup.rejected, (state) => {
        state.groupsDeleting = null;
      });
  },
  selectors: {
    selectGroups: (state) => state.groups,
    selectGroupsFetching: (state) => state.groupsFetching,
    selectGroupsCreating: (state) => state.groupsCreating,
    selectGroupsDeleting: (state) => state.groupsDeleting,
    selectGroupsEditing: (state) => state.groups,
  },
});

export const { selectGroups, selectGroupsFetching, selectGroupsCreating, selectGroupsDeleting, selectGroupsEditing } =
  groupsSlice.selectors;
