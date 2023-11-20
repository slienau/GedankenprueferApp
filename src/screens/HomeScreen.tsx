import { ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Layout, Text } from "@ui-kitten/components";

import universelleGS from "../resources/universelle-glaubenssaetze";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <Layout style={styles.container}>
        <Text>Gedankenprüfer App Home Screen</Text>
        {universelleGS.map((gs) => (
          <Text key={gs}>{gs}</Text>
        ))}
        <StatusBar style="auto" />
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
