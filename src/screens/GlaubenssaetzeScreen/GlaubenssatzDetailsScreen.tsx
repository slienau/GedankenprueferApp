import React from "react";
import AppScreenLayout from "../AppScreenLayout";
import { useSelector } from "react-redux";
import { Button, Text } from "@ui-kitten/components";
import { ScrollView, StyleSheet } from "react-native";
import { getSelectedGs } from "./glaubenssaetzeSlice";
import { useNavigation } from "@react-navigation/native";

export default function GlaubenssatzDetailsScreen() {
  const gs = useSelector(getSelectedGs);
  const navigation = useNavigation();

  if (gs == null) return null;

  return (
    <AppScreenLayout title={"Glaubenssatz"}>
      <ScrollView style={styles.root}>
        <Text category={"h1"} style={styles.header}>
          {gs.title}
        </Text>

        <Button
          onPress={() => {
            // @ts-ignore
            navigation.navigate("Glaubenssatz prüfen");
          }}
        >
          Glaubenssatz prüfen
        </Button>
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
