import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  TopNavigationProps,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { BackIcon } from "../ui/Icons";

export interface AppScreenLayoutProps {
  title?: string;
  topNavigationProps?: TopNavigationProps;
  children?: React.ReactNode;
  onGoBack?: () => void;
  disableGoBack?: boolean;
}

const AppScreenLayout: React.FC<AppScreenLayoutProps> = (props) => {
  const navigation = useNavigation();

  const BackAction = props.disableGoBack
    ? undefined
    : () => {
        return (
          <TopNavigationAction
            icon={navigation.canGoBack() ? BackIcon : undefined}
            onPress={props.onGoBack || navigation.goBack}
          />
        );
      };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.root}
    >
      <SafeAreaView style={styles.safeArea}>
        <TopNavigation
          title={props.title}
          alignment={"center"}
          accessoryLeft={BackAction}
          {...props.topNavigationProps}
        />
        <Divider />
        <Layout style={styles.layout}>{props.children}</Layout>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  layout: {
    flex: 1,
  },
});

export default AppScreenLayout;
