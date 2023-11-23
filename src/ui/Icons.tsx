import React from "react";
import { Icon, IconElement, IconProps } from "@ui-kitten/components";

export const PlusIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="plus-circle-outline" />
);

export const DeleteIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="trash-2-outline" />
);

export const HelpIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="question-mark-circle-outline" />
);

export const EditIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="edit-outline" />
);
