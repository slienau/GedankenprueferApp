import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Input, Text } from "@ui-kitten/components";
import AppScreenLayout from "../AppScreenLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getSelectedInversion,
  getSelectedInversionExamples,
} from "../GlaubenssaetzeScreen/glaubenssaetzeSlice";
import ScreenHeader from "../../ui/ScreenHeader";
import EditButtons from "../../ui/EditButtons";
import DeleteConfirmModal from "../../ui/modals/DeleteConfirmModal";
import TextInputModal from "../../ui/modals/TextInputModal";

const UmkehrungPruefenScreen: React.FC<{}> = function () {
  const dispatch = useDispatch();

  const examples = useSelector(getSelectedInversionExamples);
  const inversion = useSelector(getSelectedInversion);
  const inputRef = React.useRef<Input | null>(null);
  const [exampleToEdit, setExampleToEdit] = React.useState<string | null>(null);
  const [exampleToDelete, setExampleToDelete] = React.useState<string | null>(
    null,
  );

  if (inversion == null || examples == null) return null;

  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addExample = () => {
    if (inputValue !== "") {
      dispatch(
        actions.addInversionExample({
          example: inputValue,
        }),
      );

      setTimeout(() => {
        setInputValue("");
        inputRef.current?.focus();
      }, 10);
    }
  };

  const deleteExample = () => {
    if (exampleToDelete != null) {
      dispatch(actions.removeInversionExample({ example: exampleToDelete }));
      setExampleToDelete(null);
    }
  };

  const editExample = (newExample: string) => {
    if (exampleToEdit != null) {
      dispatch(
        actions.editInversionExample({
          oldExample: exampleToEdit,
          newExample,
        }),
      );
      setExampleToEdit(null);
    }
  };

  return (
    <AppScreenLayout title={"Umkehrung prüfen"}>
      <ScrollView style={styles.body}>
        <ScreenHeader title={inversion} />
        <Text category={"s1"}>
          Finde mindestens drei Beispiele, wie diese Aussage wahr ist.
        </Text>
        <View style={styles.examplesContainer}>
          {examples.map((example, index) => (
            <Card key={`${inversion}-${example}`} style={styles.exampleCard}>
              <View style={styles.exampleCardBody}>
                <Text style={styles.exampleText}>
                  {index + 1}) {example}
                </Text>
                <EditButtons
                  onDelete={() => setExampleToDelete(example)}
                  onEdit={() => setExampleToEdit(example)}
                />
              </View>
            </Card>
          ))}
          <Card>
            <View style={styles.inputCard}>
              <Text>{examples.length + 1}) </Text>
              <Input
                ref={inputRef}
                placeholder={"Beispiel hinzufügen"}
                value={inputValue}
                onChangeText={setInputValue}
                onSubmitEditing={addExample}
                style={styles.input}
              />
            </View>
          </Card>
        </View>
      </ScrollView>

      <DeleteConfirmModal
        title={"Beispiel löschen?"}
        onConfirm={deleteExample}
        onCancel={() => {
          setExampleToDelete(null);
        }}
        isVisible={exampleToDelete != null}
      >
        <Text>
          Möchtest du das Beispiel "
          <Text style={{ fontWeight: "bold" }}>{exampleToDelete ?? ""}</Text>"
          löschen?
        </Text>
      </DeleteConfirmModal>

      <TextInputModal
        title={"Beispiel umbenennen"}
        placeholder={exampleToEdit ?? ""}
        initialText={exampleToEdit ?? ""}
        isVisible={exampleToEdit != null}
        onCancel={() => {
          setExampleToEdit(null);
        }}
        onConfirm={editExample}
      />
    </AppScreenLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingBottom: 0,
    textAlign: "center",
  },
  body: {
    paddingHorizontal: 20,
  },
  examplesContainer: {
    marginTop: 20,
    // flexDirection: "row",
    // flexWrap: "wrap",
  },
  exampleCard: {
    marginVertical: 10,
  },
  exampleCardBody: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  exampleText: {
    flex: 1,
  },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    flex: 1,
  },
});

export default UmkehrungPruefenScreen;
