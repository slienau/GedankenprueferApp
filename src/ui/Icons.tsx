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

export const CloseIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="close-outline" />
);

export const MoreVerticalIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="more-vertical-outline" />
);

export const MoreHorizontalIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="more-horizontal-outline" />
);

export const NextIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="arrow-forward-outline" />
);

export const PreviousIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="arrow-back-outline" />
);
