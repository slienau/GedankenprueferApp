import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import AppNavigator from "./AppNavigator";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { StatusBar } from "expo-status-bar";
import { initDb } from "./services/db";

// initDb();

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigator />
        <StatusBar style="auto" />
      </ApplicationProvider>
    </PersistGate>
  </Provider>
);
