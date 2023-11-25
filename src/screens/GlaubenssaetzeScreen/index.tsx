import React from "react";
import AppScreenLayout from "../AppScreenLayout";
import GlaubenssatzListe from "./GlaubenssatzListe";
import FloatingActionButton from "../../ui/FloatingActionButton";
import { useDispatch } from "react-redux";
import { actions } from "../../store/glaubenssaetzeSlice";
import TextInputModal from "../../ui/modals/TextInputModal";
import { useNavigation } from "@react-navigation/native";

export default function GlaubenssaetzeScreen() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const gsListeRef = React.useRef<any>(null);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAddGs = (neuerGs: string) => {
    dispatch(actions.addGs(neuerGs));
    toggleModal();
    gsListeRef.current?.scrollToTop();
    setTimeout(() => {
      navigation.navigate("Glaubenssatz Details");
    }, 100);
  };

  return (
    <AppScreenLayout title={"Glaubenssätze"}>
      <GlaubenssatzListe ref={gsListeRef} />
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
