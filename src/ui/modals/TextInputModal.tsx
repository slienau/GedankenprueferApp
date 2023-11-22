import React from "react";
import { View } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components";
import BackdropModal, { BackdropModalProps } from "./BackdropModal";

import styles from "./TextInputModal.styles";

export interface TextInputModalProps {
  isVisible: boolean;
  title?: string;
  placeholder?: string;
  onCancel: () => void;
  onConfirm: (text: string) => void;
  onBackdropPress?: BackdropModalProps["onBackdropPress"];
}

const TextInputModal: React.FC<TextInputModalProps> = (props) => {
  const [text, setText] = React.useState<string>("");

  const handleConfirm = () => {
    props.onConfirm(text);
    setText("");
  };

  return (
    <BackdropModal isVisible={props.isVisible} style={styles.container} onBackdropPress={props.onBackdropPress}>
      <View style={styles.container}>
        {props.title && <Text category={"h6"} style={styles.title}>{props.title}</Text>}
        <Input style={styles.input} placeholder={props.placeholder} onChangeText={setText} value={text} />
        <View
          style={styles.buttonContainer}
        >
          <Button onPress={props.onCancel} status={"basic"}>Abbrechen</Button>
          <Button onPress={handleConfirm}>Speichern</Button>
        </View>
      </View>
    </BackdropModal>
  );
};

export default TextInputModal;
