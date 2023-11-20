import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio, RadioGroup, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { actions, getSelectedGs } from "./glaubenssaetzeSlice";
import styles from "./questions.styles";

export default function Question1() {
  const gs = useSelector(getSelectedGs);
  const dispatch = useDispatch();

  if (gs == null) return null;

  return (
    <View style={styles.root}>
      <Text category={"h5"}>Ist das wahr?</Text>
      <RadioGroup
        selectedIndex={
          gs.isThatTrue === true ? 0 : gs.isThatTrue === false ? 1 : -1
        }
        onChange={(index: number) => {
          dispatch(actions.update({ id: gs.id, isThatTrue: index === 0 }));
        }}
      >
        <Radio>Ja</Radio>
        <Radio>Nein</Radio>
      </RadioGroup>
    </View>
  );
}
