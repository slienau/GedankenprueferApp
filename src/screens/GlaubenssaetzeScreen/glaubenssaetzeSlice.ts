import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as Crypto from "expo-crypto";

import universelleGS from "../../resources/universelle-glaubenssaetze";

export type GlaubenssatzDataItem = {
  id: string;
  title: string;
};

export interface GlaubenssaetzeState {
  entities: Array<GlaubenssatzDataItem>;
}

const initialState: GlaubenssaetzeState = {
  entities: universelleGS.map((gs) => {
    return {
      id: Crypto.randomUUID(),
      title: gs,
    };
  }),
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
      state.entities.push({
        id: Crypto.randomUUID(),
        title: action.payload,
      });
    },
    remove: (state, action: PayloadAction<string>) => {
      state.entities = state.entities.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove } = glaubenssaetzeSlice.actions;

export const glaubenssaetzeReducer = glaubenssaetzeSlice.reducer;
