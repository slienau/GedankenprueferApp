import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Card, List, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function GlaubenssatzListe() {
  const glaubenssaetze = useSelector(
    (state: RootState) => state.glaubenssaetze.entities,
  );
  const navigation = useNavigation();

  const handleCardPress = useCallback(() => {
    navigation.navigate("Glaubenssatz");
  }, []);

  return (
    <List
      data={glaubenssaetze}
      renderItem={({ item }) => (
        <Card style={styles.card} onPress={handleCardPress}>
          <Text>{item.title}</Text>
        </Card>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
  },
});
