import { ButtonProps as UIKittenButtonProps } from "@ui-kitten/components";

export interface ButtonProps {
  onPress: () => void;
  label: string;
  style?: UIKittenButtonProps["style"];
  disabled?: UIKittenButtonProps["disabled"];
  buttonProps?: UIKittenButtonProps;
  wide?: boolean;
}
