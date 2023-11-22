import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio, RadioGroup, Text } from "@ui-kitten/components";
import { View } from "react-native";
import {
  actions,
  getSelectedGs,
} from "../GlaubenssaetzeScreen/glaubenssaetzeSlice";
import styles from "./questions.styles";

export default function Question1() {
  const gs = useSelector(getSelectedGs);
  const dispatch = useDispatch();

  if (gs == null) return null;

  const selectedIndex =
    gs.q1_isThatTrue === true ? 0 : gs.q1_isThatTrue === false ? 1 : -1;

  const handleChange = (index: number) => {
    dispatch(actions.update({ id: gs.id, q1_isThatTrue: index === 0 }));
  };

  return (
    <View style={styles.root}>
      <Text category={"h5"} style={styles.questionHeader}>
        Ist das wahr?
      </Text>
      <RadioGroup selectedIndex={selectedIndex} onChange={handleChange}>
        <Radio>Ja</Radio>
        <Radio>Nein</Radio>
      </RadioGroup>
    </View>
  );
}
