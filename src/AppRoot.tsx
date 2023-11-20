import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import AppNavigator from "./AppNavigator";
import { Provider } from "react-redux";
import { store } from "./store";

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </ApplicationProvider>
);
