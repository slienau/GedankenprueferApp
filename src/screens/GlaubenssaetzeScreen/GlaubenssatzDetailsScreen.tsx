import React from "react";
import AppScreenLayout from "../AppScreenLayout";
import { useDispatch, useSelector } from "react-redux";
import { Input, Radio, RadioGroup, Text } from "@ui-kitten/components";
import { ScrollView, StyleSheet, View } from "react-native";
import { getSelectedGs, actions } from "./glaubenssaetzeSlice";

export default function GlaubenssatzDetailsScreen() {
  const gs = useSelector(getSelectedGs);
  const dispatch = useDispatch();

  if (gs == null) return null;

  return (
    <AppScreenLayout title={"Glaubenssatz prüfen"} containerStyle={styles.root}>
      <ScrollView>
        <Text category={"h1"} style={styles.header}>
          {gs.title}
        </Text>

        <View style={styles.groupContainer}>
          <Text category={"h5"}>Ist das wahr?</Text>
          <RadioGroup
            selectedIndex={
              gs.isThatTrue === true ? 0 : gs.isThatTrue === false ? 1 : -1
            }
            onChange={(index: number) => {
              dispatch(actions.update({ ...gs, isThatTrue: index === 0 }));
            }}
          >
            <Radio>Ja</Radio>
            <Radio>Nein</Radio>
          </RadioGroup>
        </View>

        <View style={styles.groupContainer}>
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
                actions.update({ ...gs, isThatAbsolutelyTrue: index === 0 }),
              );
            }}
          >
            <Radio>Ja</Radio>
            <Radio>Nein</Radio>
          </RadioGroup>
        </View>

        <View style={styles.groupContainer}>
          <Text category={"h5"}>
            Wie reagierst du, was passiert, wenn du diesen Gedanken glaubst?
          </Text>
          <Text category={"s2"}>
            Welche Gefühle tauchen auf, wenn du diesen Gedanken glaubst?
          </Text>
          <Text category={"s2"}>
            Welche Bilder aus der Vergangenheit und der Zukunft siehst du, wenn
            du diesen Gedanken glaubst?
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

        <View style={styles.groupContainer}>
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
      </ScrollView>
    </AppScreenLayout>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
  },
  groupContainer: {
    paddingVertical: 20,
  },
  inputTextContainer: {
    marginTop: 20,
  },
  inputTextStyle: {
    minHeight: 150,
  },
});
