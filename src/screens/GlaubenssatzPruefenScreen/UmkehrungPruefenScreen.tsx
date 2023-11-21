import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Icon,
  IconElement,
  IconProps,
  Input,
  Text,
} from "@ui-kitten/components";
import AppScreenLayout from "../AppScreenLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getSelectedInversion,
  getSelectedInversionExamples,
} from "../GlaubenssaetzeScreen/glaubenssaetzeSlice";

const PlusIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="plus-circle-outline" />
);

const UmkehrungPruefenScreen: React.FC<{}> = function () {
  const dispatch = useDispatch();

  const examples = useSelector(getSelectedInversionExamples);
  const inversion = useSelector(getSelectedInversion);

  if (inversion == null || examples == null) return null;

  const [inputValue, setInputValue] = React.useState("");

  const addExample = () => {
    if (inputValue !== "") {
      dispatch(
        actions.addInversionExample({
          example: inputValue,
        }),
      );
      setInputValue("");
    }
  };

  return (
    <AppScreenLayout title={"Umkehrung prüfen"}>
      <View style={styles.root}>
        <Text category={"h1"}>{inversion}</Text>
        <View style={styles.examplesContainer}>
          {examples.map((example) => (
            <Card key={`${inversion}-${example}`} style={styles.exampleCard}>
              <Text>{example}</Text>
            </Card>
          ))}
          <View>
            <Input
              placeholder={"Beispiel hinzufügen"}
              value={inputValue}
              onChangeText={setInputValue}
              onSubmitEditing={addExample}
            />
            <Button onPress={addExample} accessoryLeft={PlusIcon} />
          </View>
        </View>
      </View>
    </AppScreenLayout>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  examplesContainer: {
    // marginTop: 20,
    // flexDirection: "row",
    // flexWrap: "wrap",
  },
  exampleCard: {
    marginVertical: 10,
  },
});

export default UmkehrungPruefenScreen;
