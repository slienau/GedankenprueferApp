import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Input, Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getSelectedGs,
} from "../GlaubenssaetzeScreen/glaubenssaetzeSlice";

export default function Inversions() {
  const gs = useSelector(getSelectedGs);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState("");

  if (gs == null) return null;

  const addInversion = () => {
    if (inputValue !== "") {
      dispatch(actions.addInversion({ id: gs.id, inversion: inputValue }));
      setInputValue("");
    }
  };

  return (
    <View style={styles.root}>
      <Text category={"h5"}>Umkehrungen</Text>
      {Object.keys(gs?.inversions ?? []).map((inversion) => (
        <Card key={inversion}>
          <Text category={"h6"}>{inversion}</Text>
          <Button
            onPress={() => {
              dispatch(actions.removeInversion({ gsId: gs.id, inversion }));
            }}
          >
            entfernen
          </Button>
        </Card>
      ))}
      <Input
        value={inputValue}
        onChangeText={setInputValue}
        placeholder={"Umkehrung eingeben"}
      ></Input>
      <Button onPress={addInversion}>Neue Umkehrung hinzufügen</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
});
