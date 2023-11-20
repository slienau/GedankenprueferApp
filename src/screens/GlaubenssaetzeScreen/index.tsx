import AppScreenLayout from "../AppScreenLayout";
import GlaubenssatzListe from "./GlaubenssatzListe";

export default function GlaubenssaetzeScreen() {
  return (
    <AppScreenLayout title={"Glaubenssätze"}>
      <GlaubenssatzListe />
    </AppScreenLayout>
  );
}
