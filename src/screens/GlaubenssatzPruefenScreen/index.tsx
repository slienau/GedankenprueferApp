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
    } else if (step === 5) {
      navigation.goBack();
    } else {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (gs.q1_isThatTrue === false && step === 3) {
      setStep(1);
    } else if (step === 1) {
      navigation.goBack();
    } else {
      setStep(step - 1);
    }
  };

  return (
    <AppScreenLayout
      title={"Glaubenssatz prüfen"}
      onGoBack={previousStep}
      disableGoBack={true}
    >
      <ScrollView style={styles.body}>
        <ScreenHeader title={gs.title} />

        {step === 1 && <Question1 />}

        {step === 2 && <Question2 />}

        {step === 3 && <Question3 />}

        {step === 4 && <Question4 />}

        {step === 5 && <Inversions />}

        <Divider />

        <View style={styles.buttonContainer}>
          <Button onPress={previousStep} accessoryLeft={PreviousIcon}>
            zurück
          </Button>

          {step !== 5 && (
            <Button onPress={nextStep} accessoryRight={NextIcon}>
              weiter
            </Button>
          )}

          {step === 5 && (
            <Button onPress={nextStep} accessoryRight={CheckIcon}>
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
  divider: {
    marginVertical: 20,
  },
});
