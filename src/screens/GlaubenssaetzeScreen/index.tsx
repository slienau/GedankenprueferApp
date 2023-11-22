import AppScreenLayout from "../AppScreenLayout";
import GlaubenssatzListe from "./GlaubenssatzListe";
import FloatingActionButton from "../../ui/FloatingActionButton";

export default function GlaubenssaetzeScreen() {
    return (
        <AppScreenLayout title={"Glaubenssätze"}>
            <GlaubenssatzListe/>
            <FloatingActionButton onPress={() => console.log("pressed")}/>
        </AppScreenLayout>
    );
}
