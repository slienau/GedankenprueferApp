import React from "react";
import AppScreenLayout from "../AppScreenLayout";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { actions, getSelectedGs } from "../../store/glaubenssaetzeSlice";
import { useNavigation } from "@react-navigation/native";
import ScreenHeader from "../../ui/ScreenHeader";
import { DeleteIcon } from "../../ui/Icons";
import DeleteConfirmModal from "../../ui/modals/DeleteConfirmModal";

export default function GlaubenssatzDetailsScreen() {
  const gs = useSelector(getSelectedGs);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isDeleteModalVisible, setDeleteModalVisible] = React.useState(false);

  if (gs == null) return null;

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
        <Button
          style={styles.button}
          onPress={() => {
            // @ts-ignore
            navigation.navigate("Glaubenssatz prüfen");
          }}
        >
          Glaubenssatz prüfen
        </Button>
        <Button
          accessoryRight={DeleteIcon}
          status={"danger"}
          style={styles.button}
          onPress={toggleDeleteModalVisible}
        >
          Löschen
        </Button>
      </View>
      <DeleteConfirmModal
        title={gs.title}
        text={`Möchtest du diesen Glaubenssatz wirklich löschen?`}
        onConfirm={handleDeleteGs}
        onCancel={toggleDeleteModalVisible}
        isVisible={isDeleteModalVisible}
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
