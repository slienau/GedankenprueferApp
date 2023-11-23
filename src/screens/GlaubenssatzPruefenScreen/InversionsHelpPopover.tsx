import React from "react";
import { StyleSheet } from "react-native";
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
          Gegenteil von dem zu erfahren, was du für wahr hältst. Du kannst
          mehrere Umkehrungen finden.
        </Text>
        <Text category={"s1"}>Beispiel einer Aussage:</Text>
        <Text>Er hat mich verletzt.</Text>
        <Text category={"s1"} style={{ marginTop: 15 }}>
          Mögliche Umkehrungen:
        </Text>
        <Text>Ich habe mich verletzt</Text>
        <Text>Ich habe ihn verletzt</Text>
        <Text>Er hat mich nicht verletzt</Text>
        <Text>Er hat mir geholfen</Text>
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
