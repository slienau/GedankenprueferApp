import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { actions, getSelectedGs } from "./glaubenssaetzeSlice";
import styles from "./questions.styles";

export default function Question3() {
  const gs = useSelector(getSelectedGs);
  const dispatch = useDispatch();

  if (gs == null) return null;

  return (
    <View style={styles.root}>
      <Text category={"h5"}>
        Wie reagierst du, was passiert, wenn du diesen Gedanken glaubst?
      </Text>
      <Text category={"s2"}>
        Welche Gefühle tauchen auf, wenn du diesen Gedanken glaubst?
      </Text>
      <Text category={"s2"}>
        Welche Bilder aus der Vergangenheit und der Zukunft siehst du, wenn du
        diesen Gedanken glaubst?
      </Text>
      <Text category={"s2"}>
        Wie behandelst du dich und andere Menschen, wenn du diesen Gedanken
        glaubst?
      </Text>
      <Input
        multiline={true}
        textStyle={styles.inputTextStyle}
        style={styles.inputTextContainer}
        value={gs.whatHappensIfYouBelieveTheThought}
        onChangeText={(text) =>
          dispatch(
            actions.update({
              id: gs.id,
              whatHappensIfYouBelieveTheThought: text,
            }),
          )
        }
      />
    </View>
  );
}
