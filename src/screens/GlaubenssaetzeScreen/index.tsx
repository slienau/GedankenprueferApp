import { SafeAreaView, StyleSheet } from "react-native";
import { TopNavigation } from "@ui-kitten/components";

import GlaubenssatzListe from "./GlaubenssatzListe";

export default function GlaubenssaetzeScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <TopNavigation title={"Glaubenssätze"} alignment={"center"} />
      <GlaubenssatzListe />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
  },
});
