import React from "react";
import { View } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import {
  ButtonBasic,
  ButtonDanger,
  ButtonPrimary,
  ButtonProps,
} from "../buttons";
import BackdropModal from "./BackdropModal";

import styles from "./AlertModal.styles";

interface AlertModalButton extends ButtonProps {
  type?: "primary" | "danger" | "basic";
}

export interface AlertModalProps {
  title: string;
  text?: string;
  isVisible: boolean;
  buttons?: Array<AlertModalButton>;
  children?: React.ReactNode;
}

const AlertModal: React.FC<AlertModalProps> = (props) => {
  const { buttons } = props;

  return (
    <BackdropModal isVisible={props.isVisible} style={styles.container}>
      <Card disabled={true}>
        {props.title && (
          <View style={styles.titleContainer}>
            <Text category={"h6"}>{props.title}</Text>
          </View>
        )}

        <View style={styles.bodyContainer}>
          <View style={styles.textContainer}>
            {props.text && <Text style={styles.text}>{props.text}</Text>}
            {props.children}
          </View>
        </View>

        {buttons && buttons?.length > 0 && (
          <View
            style={[
              styles.buttonContainer,
              buttons.length === 1 && { justifyContent: "center" },
            ]}
          >
            {buttons?.map((button, i) => {
              const { type, ...buttonProps } = button;
              let ButtonComponent = ButtonPrimary;
              if (type === "danger") ButtonComponent = ButtonDanger;
              if (type === "basic") ButtonComponent = ButtonBasic;
              return (
                <ButtonComponent
                  key={`modal-button-${i}`}
                  style={{ flex: 1, marginLeft: i > 0 ? 20 : 0 }}
                  {...buttonProps}
                />
              );
            })}
          </View>
        )}
      </Card>
    </BackdropModal>
  );
};

export default AlertModal;
