import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Divider, Layout, Text, TopNavigation } from "@ui-kitten/components";

import universelleGS from "../resources/universelle-glaubenssaetze";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <TopNavigation title={"Home"} alignment={"center"} />
      <ScrollView>
        <Divider />
        <Layout style={styles.body}>
          <Text>Gedankenprüfer App Home Screen</Text>
          {universelleGS.map((gs) => (
            <Text key={gs}>{gs}</Text>
          ))}
          <StatusBar style="auto" />
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
