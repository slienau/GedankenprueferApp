import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "@ui-kitten/components";
import BackdropModal from "./BackdropModal";

import styles from "./LoadingModal.styles";

interface LoadingModalProps {
  isLoading: boolean;
  text?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = (props) => {
  const { text = "Loading ..." } = props;
  return (
    <BackdropModal isVisible={props.isLoading}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#F2F2F2" />
        <Text style={styles.text}>{text}</Text>
      </View>
    </BackdropModal>
  );
};

export default LoadingModal;
