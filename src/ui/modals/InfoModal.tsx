import React from "react";
import { View, SafeAreaView } from "react-native";
import IconButton from "../buttons/IconButton";
import BackdropModal from "./BackdropModal";

import styles from "./InfoModal.styles";

interface HelpScreenModalProps {
  isVisible: boolean;
  onClosePress: () => void;
  children: React.ReactNode;
}

const InfoModal: React.FC<HelpScreenModalProps> = (props) => {
  return (
    <BackdropModal
      isVisible={props.isVisible}
      style={styles.container}
      onBackdropPress={props.onClosePress}
    >
      <SafeAreaView style={styles.flex}>
        <View style={styles.view}>
          <IconButton
            iconName={"close"}
            width={40}
            height={40}
            onPress={props.onClosePress}
            style={{ position: "absolute", top: 0, right: 0 }}
          />
          <View style={styles.body}>{props.children}</View>
        </View>
      </SafeAreaView>
    </BackdropModal>
  );
};

export default InfoModal;
