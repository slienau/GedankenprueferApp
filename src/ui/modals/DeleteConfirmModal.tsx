import React from "react";
import AlertModal, { AlertModalProps } from "./AlertModal";

interface DeleteConfirmModalProps {
  title: string;
  text?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isVisible: boolean;
  children?: React.ReactNode;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = (props) => {
  const buttons: AlertModalProps["buttons"] = [
    { type: "basic", onPress: props.onCancel, label: "Abbrechen" },
    { type: "danger", onPress: props.onConfirm, label: "Löschen" },
  ];

  return (
    <AlertModal
      title={props.title}
      text={props.text}
      isVisible={props.isVisible}
      buttons={buttons}
    >
      {props.children}
    </AlertModal>
  );
};

export default DeleteConfirmModal;
