import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { glaubenssaetzeReducer } from "../screens/GlaubenssaetzeScreen/glaubenssaetzeSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage, // or your chosen storage engine
};

const rootReducer = combineReducers({
  glaubenssaetze: glaubenssaetzeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
