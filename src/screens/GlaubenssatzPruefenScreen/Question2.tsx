import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio, RadioGroup, Text } from "@ui-kitten/components";
import { View } from "react-native";
import {
  actions,
  getSelectedGs,
} from "../GlaubenssaetzeScreen/glaubenssaetzeSlice";
import styles from "./questions.styles";

export default function Question2() {
  const gs = useSelector(getSelectedGs);
  const dispatch = useDispatch();

  if (gs == null) return null;

  const handleChange = (index: number) => {
    dispatch(
      actions.update({ id: gs.id, q2_isThatAbsolutelyTrue: index === 0 }),
    );
  };

  const selectedIndex: number =
    gs.q2_isThatAbsolutelyTrue === true
      ? 0 // yes
      : gs.q2_isThatAbsolutelyTrue === false
        ? 1 // no
        : -1; // undefined

  return (
    <View style={styles.root}>
      <Text category={"h5"}>
        Kannst du mit absoluter Sicherheit wissen, dass das wahr ist?
      </Text>
      <RadioGroup selectedIndex={selectedIndex} onChange={handleChange}>
        <Radio>Ja</Radio>
        <Radio>Nein</Radio>
      </RadioGroup>
    </View>
  );
}
