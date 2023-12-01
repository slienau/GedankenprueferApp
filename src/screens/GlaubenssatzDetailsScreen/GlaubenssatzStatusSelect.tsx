import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { actions, getSelectedGs } from "../../store/glaubenssaetzeSlice";
import { GlaubenssatzStatusType } from "../../services/db";

const statusOptions = Object.values(GlaubenssatzStatusType);

export default function GlaubenssatzStatusSelect() {
  const gs = useSelector(getSelectedGs);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  // set initial status
  React.useEffect(() => {
    if (gs == null) return;
    const index = statusOptions.findIndex(
      (statusOption) => statusOption === gs.status,
    );
    setSelectedIndex(new IndexPath(index));
  }, [gs]);

  if (gs == null) return null;

  // update status in store on change
  const handleSelect = (index: IndexPath) => {
    setSelectedIndex(index);
    const status = statusOptions[index.row] as GlaubenssatzStatusType;
    if (status === gs.status) return;
    dispatch(
      actions.update({
        id: gs.id,
        status,
      }),
    );
  };

  return (
    <View style={styles.root}>
      <Select
        selectedIndex={selectedIndex}
        onSelect={(index) => handleSelect(index as IndexPath)}
        label={"Status"}
        value={statusOptions[selectedIndex.row] ?? " "}
      >
        {statusOptions.map((statusOption) => (
          <SelectItem key={statusOption} title={statusOption} />
        ))}
      </Select>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingBottom: 10,
  },
});
