import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { actions, getSelectedGs } from "../../store/glaubenssaetzeSlice";
import styles from "./questions.styles";

export default function Question4() {
  const gs = useSelector(getSelectedGs);
  const dispatch = useDispatch();

  const handleChangeText = React.useCallback(
    (text: string) => {
      if (!gs) return;
      dispatch(
        actions.update({
          id: gs.id,
          q4_whoWouldYouBeWithoutTheThought: text,
        }),
      );
    },
    [gs],
  );

  return (
    <View style={styles.root}>
      <Text category={"h5"} style={styles.questionHeader}>
        Wer wärst du ohne den Gedanken?
      </Text>
      <Text appearance={"hint"}>Wer oder was bist du ohne den Gedanken?</Text>
      <Input
        multiline={true}
        textStyle={styles.inputTextStyle}
        style={styles.inputTextContainer}
        value={gs?.q4_whoWouldYouBeWithoutTheThought}
        onChangeText={handleChangeText}
      />
    </View>
  );
}
