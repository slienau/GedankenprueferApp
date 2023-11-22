import React from "react";
import AppScreenLayout from "../AppScreenLayout";
import { useSelector } from "react-redux";
import { Button, Text } from "@ui-kitten/components";
import { ScrollView, StyleSheet, View } from "react-native";
import { getSelectedGs } from "./glaubenssaetzeSlice";
import { useNavigation } from "@react-navigation/native";

export default function GlaubenssatzDetailsScreen() {
  const gs = useSelector(getSelectedGs);
  const navigation = useNavigation();

  if (gs == null) return null;

  return (
    <AppScreenLayout title={"Glaubenssatz"}>
      <Text category={"h1"} style={styles.header}>
        {gs.title}
      </Text>
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
  header: {
    textAlign: "center",
    padding: 20,
    paddingBottom: 0,
  },
  body: {
    padding: 20,
  },
});
