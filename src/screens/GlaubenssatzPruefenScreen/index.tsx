import React from "react";
import AppScreenLayout from "../AppScreenLayout";
import { useSelector } from "react-redux";
import { Text } from "@ui-kitten/components";
import { ScrollView, StyleSheet } from "react-native";
import { getSelectedGs } from "../GlaubenssaetzeScreen/glaubenssaetzeSlice";
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";
import Inversions from "./Inversions";

export default function GlaubenssatzPruefenScreen() {
  const gs = useSelector(getSelectedGs);

  if (gs == null) return null;

  return (
    <AppScreenLayout title={"Glaubenssatz prüfen"}>
      <Text category={"h1"} style={styles.header}>
        {gs.title}
      </Text>
      <ScrollView style={styles.body}>
        <Question1 />

        <Question2 />

        <Question3 />

        <Question4 />

        <Inversions />
      </ScrollView>
    </AppScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    padding: 20,
    paddingBottom: 0,
  },
  body: {
    padding: 20,
  },
});
