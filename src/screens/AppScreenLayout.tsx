import { SafeAreaView, StyleSheet } from "react-native";
import {
  Divider,
  Icon,
  IconElement,
  IconProps,
  Layout,
  LayoutProps,
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
  containerStyle?: LayoutProps["style"];
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
      <Divider />
      <Layout style={props.containerStyle}>{props.children}</Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default AppScreenLayout;
