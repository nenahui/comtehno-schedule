import { createDiscipline, deleteDiscipline, fetchDisciplines } from '@/features/disciplines/disciplinesThunks';
import type { Discipline } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface DisciplinesState {
  disciplines: Discipline[];
  disciplinesFetching: boolean;
  disciplinesCreating: boolean;
  disciplinesDeleting: number | null;
  disciplinesEditing: boolean;
}

const initialState: DisciplinesState = {
  disciplines: [],
  disciplinesFetching: false,
  disciplinesCreating: false,
  disciplinesDeleting: null,
  disciplinesEditing: false,
};

export const disciplinesSlice = createSlice({
  name: 'disciplines',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDisciplines.pending, (state) => {
        state.disciplinesFetching = true;
      })
      .addCase(fetchDisciplines.fulfilled, (state, { payload: disciplines }) => {
        state.disciplines = disciplines;
        state.disciplinesFetching = false;
      })
      .addCase(fetchDisciplines.rejected, (state) => {
        state.disciplinesFetching = false;
      });

    builder
      .addCase(createDiscipline.pending, (state) => {
        state.disciplinesCreating = true;
      })
      .addCase(createDiscipline.fulfilled, (state, { payload: discipline }) => {
        state.disciplines.push(discipline);
        state.disciplinesCreating = false;
      })
      .addCase(createDiscipline.rejected, (state) => {
        state.disciplinesCreating = false;
      });

    builder
      .addCase(deleteDiscipline.pending, (state, { meta }) => {
        state.disciplinesDeleting = meta.arg;
      })
      .addCase(deleteDiscipline.fulfilled, (state) => {
        state.disciplines = state.disciplines.filter((discipline) => discipline.id !== state.disciplinesDeleting);
        state.disciplinesDeleting = null;
      })
      .addCase(deleteDiscipline.rejected, (state) => {
        state.disciplinesDeleting = null;
      });
  },
  selectors: {
    selectDisciplines: (state) => state.disciplines,
    selectDisciplinesFetching: (state) => state.disciplinesFetching,
    selectDisciplinesCreating: (state) => state.disciplinesCreating,
    selectDisciplinesDeleting: (state) => state.disciplinesDeleting,
    selectDisciplinesEditing: (state) => state.disciplinesEditing,
  },
});

export const {
  selectDisciplines,
  selectDisciplinesFetching,
  selectDisciplinesCreating,
  selectDisciplinesDeleting,
  selectDisciplinesEditing,
} = disciplinesSlice.selectors;
