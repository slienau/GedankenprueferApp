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
import { PlusIcon } from "../../ui/Icons";

const UmkehrungPruefenScreen: React.FC<{}> = function () {
  const dispatch = useDispatch();

  const examples = useSelector(getSelectedInversionExamples);
  const inversion = useSelector(getSelectedInversion);
  const inputRef = React.useRef<Input>(null);

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

  return (
    <AppScreenLayout title={"Umkehrung prüfen"}>
      <ScreenHeader title={inversion} />

      <ScrollView style={styles.body}>
        <Text category={"s1"}>
          Finde mindestens drei Beispiele, wie diese Aussage wahr ist.
        </Text>
        <View style={styles.examplesContainer}>
          {examples.map((example, index) => (
            <Card key={`${inversion}-${example}`} style={styles.exampleCard}>
              <Text>
                {index + 1}) {example}
              </Text>
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
        {/*<View>*/}
        {/*  <Button onPress={addExample} accessoryLeft={PlusIcon} />*/}
        {/*</View>*/}
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
    paddingHorizontal: 20,
  },
  examplesContainer: {
    // marginTop: 20,
    // flexDirection: "row",
    // flexWrap: "wrap",
  },
  exampleCard: {
    marginVertical: 10,
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
