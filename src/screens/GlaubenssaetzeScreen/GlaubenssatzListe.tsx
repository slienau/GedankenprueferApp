import React from "react";
import { StyleSheet } from "react-native";
import { Card, List, Text } from "@ui-kitten/components";

import universelleGS from "../../resources/universelle-glaubenssaetze";

type GlaubenssatzDataType = {
  title: string;
};

const data: Array<GlaubenssatzDataType> = universelleGS.map((gs) => {
  return {
    title: gs,
  };
});

const renderItem = ({
  item,
  index,
}: {
  item: GlaubenssatzDataType;
  index: number;
}): React.ReactElement => (
  <Card style={styles.card}>
    <Text>{item.title}</Text>
  </Card>
);

export default function GlaubenssatzListe() {
  return (
    <List
      data={data}
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
