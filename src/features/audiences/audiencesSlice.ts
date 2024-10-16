import { createAudience, fetchAudiences, fetchAudienceTypes } from '@/features/audiences/audiencesThunks';
import type { Audience, AudienceType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface AudiencesState {
  audiences: Audience[];
  audiencesTypes: AudienceType[];
  audiencesFetching: boolean;
  audiencesTypesFetching: boolean;
  audiencesCreating: boolean;
  audiencesDeleting: number | null;
  audiencesEditing: number | null;
}

const initialState: AudiencesState = {
  audiences: [],
  audiencesTypes: [],
  audiencesFetching: false,
  audiencesTypesFetching: false,
  audiencesCreating: false,
  audiencesDeleting: null,
  audiencesEditing: null,
};

export const audiencesSlice = createSlice({
  name: 'audiences',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      .addCase(fetchAudienceTypes.pending, (state) => {
        state.audiencesTypesFetching = true;
      })
      .addCase(fetchAudienceTypes.fulfilled, (state, { payload: audiencesTypes }) => {
        state.audiencesTypes = audiencesTypes;
        state.audiencesTypesFetching = false;
      })
      .addCase(fetchAudienceTypes.rejected, (state) => {
        state.audiencesTypesFetching = false;
      });

    builder
      .addCase(createAudience.pending, (state) => {
        state.audiencesCreating = true;
      })
      .addCase(createAudience.fulfilled, (state, { payload: audience }) => {
        state.audiences.push(audience);
        state.audiencesCreating = false;
      })
      .addCase(createAudience.rejected, (state) => {
        state.audiencesCreating = false;
      });
  },
  selectors: {
    selectAudiences: (state) => state.audiences,
    selectAudiencesTypes: (state) => state.audiencesTypes,
    selectAudiencesFetching: (state) => state.audiencesFetching,
    selectAudienceTypesFetching: (state) => state.audiencesTypesFetching,
    selectAudienceCreating: (state) => state.audiencesCreating,
    selectAudienceDeleting: (state) => state.audiencesDeleting,
    selectAudienceEditing: (state) => state.audiencesEditing,
  },
});

export const {
  selectAudiences,
  selectAudiencesFetching,
  selectAudienceCreating,
  selectAudienceTypesFetching,
  selectAudienceDeleting,
  selectAudienceEditing,
  selectAudiencesTypes,
} = audiencesSlice.selectors;
