import React from "react";
import AppScreenLayout from "../AppScreenLayout";
import { useSelector } from "react-redux";
import { Button } from "@ui-kitten/components";
import { ScrollView, StyleSheet, View } from "react-native";
import { getSelectedGs } from "../../store/glaubenssaetzeSlice";
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";
import Inversions from "./Inversions";
import ScreenHeader from "../../ui/ScreenHeader";
import Divider from "../../ui/Divider";
import { CheckIcon, NextIcon, PreviousIcon } from "../../ui/Icons";
import { useNavigation } from "@react-navigation/native";

export default function GlaubenssatzPruefenScreen() {
  const gs = useSelector(getSelectedGs);
  const navigation = useNavigation();
  const [step, setStep] = React.useState(1);

  if (gs == null) return null;

  const nextStep = () => {
    if (gs.q1_isThatTrue === false && step === 1) {
      setStep(3);
    } else {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (gs.q1_isThatTrue === false && step === 3) {
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };

  const finish = () => {
    navigation.goBack();
  };

  return (
    <AppScreenLayout title={"Glaubenssatz prüfen"}>
      <ScrollView style={styles.body}>
        <ScreenHeader title={gs.title} />

        {step === 1 && <Question1 />}

        {step === 2 && <Question2 />}

        {step === 3 && <Question3 />}

        {step === 4 && <Question4 />}

        {step === 5 && <Inversions />}

        <Divider />

        <View
          style={[
            styles.buttonContainer,
            step === 1 && styles.singleButtonContainer,
          ]}
        >
          {step !== 1 && (
            <Button
              onPress={previousStep}
              disabled={step === 1}
              accessoryLeft={PreviousIcon}
            >
              zurück
            </Button>
          )}

          {step !== 5 && (
            <Button
              onPress={nextStep}
              // disabled={step === 5}
              accessoryRight={NextIcon}
            >
              weiter
            </Button>
          )}

          {step === 5 && (
            <Button onPress={finish} accessoryRight={CheckIcon}>
              fertig
            </Button>
          )}
        </View>
      </ScrollView>
    </AppScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    padding: 20,
    paddingBottom: 0,
  },
  body: {
    // paddingTop: 0,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    // marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  singleButtonContainer: {
    justifyContent: "flex-end",
  },
  divider: {
    marginVertical: 20,
  },
});
