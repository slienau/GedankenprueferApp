import React from "react";
import { Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import Divider from "./Divider";

type ScreenHeaderProps = {
  title: string;
};

const ScreenHeader: React.FC<ScreenHeaderProps> = function ({ title }) {
  return (
    <>
      <Text category={"h1"} style={styles.header}>
        {title}
      </Text>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    padding: 20,
    paddingBottom: 0,
  },
});

export default ScreenHeader;
