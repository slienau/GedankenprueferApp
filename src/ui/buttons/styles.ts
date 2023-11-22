import { StyleSheet } from "react-native";
// const theme = require("../../../theme/theme.json");

export default StyleSheet.create({
  button: {
    paddingHorizontal: 12
  },
  buttonBasic: { backgroundColor: "transparent", borderColor: "#000" },
  disabled: {
    // backgroundColor: theme["color-grey-100"],
    // borderColor: theme["color-grey-300"],
  },
  textWhite: { color: "#fff" },
  textDark: { color: "#000" },
  textDisabled: {
    // color: theme["color-grey-600"]
  },
  wide: { minWidth: 217 }
});
