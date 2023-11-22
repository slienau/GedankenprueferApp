import React from "react";
import { View, SafeAreaView } from "react-native";
import { useTheme } from "@ui-kitten/components";
import IconButton from "../../atoms/IconButton";
import BackdropModal from "./BackdropModal";

import styles from "./HelpScreenModal.styles";

interface HelpScreenModalProps {
  isVisible: boolean;
  onClosePress: () => void;
}

const HelpScreenModal: React.FC<HelpScreenModalProps> = (props) => {
  const theme = useTheme();

  return (
    <BackdropModal isVisible={props.isVisible} style={styles.container}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.view}>
          <IconButton
            iconName={"close"}
            color={theme["color-primary-500"]}
            width={50}
            height={50}
            onPress={props.onClosePress}
          />
        </View>
        {props.children}
      </SafeAreaView>
    </BackdropModal>
  );
};

export default HelpScreenModal;
