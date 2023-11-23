import React from "react";
import { StyleSheet } from "react-native";
import { Button, ButtonProps } from "@ui-kitten/components";
import { PlusIcon } from "./Icons";

type FloatingActionButtonProps = {
  onPress: ButtonProps["onPress"];
  accessoryLeft?: ButtonProps["accessoryLeft"];
};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = (props) => (
  <Button
    style={styles.fab}
    onPress={props.onPress}
    accessoryLeft={props.accessoryLeft ?? PlusIcon}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    borderRadius: 30,
    elevation: 8,
  },
});

export default FloatingActionButton;
