import React from "react";
import { View } from "react-native";
import { Icon, Text } from "@ui-kitten/components";
import BackdropModal from "./BackdropModal";

import styles from "./SuccessModal.styles";

interface SuccessModalProps {
  isVisible: boolean;
  text?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = (props) => {
  const { text = "Success" } = props;
  return (
    <BackdropModal isVisible={props.isVisible}>
      <View style={styles.container}>
        <Icon name={"checkmark"} fill={"#fff"} style={styles.icon} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </BackdropModal>
  );
};

export default SuccessModal;
