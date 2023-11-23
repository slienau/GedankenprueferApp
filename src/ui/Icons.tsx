import React from "react";
import { ImageStyle } from "react-native";
import { Icon, IconElement, IconProps } from "@ui-kitten/components";

export const PlusIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="plus-circle-outline" />
);

export const DeleteIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="trash-2-outline" />
);

export const HelpIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="question-mark-circle-outline" />
);
