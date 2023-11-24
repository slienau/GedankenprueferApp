import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { StyleSheet, View } from "react-native";
import { Card, Divider, List, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { actions, GlaubenssatzDataItem } from "../../store/glaubenssaetzeSlice";
import { RootState } from "../../store";
import { EvaStatus } from "@ui-kitten/components/devsupport";
import GlaubenssatzListeFilter from "./GlaubenssatzListeFilter";
import { useGlaubenssatzListeData } from "./GlaubenssatzListe.hooks";

type ListItemProps = {
  item: GlaubenssatzDataItem;
  onPress: () => void;
};

const ListItem = React.memo(({ item, onPress }: ListItemProps) => {
  let status: EvaStatus = "basic";
  switch (item.status) {
    // @ts-ignore
    case "Leer":
      status = "basic";
      break;
    // @ts-ignore
    case "Einschraenkend":
      status = "danger";
      break;
    // @ts-ignore
    case "OffenFuerZweifel":
      status = "warning";
      break;
    // @ts-ignore
    case "MuseumAlterGS":
      status = "success";
      break;
  }
  return (
    <Card style={styles.card} onPress={onPress} status={status}>
      <Text category={"h4"}>{item.title}</Text>
    </Card>
  );
});

const GlaubenssatzListe = forwardRef((props, ref) => {
  const glaubenssaetze = useSelector(
    (state: RootState) => state.glaubenssaetze.entities,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const listRef = useRef<List>(null);

  const { filteredData, filter, setFilter } = useGlaubenssatzListeData();

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    },
  }));

  const handleCardPress = useCallback((id: string) => {
    dispatch(actions.selectGs({ id }));
    // @ts-ignore
    navigation.navigate("Glaubenssatz Details");
  }, []);

  // scroll to top when data changes (e.g. when a new gs is added or edited)
  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [glaubenssaetze]);

  return (
    <View style={styles.root}>
      <GlaubenssatzListeFilter filter={filter} setFilter={setFilter} />
      <Divider style={{ marginVertical: 5 }} />
      <List
        ref={listRef}
        data={filteredData}
        renderItem={({ item }) => (
          <ListItem item={item} onPress={() => handleCardPress(item.id)} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    // marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default GlaubenssatzListe;
