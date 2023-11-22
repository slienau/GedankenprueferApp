import React from "react";
import AppScreenLayout from "../AppScreenLayout";
import GlaubenssatzListe from "./GlaubenssatzListe";
import FloatingActionButton from "../../ui/FloatingActionButton";
import { useDispatch } from "react-redux";
import { actions } from "./glaubenssaetzeSlice";
import TextInputModal from "../../ui/modals/TextInputModal";


export default function GlaubenssaetzeScreen() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAddGs = (neuerGs: string) => {
    dispatch(actions.addGs(neuerGs));
    toggleModal();
  };

  return (
    <AppScreenLayout title={"Glaubenssätze"}>
      <GlaubenssatzListe />
      <FloatingActionButton onPress={() => setModalVisible(true)} />
      <TextInputModal
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
        onCancel={toggleModal}
        onConfirm={handleAddGs}
        title={"Neuer Glaubenssatz"}
        placeholder={"Ich kann gar nichts"}
      />

    </AppScreenLayout>
  );
}
