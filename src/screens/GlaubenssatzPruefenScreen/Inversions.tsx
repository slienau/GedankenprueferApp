import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Card,
  Icon,
  IconElement,
  IconProps,
  Input,
  Text,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getSelectedGs,
} from "../GlaubenssaetzeScreen/glaubenssaetzeSlice";
import InversionsHelpPopover from "./InversionsHelpPopover";
import { useNavigation } from "@react-navigation/native";

const DeleteIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="trash-2-outline" />
);

const PlusIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="plus-circle-outline" />
);

export default function Inversions() {
  const gs = useSelector(getSelectedGs);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState("");
  const navigation = useNavigation();

  if (gs == null) return <Text>Error: Kein Glaubenssatz ausgewählt</Text>;

  const addInversion = () => {
    if (inputValue !== "") {
      dispatch(actions.addInversion({ id: gs.id, inversion: inputValue }));
      setInputValue("");
    }
  };

  const navigateToInversion = (inversion: string) => {
    // @ts-ignore
    navigation.navigate("UmkehrungPruefen", {
      inversion,
    });
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
            onPress={() => {
              navigateToInversion(inversion);
            }}
          >
            <View style={styles.cardContainer}>
              <Text category={"h6"}>{inversion}</Text>
              <Button
                status={"danger"}
                onPress={() => {
                  dispatch(actions.removeInversion({ gsId: gs.id, inversion }));
                }}
                accessoryLeft={DeleteIcon}
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
        ></Input>
        <Button onPress={addInversion} accessoryLeft={PlusIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingBottom: 50,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  inversionListContainer: {
    marginVertical: 20,
  },
  cardContainer: {
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
});
