import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as Crypto from "expo-crypto";
import _ from "lodash";

import universelleGS from "../../resources/universelle-glaubenssaetze";
import { RootState } from "../../store";

export type GlaubenssatzDataItem = {
  id: string;
  title: string;
  q1_isThatTrue?: boolean;
  q2_isThatAbsolutelyTrue?: boolean;
  q3_whatHappensIfYouBelieveTheThought?: string;
  q4_whoWouldYouBeWithoutTheThought?: string;
  dateCreated: Date;
  dateUpdated: Date;
  isOwnGs: boolean;
  inversions: Record<string, Array<string>>; // key: inversion; value: array of examples
};

export interface GlaubenssaetzeState {
  entities: Record<string, GlaubenssatzDataItem>;
  selectedGsId: GlaubenssatzDataItem["id"] | null;
  selectedInversion: string | null;
}

const initialState: GlaubenssaetzeState = {
  entities: universelleGS.reduce(
    (acc: Record<string, GlaubenssatzDataItem>, gs: string) => {
      const id = Crypto.randomUUID();
      acc[id] = {
        id,
        title: gs,
        dateCreated: new Date(),
        dateUpdated: new Date(),
        isOwnGs: false,
        inversions: {},
      };
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
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const id = Crypto.randomUUID();
      state.entities[id] = {
        id,
        title: action.payload,
        dateCreated: new Date(),
        dateUpdated: new Date(),
        isOwnGs: true,
        inversions: {},
      };
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
      state.entities[payload.id].dateUpdated = new Date();
    },
    addInversion: (
      state,
      action: PayloadAction<{ id: string; inversion: string }>,
    ) => {
      const { payload } = action;
      const gs = state.entities[payload.id];
      gs.inversions[payload.inversion] = [];
      gs.dateUpdated = new Date();
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
      gs.dateUpdated = new Date();
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
