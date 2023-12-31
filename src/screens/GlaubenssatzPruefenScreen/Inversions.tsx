import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Input, Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { actions, getSelectedGs } from "../../store/glaubenssaetzeSlice";
import InversionsHelpPopover from "./InversionsHelpPopover";
import { useNavigation } from "@react-navigation/native";
import { NextIcon, PlusIcon } from "../../ui/Icons";
import DeleteConfirmModal from "../../ui/modals/DeleteConfirmModal";
import EditButtons from "../../ui/EditButtons";
import TextInputModal from "../../ui/modals/TextInputModal";

export default function Inversions() {
  const gs = useSelector(getSelectedGs);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState("");
  const [inversionToDelete, setInversionToDelete] = React.useState<
    string | null
  >(null);
  const [inversionToEdit, setInversionToEdit] = React.useState<string | null>(
    null,
  );
  const navigation = useNavigation();

  if (gs == null) return <Text>Error: Kein Glaubenssatz ausgewählt</Text>;

  const addInversion = () => {
    if (inputValue !== "") {
      dispatch(actions.addInversion({ id: gs.id, inversion: inputValue }));
      setTimeout(() => setInputValue(""), 10);
    }
  };

  const deleteInversion = () => {
    if (inversionToDelete != null) {
      dispatch(
        actions.removeInversion({ gsId: gs.id, inversion: inversionToDelete }),
      );
      setInversionToDelete(null);
    }
  };

  const editInversion = (newInversion: string) => {
    if (inversionToEdit != null) {
      dispatch(
        actions.editInversion({
          oldInversion: inversionToEdit,
          newInversion,
        }),
      );
      setInversionToEdit(null);
    }
  };

  const navigateToUmkehrungPruefen = (inversion: string) => {
    dispatch(actions.selectInversion({ inversion }));
    // @ts-ignore
    navigation.navigate("UmkehrungPruefen");
  };

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Text category={"h5"}>Umkehrungen</Text>
        <InversionsHelpPopover />
      </View>
      <View style={styles.inversionListContainer}>
        {Object.keys(gs?.inversions ?? []).map((inversion) => (
          <Card
            key={inversion}
            style={styles.card}
            onPress={() => {
              navigateToUmkehrungPruefen(inversion);
            }}
          >
            <View style={styles.cardBody}>
              <Text category={"s1"} style={styles.inversionText}>
                {inversion}
                {"\n"}
                <Text
                  style={{
                    fontStyle: "italic",
                    color:
                      gs?.inversions[inversion].length > 2
                        ? "green"
                        : undefined,
                  }}
                >
                  {gs?.inversions[inversion].length} Beispiele
                </Text>
              </Text>
              <NextIcon style={styles.nextIcon} />
              <EditButtons
                onDelete={() => setInversionToDelete(inversion)}
                onEdit={() => setInversionToEdit(inversion)}
              />
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.newInversionContainer}>
        <Input
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={addInversion}
          placeholder={"Umkehrung hinzufügen..."}
          style={styles.newInversionInput}
        />
        <Button
          onPress={addInversion}
          accessoryLeft={PlusIcon}
          appearance={"outline"}
          disabled={inputValue === ""}
        />
      </View>

      <DeleteConfirmModal
        title={"Umkehrung löschen?"}
        onConfirm={deleteInversion}
        onCancel={() => {
          setInversionToDelete(null);
        }}
        isVisible={inversionToDelete != null}
      >
        <Text>
          Möchtest du die Umkehrung "
          <Text style={{ fontWeight: "bold" }}>{inversionToDelete ?? ""}</Text>"
          löschen?
        </Text>
      </DeleteConfirmModal>

      <TextInputModal
        title={"Umkehrung umbenennen"}
        placeholder={inversionToEdit ?? ""}
        initialText={inversionToEdit ?? ""}
        isVisible={inversionToEdit != null}
        onCancel={() => {
          setInversionToEdit(null);
        }}
        onConfirm={editInversion}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    // paddingBottom: 50,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 20,
  },
  inversionListContainer: {
    marginVertical: 10,
  },
  inversionText: {
    flex: 1,
  },
  card: {
    marginBottom: 0,
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  newInversionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  newInversionInput: {
    flex: 1,
    marginRight: 10,
  },
  nextIcon: {
    width: 32,
    height: 32,
  },
});
