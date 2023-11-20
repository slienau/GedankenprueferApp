import { SafeAreaView, StyleSheet } from "react-native";
import {
  Icon,
  IconElement,
  IconProps,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

const BackIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="arrow-back" />
);

const BackAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction
      icon={navigation.canGoBack() ? BackIcon : undefined}
      onPress={navigation.goBack}
    />
  );
};

export default function GlaubenssatzDetailsScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <TopNavigation
        title={"Glaubenssatz"}
        alignment={"center"}
        accessoryLeft={BackAction}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
  },
});
