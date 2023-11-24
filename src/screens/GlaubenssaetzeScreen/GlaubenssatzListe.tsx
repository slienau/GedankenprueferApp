import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { StyleSheet } from "react-native";
import { Card, List, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { actions, GlaubenssatzDataItem } from "../../store/glaubenssaetzeSlice";
import { RootState } from "../../store";
import { EvaStatus } from "@ui-kitten/components/devsupport";

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
    case "HeiligerPlatz":
      status = "success";
      break;
    // @ts-ignore
    case "MuseumAlterGS":
      status = "success";
      break;
    // @ts-ignore
    case "Einschraenkend":
      status = "danger";
      break;
    // @ts-ignore
    case "OffenFuerZweifel":
      status = "warning";
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

  const data = React.useMemo(
    () =>
      Object.values(glaubenssaetze).sort(
        (a, b) =>
          new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime(),
      ),
    [glaubenssaetze],
  );

  // scroll to top when data changes (e.g. when a new gs is added or edited)
  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [glaubenssaetze]);

  return (
    <List
      ref={listRef}
      data={data}
      renderItem={({ item }) => (
        <ListItem item={item} onPress={() => handleCardPress(item.id)} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
});

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default GlaubenssatzListe;
