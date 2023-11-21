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
import { UmkehrungPruefenScreenRouteProp } from "../../AppNavigator";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getSelectedGs,
} from "../GlaubenssaetzeScreen/glaubenssaetzeSlice";

export type UmkehrungPruefenScreenParams = {
  inversion: string;
};

type UmkehrungPruefenScreenProps = {
  route: UmkehrungPruefenScreenRouteProp & {
    params: UmkehrungPruefenScreenParams;
  };
  navigation: any;
};

const PlusIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="plus-circle-outline" />
);

const UmkehrungPruefenScreen: React.FC<UmkehrungPruefenScreenProps> =
  function ({ route }) {
    const gs = useSelector(getSelectedGs);
    const dispatch = useDispatch();
    const { inversion } = route.params;

    if (gs == null) return null;

    const examples: Array<string> = Object.values(gs.inversions[inversion]);

    const [inputValue, setInputValue] = React.useState("");

    const addExample = () => {
      if (inputValue !== "") {
        dispatch(
          actions.addInversionExample({
            gsId: gs.id,
            inversion,
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
              <Card
                key={example}
                style={styles.exampleCard}
                // onPress={() => onAddExample(example)}
              >
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
