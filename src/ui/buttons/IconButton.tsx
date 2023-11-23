import React from "react";
import { Icon, IconProps } from "@ui-kitten/components";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface IconButtonProps extends TouchableOpacityProps {
  iconName: IconProps["name"];
  height?: IconProps["height"];
  width?: IconProps["width"];
  color?: IconProps["fill"];
  onPress?: TouchableOpacityProps["onPress"];
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const {
    iconName,
    color = "#000",
    width: _width,
    height: _height,
    onPress,
    ...touchableOpacityProps
  } = props;

  const width = _width ?? 32;
  const height = _height ?? 32;

  return (
    <TouchableOpacity
      style={{ width, height }}
      onPress={onPress}
      {...touchableOpacityProps}
    >
      <Icon name={iconName} fill={color} style={{ width, height }} />
    </TouchableOpacity>
  );
};

export default IconButton;
