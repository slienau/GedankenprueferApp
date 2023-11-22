import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Card, Input, Text,} from "@ui-kitten/components";
import {useDispatch, useSelector} from "react-redux";
import {actions, getSelectedGs,} from "../GlaubenssaetzeScreen/glaubenssaetzeSlice";
import InversionsHelpPopover from "./InversionsHelpPopover";
import {useNavigation} from "@react-navigation/native";
import {DeleteIcon, PlusIcon} from "../../ui/Icons";

export default function Inversions() {
    const gs = useSelector(getSelectedGs);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = React.useState("");
    const navigation = useNavigation();

    if (gs == null) return <Text>Error: Kein Glaubenssatz ausgewählt</Text>;

    const addInversion = () => {
        if (inputValue !== "") {
            dispatch(actions.addInversion({id: gs.id, inversion: inputValue}));
            setInputValue("");
        }
    };

    const navigateToInversion = (inversion: string) => {
        dispatch(actions.selectInversion({inversion}));
        // @ts-ignore
        navigation.navigate("UmkehrungPruefen");
    };

    return (
        <View style={styles.root}>
            <View style={styles.headerContainer}>
                <Text category={"h5"}>Umkehrungen</Text>
                <InversionsHelpPopover/>
            </View>
            <View style={styles.inversionListContainer}>
                {Object.keys(gs?.inversions ?? []).map((inversion) => (
                    <Card
                        key={inversion}
                        onPress={() => {
                            navigateToInversion(inversion);
                        }}
                    >
                        <View style={styles.cardContainer}>
                            <Text category={"s1"}>{inversion}</Text>
                            <Button
                                status={"danger"}
                                onPress={() => {
                                    dispatch(actions.removeInversion({gsId: gs.id, inversion}));
                                }}
                                accessoryLeft={DeleteIcon}
                                appearance={"ghost"}
                            />
                        </View>
                    </Card>
                ))}
            </View>
            <View style={styles.newInversionContainer}>
                <Input
                    value={inputValue}
                    onChangeText={setInputValue}
                    onSubmitEditing={addInversion}
                    placeholder={"Umkehrung hinzufügen..."}
                    style={styles.newInversionInput}
                />
                <Button
                    onPress={addInversion}
                    accessoryLeft={PlusIcon}
                    appearance={"outline"}
                    disabled={inputValue === ""}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        // paddingBottom: 50,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // marginBottom: 20,
    },
    inversionListContainer: {
        marginVertical: 20,
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    newInversionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    newInversionInput: {
        flex: 1,
        marginRight: 10,
    },
});
