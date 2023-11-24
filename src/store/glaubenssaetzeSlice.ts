import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as Crypto from "expo-crypto";
import _ from "lodash";

import universelleGS from "../resources/universelle-glaubenssaetze";
import { RootState } from "./index";

export enum GlaubenssatzStatusType {
  Leer = "   ",
  Einschraenkend = "einschränkend",
  OffenFuerZweifel = "offen für Zweifel",
  MuseumAlterGS = "Museum alter GS",
  HeiligerPlatz = "Heiliger Platz",
}

export type GlaubenssatzDataItem = {
  id: string;
  title: string;
  q1_isThatTrue?: boolean;
  q2_isThatAbsolutelyTrue?: boolean;
  q3_whatHappensIfYouBelieveTheThought?: string;
  q4_whoWouldYouBeWithoutTheThought?: string;
  dateCreated: string;
  dateUpdated: string;
  isOwnGs: boolean;
  status: GlaubenssatzStatusType;
  inversions: Record<string, Array<string>>; // key: inversion; value: array of examples
};

export interface GlaubenssaetzeState {
  entities: Record<string, GlaubenssatzDataItem>;
  selectedGsId: GlaubenssatzDataItem["id"] | null;
  selectedInversion: string | null;
}

const createNewGs = (
  title: string,
  isOwnGs: boolean = false,
): GlaubenssatzDataItem => {
  const id = Crypto.randomUUID();
  return {
    id,
    title,
    dateCreated: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
    isOwnGs,
    status: GlaubenssatzStatusType.Leer,
    inversions: {},
  };
};

const initialState: GlaubenssaetzeState = {
  entities: universelleGS.reduce(
    (acc: Record<string, GlaubenssatzDataItem>, gs: string) => {
      const id = Crypto.randomUUID();
      acc[id] = createNewGs(gs);
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
    },
    deleteGs: (state, action: PayloadAction<{ id: string }>) => {
      delete state.entities[action.payload.id];
    },
    selectGs: (state, action: PayloadAction<{ id: string }>) => {
      state.selectedGsId = action.payload.id;
    },
    selectInversion: (state, action: PayloadAction<{ inversion: string }>) => {
      state.selectedInversion = action.payload.inversion;
    },
    update: (
      state,
      action: PayloadAction<
        { id: string } & Partial<Omit<GlaubenssatzDataItem, "inversions">>
      >,
    ) => {
      const { payload } = action;
      state.entities[payload.id] = _.merge(state.entities[payload.id], payload);
      state.entities[payload.id].dateUpdated = new Date().toISOString();
    },
    addInversion: (
      state,
      action: PayloadAction<{ id: string; inversion: string }>,
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
      action: PayloadAction<{ gsId: string; inversion: string }>,
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
  },
});

// Action creators are generated for each case reducer function
export const actions = glaubenssaetzeSlice.actions;

export const glaubenssaetzeReducer = glaubenssaetzeSlice.reducer;

// selectors
const getDataState = (state: RootState) => state.glaubenssaetze.entities;
const getSelectedGsId = (state: RootState) => state.glaubenssaetze.selectedGsId;

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
