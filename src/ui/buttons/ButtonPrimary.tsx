import React from "react";
import { Button, Text } from "@ui-kitten/components";
import styles from "./styles";
import { ButtonProps } from "./ButtonProps";

export const ButtonPrimary: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      onPress={props.onPress}
      style={[
        styles.button,
        props.wide && styles.wide,
        props.disabled && styles.disabled,
        props.style
      ]}
      disabled={props.disabled}
      // @ts-ignore
      {...props.buttonProps}
    >
      {(evaProps) => (
        <Text
          // @ts-ignore
          {...evaProps}
          style={
            props.disabled || props.buttonProps?.disabled
              ? styles.textDisabled
              : styles.textDark
          }
        >
          {props.label}
        </Text>
      )}
    </Button>
  );
};

export default ButtonPrimary;
