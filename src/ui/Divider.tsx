import React from "react";
import { Divider as UIKittenDivider } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const Divider: React.FC = function () {
  return <UIKittenDivider style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    marginVertical: 20,
  },
});

export default Divider;
