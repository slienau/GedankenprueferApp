import React, {
  useCallback,
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { StyleSheet } from "react-native";
import { Card, List, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { GlaubenssatzDataItem, actions } from "../../store/glaubenssaetzeSlice";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

type ListItemProps = {
  item: GlaubenssatzDataItem;
  onPress: () => void;
};

const ListItem = React.memo(({ item, onPress }: ListItemProps) => (
  <Card style={styles.card} onPress={onPress}>
    <Text category={"h4"}>{item.title}</Text>
  </Card>
));

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
    marginVertical: 20,
  },
});

export default GlaubenssatzListe;
