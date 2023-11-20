import React from "react";
import AppScreenLayout from "../AppScreenLayout";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "@ui-kitten/components";
import { ScrollView, StyleSheet } from "react-native";
import { getSelectedGs } from "./glaubenssaetzeSlice";
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";

export default function GlaubenssatzDetailsScreen() {
  const gs = useSelector(getSelectedGs);

  if (gs == null) return null;

  return (
    <AppScreenLayout title={"Glaubenssatz prüfen"} containerStyle={styles.root}>
      <ScrollView>
        <Text category={"h1"} style={styles.header}>
          {gs.title}
        </Text>

        <Question1 />

        <Question2 />

        <Question3 />

        <Question4 />
      </ScrollView>
    </AppScreenLayout>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
  },
});
