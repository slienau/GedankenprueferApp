import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio, RadioGroup, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { actions, getSelectedGs } from "./glaubenssaetzeSlice";
import styles from "./questions.styles";

export default function Question2() {
  const gs = useSelector(getSelectedGs);
  const dispatch = useDispatch();

  if (gs == null) return null;

  return (
    <View style={styles.root}>
      <Text category={"h5"}>
        Kannst du mit absoluter Sicherheit wissen, dass das wahr ist?
      </Text>
      <RadioGroup
        selectedIndex={
          gs.isThatAbsolutelyTrue === true
            ? 0
            : gs.isThatAbsolutelyTrue === false
              ? 1
              : -1
        }
        onChange={(index: number) => {
          dispatch(
            actions.update({ id: gs.id, isThatAbsolutelyTrue: index === 0 }),
          );
        }}
      >
        <Radio>Ja</Radio>
        <Radio>Nein</Radio>
      </RadioGroup>
    </View>
  );
}
