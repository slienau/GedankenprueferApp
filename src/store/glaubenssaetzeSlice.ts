import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import universelleGS from "../resources/universelle-glaubenssaetze";
import { RootState } from "./index";
import { GlaubenssatzDataItem, GlaubenssatzStatusType } from "../services/db";

export interface GlaubenssaetzeState {
  entities: Record<string, GlaubenssatzDataItem>;
  selectedGsId: GlaubenssatzDataItem["id"] | null;
  selectedInversion: string | null;
}

const randomInteger = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};

const createNewGs = (
  title: string,
  isOwnGs: boolean = false,
): GlaubenssatzDataItem => {
  const id = randomInteger();
  return {
    id,
    title,
    dateCreated: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
    isUniversal: isOwnGs,
    status: GlaubenssatzStatusType.Leer,
    inversions: {},
    positiveExamples: [],
  };
};

const initialState: GlaubenssaetzeState = {
  entities: universelleGS.reduce(
    (acc: Record<number, GlaubenssatzDataItem>, gs: string) => {
      const newGs = createNewGs(gs);
      acc[newGs.id] = newGs;
      return acc;
    },
    {},
  ),
  selectedGsId: null,
  selectedInversion: null,
};

export const glaubenssaetzeSlice = createSlice({
  name: "glaubenssaetze",
  initialState,
  reducers: {
    addGs: (state, action: PayloadAction<string>) => {
      const newGs = createNewGs(action.payload, true);
      state.entities[newGs.id] = newGs;
      state.selectedGsId = newGs.id;
    },
    deleteGs: (state, action: PayloadAction<{ id: number }>) => {
      delete state.entities[action.payload.id];
    },
    selectGs: (state, action: PayloadAction<{ id: number }>) => {
      state.selectedGsId = action.payload.id;
    },
    selectInversion: (state, action: PayloadAction<{ inversion: string }>) => {
      state.selectedInversion = action.payload.inversion;
    },
    update: (
      state,
      action: PayloadAction<
        { id: number } & Partial<Omit<GlaubenssatzDataItem, "inversions">>
      >,
    ) => {
      const { payload } = action;
      console.debug("updating glaubenssatz:", payload);
      state.entities[payload.id] = _.merge(state.entities[payload.id], payload);
      state.entities[payload.id].dateUpdated = new Date().toISOString();
    },
    addInversion: (
      state,
      action: PayloadAction<{ id: number; inversion: string }>,
    ) => {
      const { payload } = action;
      const gs = state.entities[payload.id];
      gs.inversions[payload.inversion] = [];
      gs.dateUpdated = new Date().toISOString();
    },
    editInversion: (
      state,
      action: PayloadAction<{ oldInversion: string; newInversion: string }>,
    ) => {
      const { oldInversion, newInversion } = action.payload;
      if (state.selectedGsId === null) return;
      const gs = state.entities[state.selectedGsId];

      // Erstelle ein neues Inversionsobjekt mit den Keys in der gewünschten Reihenfolge
      const newInversions = Object.keys(gs.inversions).reduce((obj, key) => {
        if (key === oldInversion) {
          return { ...obj, [newInversion]: gs.inversions[oldInversion] };
        } else {
          return { ...obj, [key]: gs.inversions[key] };
        }
      }, {});

      // Ersetze das alte Inversionsobjekt durch das neue
      gs.inversions = newInversions;
    },
    removeInversion: (
      state,
      action: PayloadAction<{ gsId: number; inversion: string }>,
    ) => {
      const { payload } = action;
      delete state.entities[payload.gsId].inversions[payload.inversion];
    },
    addInversionExample: (
      state,
      action: PayloadAction<{
        example: string;
      }>,
    ) => {
      if (state.selectedGsId === null || state.selectedInversion === null)
        return;
      const { payload } = action;
      const gs = state.entities[state.selectedGsId];
      gs.inversions[state.selectedInversion].push(payload.example);
      gs.dateUpdated = new Date().toISOString();
    },
    removeInversionExample: (
      state,
      action: PayloadAction<{
        example: string;
      }>,
    ) => {
      if (state.selectedGsId === null || state.selectedInversion === null)
        return;
      const { payload } = action;
      const gs = state.entities[state.selectedGsId];

      // remove example from inversion
      gs.inversions[state.selectedInversion].splice(
        gs.inversions[state.selectedInversion].findIndex(
          (arrow) => arrow === payload.example,
        ),
        1,
      );

      // update dateUpdated
      state.entities[state.selectedGsId].dateUpdated = new Date().toISOString();
    },
    editInversionExample: (
      state,
      action: PayloadAction<{
        oldExample: string;
        newExample: string;
      }>,
    ) => {
      if (state.selectedGsId === null || state.selectedInversion === null)
        return;
      const { payload } = action;
      const gs = state.entities[state.selectedGsId];

      // replace example in inversion
      gs.inversions[state.selectedInversion].splice(
        gs.inversions[state.selectedInversion].findIndex(
          (arrow) => arrow === payload.oldExample,
        ),
        1,
        payload.newExample,
      );

      // update dateUpdated
      state.entities[state.selectedGsId].dateUpdated = new Date().toISOString();
    },
    addPositiveExample: (
      state,
      action: PayloadAction<{
        example: string;
      }>,
    ) => {
      if (state.selectedGsId === null) return;
      const { payload } = action;
      const gs = state.entities[state.selectedGsId];
      gs.positiveExamples.push(payload.example);
      gs.dateUpdated = new Date().toISOString();
    },
    removePositiveExample: (
      state,
      action: PayloadAction<{
        example: string;
      }>,
    ) => {
      if (state.selectedGsId === null) return;
      const { payload } = action;
      const gs = state.entities[state.selectedGsId];

      // remove example from inversion
      gs.positiveExamples.splice(
        gs.positiveExamples.findIndex((arrow) => arrow === payload.example),
        1,
      );

      // update dateUpdated
      state.entities[state.selectedGsId].dateUpdated = new Date().toISOString();
    },
    editPositiveExample: (
      state,
      action: PayloadAction<{
        oldExample: string;
        newExample: string;
      }>,
    ) => {
      if (state.selectedGsId === null) return;
      const { payload } = action;
      const gs = state.entities[state.selectedGsId];

      // replace example in inversion
      gs.positiveExamples.splice(
        gs.positiveExamples.findIndex((arrow) => arrow === payload.oldExample),
        1,
        payload.newExample,
      );

      // update dateUpdated
      state.entities[state.selectedGsId].dateUpdated = new Date().toISOString();
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = glaubenssaetzeSlice.actions;

export const glaubenssaetzeReducer = glaubenssaetzeSlice.reducer;

// selectors
const getDataState = (state: RootState) => state.glaubenssaetze.entities;

export const getSelectedGsId = (state: RootState) =>
  state.glaubenssaetze.selectedGsId;

export const getSelectedGs = createSelector(
  [getDataState, getSelectedGsId],
  (data, selectedId) => {
    if (selectedId === null) {
      return null; // or handle the case when selectedId is null
    }
    return data[selectedId];
  },
);

export const getSelectedInversion = (state: RootState) =>
  state.glaubenssaetze.selectedInversion;

export const getSelectedInversionExamples = createSelector(
  [getSelectedGs, getSelectedInversion],
  (gs, selectedInversion) => {
    if (selectedInversion === null || gs === null) {
      return null; // or handle the case when selectedId is null
    }
    return gs.inversions[selectedInversion];
  },
);
