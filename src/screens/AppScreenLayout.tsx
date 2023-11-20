import { SafeAreaView, StyleSheet } from "react-native";
import {
  Icon,
  IconElement,
  IconProps,
  TopNavigation,
  TopNavigationAction,
  TopNavigationProps,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export interface AppScreenLayoutProps {
  title?: string;
  topNavigationProps?: TopNavigationProps;
  children?: React.ReactNode;
}

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

const AppScreenLayout: React.FC<AppScreenLayoutProps> = (props) => {
  return (
    <SafeAreaView style={styles.root}>
      <TopNavigation
        title={props.title}
        alignment={"center"}
        accessoryLeft={BackAction}
        {...props.topNavigationProps}
      />
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
  },
});

export default AppScreenLayout;
