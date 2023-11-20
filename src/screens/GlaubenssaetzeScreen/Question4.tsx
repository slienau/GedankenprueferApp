import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { actions, getSelectedGs } from "./glaubenssaetzeSlice";
import styles from "./questions.styles";

export default function Question4() {
  const gs = useSelector(getSelectedGs);
  const dispatch = useDispatch();

  if (gs == null) return null;

  return (
    <View style={styles.root}>
      <Text category={"h5"}>Wer wärst du ohne den Gedanken?</Text>
      <Text category={"s2"}>Wer oder was bist du ohne den Gedanken?</Text>
      <Input
        multiline={true}
        textStyle={styles.inputTextStyle}
        style={styles.inputTextContainer}
        value={gs.whoWouldYouBeWithoutTheThought}
        onChangeText={(text) =>
          dispatch(
            actions.update({
              id: gs.id,
              whoWouldYouBeWithoutTheThought: text,
            }),
          )
        }
      />
    </View>
  );
}
