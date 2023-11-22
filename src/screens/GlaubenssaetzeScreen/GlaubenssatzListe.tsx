import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Card, List, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { GlaubenssatzDataItem, actions } from "./glaubenssaetzeSlice";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

type ListItemProps = {
  item: GlaubenssatzDataItem;
  onPress: () => void;
};

const ListItem = React.memo(({ item, onPress }: ListItemProps) => (
  <Card style={styles.card} onPress={onPress}>
    <Text category={"h4"}>{item.title}</Text>
  </Card>
));

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
        <ListItem item={item} onPress={() => handleCardPress(item.id)} />
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
