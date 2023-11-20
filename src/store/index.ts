import { configureStore } from "@reduxjs/toolkit";
import { glaubenssaetzeReducer } from "../screens/GlaubenssaetzeScreen/glaubenssaetzeSlice";

export const store = configureStore({
  reducer: {
    glaubenssaetze: glaubenssaetzeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
