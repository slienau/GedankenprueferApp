import React from "react";
import AppScreenLayout from "../AppScreenLayout";
import { useSelector } from "react-redux";
import { Button } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { getSelectedGs } from "./glaubenssaetzeSlice";
import { useNavigation } from "@react-navigation/native";
import ScreenHeader from "../../ui/ScreenHeader";

export default function GlaubenssatzDetailsScreen() {
  const gs = useSelector(getSelectedGs);
  const navigation = useNavigation();

  if (gs == null) return null;

  return (
    <AppScreenLayout title={"Glaubenssatz"}>
      <ScreenHeader title={gs.title} />
      <View style={styles.body}>
        <Button
          onPress={() => {
            // @ts-ignore
            navigation.navigate("Glaubenssatz prüfen");
          }}
        >
          Glaubenssatz prüfen
        </Button>
      </View>
    </AppScreenLayout>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
  },
});
