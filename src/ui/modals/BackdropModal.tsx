import React from "react";
import { Modal, ModalProps } from "@ui-kitten/components";

import styles from "./BackdropModal.styles";

export interface BackdropModalProps extends Omit<ModalProps, "visible"> {
  isVisible: boolean;
}

const BackdropModal: React.FC<BackdropModalProps> = (props) => {
  const { isVisible, ...modalProps } = props;
  return (
    <Modal {...modalProps} visible={isVisible} backdropStyle={styles.backdrop}>
      {props.children}
    </Modal>
  );
};

export default BackdropModal;
