import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Card, List, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { actions } from "./glaubenssaetzeSlice";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function GlaubenssatzListe() {
  const glaubenssaetze = useSelector(
    (state: RootState) => state.glaubenssaetze.entities,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleCardPress = useCallback((id: string) => {
    dispatch(actions.selectGs({ id }));
    // @ts-ignore
    navigation.navigate("Glaubenssatz Details");
  }, []);

  return (
    <List
      data={Object.values(glaubenssaetze)}
      renderItem={({ item }) => (
        <Card style={styles.card} onPress={() => handleCardPress(item.id)}>
          <Text category={"h4"}>{item.title}</Text>
        </Card>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
  },
});
