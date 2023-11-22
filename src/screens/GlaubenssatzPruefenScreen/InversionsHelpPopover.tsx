import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Layout, Popover, Text } from "@ui-kitten/components";
import { HelpIcon } from "../../ui/Icons";

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
    <View style={styles.root}>
      <Popover
        visible={visible}
        anchor={renderToggleButton}
        placement={"bottom end"}
        onBackdropPress={togglePopover}
      >
        <Layout style={styles.content}>
          <Text appearance={"hint"}>
            Kehre deine Aussage um. Die Umkehrungen sind eine Möglichkeit, das
            Gegenteil von dem zu erfahren, was du für wahr hältst. Du kannst
            mehrere Umkehrungen finden.
          </Text>
          <Text category={"s1"} appearance={"hint"}>
            Beispiel einer Aussage:
          </Text>
          <Text appearance={"hint"}>Er hat mich verletzt.</Text>
          <Text category={"s1"} appearance={"hint"}>
            Mögliche Umkehrungen:
          </Text>
          <Text appearance={"hint"}>Ich habe mich verletzt</Text>
          <Text appearance={"hint"}>Ich habe ihn verletzt</Text>
          <Text appearance={"hint"}>Er hat mich nicht verletzt</Text>
          <Text appearance={"hint"}>Er hat mir geholfen</Text>
        </Layout>
      </Popover>
    </View>
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
