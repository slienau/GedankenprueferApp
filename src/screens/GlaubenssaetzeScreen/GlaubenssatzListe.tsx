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

import { actions } from "../../store/glaubenssaetzeSlice";
import { RootState } from "../../store";
import { EvaStatus } from "@ui-kitten/components/devsupport";
import GlaubenssatzListeFilter from "./GlaubenssatzListeFilter";
import { useGlaubenssatzListeData } from "./GlaubenssatzListe.hooks";
import {
  GlaubenssatzDataItem,
  GlaubenssatzStatusType,
} from "../../services/db";

type ListItemProps = {
  item: GlaubenssatzDataItem;
  onPress: () => void;
};

const ListItem = React.memo(({ item, onPress }: ListItemProps) => {
  let status: EvaStatus = "basic";
  switch (item.status) {
    case GlaubenssatzStatusType.Leer:
      status = "basic";
      break;
    case GlaubenssatzStatusType.Einschraenkend:
      status = "danger";
      break;
    case GlaubenssatzStatusType.OffenFuerZweifel:
      status = "warning";
      break;
    case GlaubenssatzStatusType.MuseumAlterGS:
      status = "info";
      break;
    case GlaubenssatzStatusType.PositiverGS:
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

  const handleCardPress = useCallback((id: number) => {
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
      {filteredData.length === 0 && (
        <Text>
          Keine Glaubenssätze entsprechend den Filterkriterien gefunden
        </Text>
      )}
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
