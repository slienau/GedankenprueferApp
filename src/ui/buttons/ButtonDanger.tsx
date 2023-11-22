import React from "react";
import { Button, Text } from "@ui-kitten/components";
import styles from "./styles";
import { ButtonProps } from "./ButtonProps";

export const ButtonDanger: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      onPress={props.onPress}
      style={[
        styles.button,
        props.wide && styles.wide,
        props.disabled && styles.disabled,
        props.style
      ]}
      status="danger"
      disabled={props.disabled}
      {...props.buttonProps}
    >
      {(evaProps) => (
        <Text
          {...evaProps}
          style={props.disabled ? styles.textDisabled : styles.textWhite}
        >
          {props.label}
        </Text>
      )}
    </Button>
  );
};

export default ButtonDanger;
