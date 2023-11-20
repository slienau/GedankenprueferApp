import AppScreenLayout from "../AppScreenLayout";
import { useSelector } from "react-redux";
import { Text } from "@ui-kitten/components";
import { RootState } from "../../store";

export default function GlaubenssatzDetailsScreen() {
  const gs = useSelector((state: RootState) => state.glaubenssaetze.selected);
  return (
    <AppScreenLayout title={"Glaubenssatz prüfen"}>
      <Text category={"h1"}>{gs?.title ?? ""}</Text>
    </AppScreenLayout>
  );
}
