import React from "react";
import AppScreenLayout from "../AppScreenLayout";
import { useSelector } from "react-redux";
import { Input, Radio, RadioGroup, Text } from "@ui-kitten/components";
import { ScrollView, StyleSheet, View } from "react-native";
import { getSelectedGs } from "./glaubenssaetzeSlice";

export default function GlaubenssatzDetailsScreen() {
  const gs = useSelector(getSelectedGs);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  return (
    <AppScreenLayout title={"Glaubenssatz prüfen"} containerStyle={styles.root}>
      <ScrollView>
        <Text category={"h1"} style={styles.header}>
          {gs?.title ?? ""}
        </Text>

        <View style={styles.groupContainer}>
          <Text category={"h5"}>Ist das wahr?</Text>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={(index) => setSelectedIndex(index)}
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
            selectedIndex={selectedIndex}
            onChange={(index) => setSelectedIndex(index)}
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
          />
        </View>

        <View style={styles.groupContainer}>
          <Text category={"h5"}>Wer wärst du ohne den Gedanken?</Text>
          <Text category={"s2"}>Wer oder was bist du ohne den Gedanken?</Text>
          <Input
            multiline={true}
            textStyle={styles.inputTextStyle}
            style={styles.inputTextContainer}
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
