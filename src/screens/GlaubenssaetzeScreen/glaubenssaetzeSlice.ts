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
  inversions: Record<string, Array<string>>; // key: inversion: value: array of examples
};

export interface GlaubenssaetzeState {
  entities: Record<string, GlaubenssatzDataItem>;
  selectedId: GlaubenssatzDataItem["id"] | null;
}

const initialState: GlaubenssaetzeState = {
  entities: universelleGS.reduce(
    (acc: Record<string, GlaubenssatzDataItem>, gs: string) => {
      const id = Crypto.randomUUID();
      acc[id] = {
        id,
        title: gs,
        inversions: {},
      };
      return acc;
    },
    {},
  ),
  selectedId: null,
};

export const glaubenssaetzeSlice = createSlice({
  name: "glaubenssaetze",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const id = Crypto.randomUUID();
      state.entities[id] = {
        id: Crypto.randomUUID(),
        title: action.payload,
        inversions: {},
      };
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      delete state.entities[action.payload.id];
    },
    select: (state, action: PayloadAction<{ id: string }>) => {
      state.selectedId = action.payload.id;
    },
    update: (
      state,
      action: PayloadAction<
        { id: string } & Partial<Omit<GlaubenssatzDataItem, "inversions">>
      >,
    ) => {
      console.log("update GS", action.payload);
      const { payload } = action;
      state.entities[payload.id] = _.merge(state.entities[payload.id], payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = glaubenssaetzeSlice.actions;

export const glaubenssaetzeReducer = glaubenssaetzeSlice.reducer;

// selectors
const getDataState = (state: RootState) => state.glaubenssaetze.entities;
const getSelectedId = (state: RootState) => state.glaubenssaetze.selectedId;

export const getSelectedGs = createSelector(
  [getDataState, getSelectedId],
  (data, selectedId) => {
    if (selectedId === null) {
      return null; // or handle the case when selectedId is null
    }
    return data[selectedId];
  },
);
