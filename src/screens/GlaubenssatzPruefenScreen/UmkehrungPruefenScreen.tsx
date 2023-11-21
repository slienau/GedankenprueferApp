import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import AppScreenLayout from "../AppScreenLayout";
import { UmkehrungPruefenScreenRouteProp } from "../../AppNavigator";

export type UmkehrungPruefenScreenParams = {
  inversion: string;
  examples: Array<string>;
  onAddExample: (example: string) => void;
};

type UmkehrungPruefenScreenProps = {
  route: UmkehrungPruefenScreenRouteProp & {
    params: UmkehrungPruefenScreenParams;
  };
  navigation: any;
};

const UmkehrungPruefenScreen: React.FC<UmkehrungPruefenScreenProps> =
  function ({ route }) {
    const { inversion, examples, onAddExample } = route.params;
    return (
      <AppScreenLayout title={"Umkehrung prüfen"}>
        <View style={styles.root}>
          <Text category={"h1"}>{inversion}</Text>
          {/*    W*/}
        </View>
      </AppScreenLayout>
    );
  };

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
});

export default UmkehrungPruefenScreen;
