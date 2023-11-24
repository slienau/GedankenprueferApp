import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { actions, getSelectedGs } from "../../store/glaubenssaetzeSlice";
import styles from "./questions.styles";

export default function Question3() {
  const gs = useSelector(getSelectedGs);
  const dispatch = useDispatch();

  const handleChangeText = React.useCallback(
    (text: string) => {
      if (!gs) return;
      dispatch(
        actions.update({
          id: gs.id,
          q3_whatHappensIfYouBelieveTheThought: text,
        }),
      );
    },
    [gs],
  );

  return (
    <View style={styles.root}>
      <Text category={"h5"} style={styles.questionHeader}>
        Wie reagierst du, was passiert, wenn du diesen Gedanken glaubst?
      </Text>
      <Text appearance={"hint"}>
        Welche Gefühle tauchen auf, wenn du diesen Gedanken glaubst?
      </Text>
      <Text appearance={"hint"}>
        Welche Bilder aus der Vergangenheit und der Zukunft siehst du, wenn du
        diesen Gedanken glaubst?
      </Text>
      <Text appearance={"hint"}>
        Wie behandelst du dich und andere Menschen, wenn du diesen Gedanken
        glaubst?
      </Text>
      <Input
        multiline={true}
        textStyle={styles.inputTextStyle}
        style={styles.inputTextContainer}
        value={gs?.q3_whatHappensIfYouBelieveTheThought}
        onChangeText={handleChangeText}
      />
    </View>
  );
}
