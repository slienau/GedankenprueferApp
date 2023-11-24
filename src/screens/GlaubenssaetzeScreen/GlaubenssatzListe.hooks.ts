import React from "react";
import {
  GlaubenssatzDataItem,
  GlaubenssatzStatusType,
} from "../../store/glaubenssaetzeSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useGlaubenssatzListeData = () => {
  const glaubenssaetze = useSelector(
    (state: RootState) => state.glaubenssaetze.entities,
  );

  const [filter, setFilter] = React.useState({
    universelleGs: true,
    einschraenkendeGs: true,
    offenFuerZweifel: true,
    museumAlterGs: true,
    ohneStatus: true,
  });

  const data = React.useMemo(() => {
    const data: Record<string, GlaubenssatzDataItem> = {};

    Object.values(glaubenssaetze).forEach((gs) => {
      // universelle Glaubenssätze rausfiltern falls gewünscht (eigene werden immer angezeigt)
      if (!gs.isOwnGs && !filter.universelleGs) return;

      // @ts-ignore
      if (gs.status === "Einschraenkend" && filter.einschraenkendeGs) {
        data[gs.id] = gs;
      }
      // @ts-ignore
      if (gs.status === "OffenFuerZweifel" && filter.offenFuerZweifel) {
        data[gs.id] = gs;
      }
      // @ts-ignore
      if (gs.status === "MuseumAlterGS" && filter.museumAlterGs) {
        data[gs.id] = gs;
      }
      if (
        // @ts-ignore
        (gs.status === "Leer" ||
          gs.status == undefined ||
          gs.status === GlaubenssatzStatusType.Leer) &&
        filter.ohneStatus
      ) {
        data[gs.id] = gs;
      }
    });

    return Object.values(data).sort(
      (a, b) =>
        new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime(),
    );
  }, [glaubenssaetze]);

  return {
    data,
    filter,
    setFilter,
  };
};
