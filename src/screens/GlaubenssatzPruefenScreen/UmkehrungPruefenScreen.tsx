import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
  const inputRef = React.useRef<Input>(null);

  if (inversion == null || examples == null) return null;

  const [inputValue, setInputValue] = React.useState("");

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

  return (
    <AppScreenLayout title={"Umkehrung prüfen"}>
      <Text category={"h1"} style={styles.header}>
        {inversion}
      </Text>
      <ScrollView style={styles.body}>
        <Text category={"s1"}>
          Finde mindestens drei Beispiele, wie diese Aussage wahr ist.
        </Text>
        <View style={styles.examplesContainer}>
          {examples.map((example, index) => (
            <Card key={`${inversion}-${example}`} style={styles.exampleCard}>
              <Text>
                {index}) {example}
              </Text>
            </Card>
          ))}
          <View>
            <Input
              ref={inputRef}
              placeholder={"Beispiel hinzufügen"}
              value={inputValue}
              onChangeText={setInputValue}
              onSubmitEditing={addExample}
            />
            <Button onPress={addExample} accessoryLeft={PlusIcon} />
          </View>
        </View>
      </ScrollView>
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
    padding: 20,
    // paddingTop: 0,
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
