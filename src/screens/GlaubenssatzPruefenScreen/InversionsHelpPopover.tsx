import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { HelpIcon } from "../../ui/Icons";
import InfoModal from "../../ui/modals/InfoModal";

export default function InversionsHelpPopover() {
  const [visible, setVisible] = React.useState(false);
  const togglePopover = () => {
    setVisible(!visible);
  };

  const renderToggleButton = (): React.ReactElement => (
    <Button
      onPress={togglePopover}
      accessoryLeft={HelpIcon}
      status={"info"}
      appearance={"ghost"}
    />
  );

  return (
    <>
      <Button
        onPress={togglePopover}
        accessoryLeft={HelpIcon}
        status={"info"}
        appearance={"ghost"}
      />
      <InfoModal isVisible={visible} onClosePress={togglePopover}>
        <Text category={"p1"} style={{ marginBottom: 15 }}>
          Kehre deine Aussage um. Die Umkehrungen sind eine Möglichkeit, das
          Gegenteil von dem zu erfahren, was du für wahr hältst. Es gibt drei
          verschiedene Arten von Umkehrungen.
        </Text>

        <View style={{ paddingVertical: 10 }}>
          <Text category={"s1"}>Beispiel einer Aussage:</Text>
          <Text>Er hat mich verletzt.</Text>
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Text category={"s1"}>1. Kehre den Satz ins Gegenteil um.</Text>
          <Text>
            Das ist möglich durch eine Verneinung des ursprünglichen Gedankens.
          </Text>
          <Text
            style={{
              textDecorationLine: "underline",
              marginTop: 5,
            }}
          >
            Mögliche Umkehrungen:
          </Text>
          <Text>Er hat mich nicht verletzt</Text>
          <Text>Er hat mir geholfen</Text>
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Text category={"s1"}>2. Kehre den Satz um zur anderen Person.</Text>
          <Text>Vertausche die handelnden Personen im Satz.</Text>
          <Text
            style={{
              textDecorationLine: "underline",
              marginTop: 5,
            }}
          >
            Mögliche Umkehrung:
          </Text>
          <Text>
            <Text style={{ fontStyle: "italic" }}>Ich</Text> habe{" "}
            <Text style={{ fontStyle: "italic" }}>ihn</Text> verletzt
          </Text>
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Text category={"s1"}>3. Kehre den Satz um zu dir selbst.</Text>
          <Text>
            In welcher Hinsicht hast du dich selbst so behandelt in der
            Situation?
          </Text>
          <Text
            style={{
              textDecorationLine: "underline",
              marginTop: 5,
            }}
          >
            Mögliche Umkehrung:
          </Text>
          <Text>
            <Text style={{ fontStyle: "italic" }}>Ich</Text> habe{" "}
            <Text style={{ fontStyle: "italic" }}>mich</Text> verletzt
          </Text>
        </View>
      </InfoModal>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    maxWidth: "80%",
    margin: 10,
  },
});
