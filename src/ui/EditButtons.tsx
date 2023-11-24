import React from "react";
import { Button, ButtonGroup } from "@ui-kitten/components";
import { CloseIcon, DeleteIcon, EditIcon, MoreVerticalIcon } from "./Icons";

export type EditButtonsProps = {
  onDelete?: () => void;
  onEdit?: () => void;
};

const EditButtons: React.FC<EditButtonsProps> = (props) => {
  const { onEdit = null, onDelete = null } = props;
  const [isButtonGroupVisible, setIsButtonGroupVisible] = React.useState(false);

  const toggleButtonGroupVisible = () => {
    setIsButtonGroupVisible(!isButtonGroupVisible);
  };

  const handleEdit = () => {
    onEdit && onEdit();
    toggleButtonGroupVisible();
  };

  const handleDelete = () => {
    onDelete && onDelete();
    toggleButtonGroupVisible();
  };

  const renderButtons = () => {
    if (onEdit == null && onDelete == null) return null;
    if (onEdit != null && onDelete != null) {
      return (
        <ButtonGroup appearance={"outline"} size={"small"}>
          <Button onPress={handleEdit} accessoryLeft={EditIcon} />
          <Button onPress={handleDelete} accessoryLeft={DeleteIcon} />
        </ButtonGroup>
      );
    }
    if (onEdit != null) {
      return (
        <Button onPress={handleEdit} accessoryLeft={EditIcon} size={"small"} />
      );
    }
    if (onDelete != null) {
      return (
        <Button
          onPress={handleDelete}
          accessoryLeft={DeleteIcon}
          size={"small"}
        />
      );
    }
  };

  return (
    <>
      {!isButtonGroupVisible && (
        <Button
          onPress={toggleButtonGroupVisible}
          accessoryLeft={MoreVerticalIcon}
          size={"small"}
          appearance={"ghost"}
        />
      )}
      {isButtonGroupVisible && (
        <ButtonGroup appearance={"outline"} size={"small"}>
          {renderButtons()}
          <Button
            onPress={toggleButtonGroupVisible}
            accessoryLeft={CloseIcon}
          />
        </ButtonGroup>
      )}
    </>
  );
};

export default EditButtons;
