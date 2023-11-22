import React from "react";
import { View } from "react-native";
import { Icon, Text } from "@ui-kitten/components";
import BackdropModal, { BackdropModalProps } from "./BackdropModal";

import styles from "./FailureModal.styles";

interface FailureModalProps {
  isVisible: boolean;
  text?: string;
  onBackdropPress?: BackdropModalProps["onBackdropPress"];
}

const FailureModal: React.FC<FailureModalProps> = (props) => {
  const { text = "Something went wrong" } = props;
  return (
    <BackdropModal
      isVisible={props.isVisible}
      onBackdropPress={props.onBackdropPress}
    >
      <View style={styles.container}>
        <Icon name={"close"} fill={"#fff"} style={styles.icon} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </BackdropModal>
  );
};

export default FailureModal;
