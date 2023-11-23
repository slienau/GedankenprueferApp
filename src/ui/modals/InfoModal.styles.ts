import { StyleSheet } from "react-native";

export default StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  view: {
    marginHorizontal: 10,
    marginVertical: 50,
    backgroundColor: "#fff",
    padding: 20,
  },
  body: {
    marginTop: 25,
  },
  closeButton: { position: "absolute", top: 0, right: 0 },
});
