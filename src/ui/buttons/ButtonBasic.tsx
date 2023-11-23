import React from "react";
import { Button, Text } from "@ui-kitten/components";
import styles from "./styles";
import { ButtonProps } from "./ButtonProps";

export const ButtonBasic: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      onPress={props.onPress}
      style={[
        styles.button,
        styles.buttonBasic,
        props.wide && styles.wide,
        props.disabled && styles.disabled,
        props.style,
      ]}
      appearance="outline"
      status="basic"
      disabled={props.disabled}
      {...props.buttonProps}
    >
      {(evaProps) => (
        <Text
          {...evaProps}
          style={props.disabled ? styles.textDisabled : styles.textDark}
        >
          {props.label}
        </Text>
      )}
    </Button>
  );
};

export default ButtonBasic;
