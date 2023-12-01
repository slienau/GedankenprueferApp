import React from "react";
import { Button } from "@ui-kitten/components";
import AppScreenLayout from "../AppScreenLayout";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { actions, getSelectedGs } from "../../store/glaubenssaetzeSlice";
import { useNavigation } from "@react-navigation/native";
import ScreenHeader from "../../ui/ScreenHeader";
import {
  BackIcon,
  DeleteIcon,
  EditIcon,
  MagnifyingGlassIcon,
} from "../../ui/Icons";
import DeleteConfirmModal from "../../ui/modals/DeleteConfirmModal";
import GlaubenssatzStatusSelect from "./GlaubenssatzStatusSelect";
import TextInputModal from "../../ui/modals/TextInputModal";
import Divider from "../../ui/Divider";
import { GlaubenssatzStatusType } from "../../services/db";

export default function GlaubenssatzDetailsScreen() {
  const gs = useSelector(getSelectedGs);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isDeleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [isEditModalVisible, setEditModalVisible] = React.useState(false);

  if (gs == null) return null;

  const handleEditGs = (title: string) => {
    dispatch(actions.update({ id: gs.id, title }));
    toggleEditModalVisible();
  };

  const toggleEditModalVisible = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const toggleDeleteModalVisible = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const handleDeleteGs = () => {
    dispatch(actions.deleteGs({ id: gs.id }));
    navigation.goBack();
  };

  return (
    <AppScreenLayout title={"Glaubenssatz"}>
      <ScreenHeader title={gs.title} />
      <View style={styles.body}>
        <GlaubenssatzStatusSelect />
        {gs.status !== GlaubenssatzStatusType.PositiverGS && (
          <Button
            style={styles.button}
            onPress={() => {
              // @ts-ignore
              navigation.navigate("Glaubenssatz prüfen");
            }}
            accessoryLeft={MagnifyingGlassIcon}
            size={"giant"}
          >
            Glaubenssatz prüfen
          </Button>
        )}
        {gs.status === GlaubenssatzStatusType.PositiverGS && (
          <Button
            style={styles.button}
            onPress={() => {
              // @ts-ignore
              navigation.navigate("PositivenGlaubenssatzPruefen");
            }}
            accessoryLeft={MagnifyingGlassIcon}
            size={"giant"}
          >
            Beispiele
          </Button>
        )}
        <Divider />
        <View>
          <Button
            style={styles.button}
            onPress={() => navigation.goBack()}
            accessoryLeft={BackIcon}
            appearance={"outline"}
            size={"small"}
          >
            Zurück zur Übersicht
          </Button>
          <Button
            style={styles.button}
            onPress={toggleEditModalVisible}
            accessoryLeft={EditIcon}
            appearance={"outline"}
            size={"small"}
          >
            Umbenennen
          </Button>
          <Button
            accessoryLeft={DeleteIcon}
            status={"danger"}
            style={styles.button}
            onPress={toggleDeleteModalVisible}
            appearance={"outline"}
            size={"small"}
          >
            Löschen
          </Button>
        </View>
      </View>
      <DeleteConfirmModal
        title={gs.title}
        text={`Möchtest du diesen Glaubenssatz wirklich löschen?`}
        onConfirm={handleDeleteGs}
        onCancel={toggleDeleteModalVisible}
        isVisible={isDeleteModalVisible}
      />
      <TextInputModal
        isVisible={isEditModalVisible}
        onCancel={toggleEditModalVisible}
        onConfirm={handleEditGs}
        title={"Glaubenssatz umbenennen"}
        initialText={gs.title}
      />
    </AppScreenLayout>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 10,
  },
});
