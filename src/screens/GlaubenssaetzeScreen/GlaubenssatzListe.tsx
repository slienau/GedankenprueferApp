import React from "react";
import { StyleSheet } from "react-native";
import { Card, List, Text } from "@ui-kitten/components";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GlaubenssatzDataItem } from "./glaubenssaetzeSlice";

const renderItem = ({
  item,
  index,
}: {
  item: GlaubenssatzDataItem;
  index: number;
}): React.ReactElement => (
  <Card style={styles.card}>
    <Text>{item.title}</Text>
  </Card>
);

export default function GlaubenssatzListe() {
  const glaubenssaetze = useSelector(
    (state: RootState) => state.glaubenssaetze.entities,
  );
  return (
    <List
      data={glaubenssaetze}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
  },
});
