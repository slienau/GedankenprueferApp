import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  GlaubenssatzDataItem,
  GlaubenssatzStatusType,
} from "../../services/db";

export type GlaubenssatzListeFilterType = {
  universelleGs: boolean;
  einschraenkendeGs: boolean;
  offenFuerZweifel: boolean;
  museumAlterGs: boolean;
  positiverGs: boolean;
  ohneStatus: boolean;
};

export const useGlaubenssatzListeData = () => {
  const glaubenssaetze = useSelector(
    (state: RootState) => state.glaubenssaetze.entities,
  );

  const [filter, setFilter] = React.useState<GlaubenssatzListeFilterType>({
    universelleGs: true,
    einschraenkendeGs: true,
    offenFuerZweifel: true,
    museumAlterGs: true,
    positiverGs: true,
    ohneStatus: true,
  });

  const filteredData = React.useMemo(() => {
    const data: Record<string, GlaubenssatzDataItem> = {};

    Object.values(glaubenssaetze).forEach((gs) => {
      // universelle Glaubenssätze rausfiltern falls gewünscht (eigene werden immer angezeigt)
      if (!gs.isUniversal && !filter.universelleGs) return;

      // @ts-ignore
      if (
        gs.status === GlaubenssatzStatusType.Einschraenkend &&
        filter.einschraenkendeGs
      ) {
        data[gs.id] = gs;
      }
      // @ts-ignore
      if (
        gs.status === GlaubenssatzStatusType.OffenFuerZweifel &&
        filter.offenFuerZweifel
      ) {
        data[gs.id] = gs;
      }
      // @ts-ignore
      if (
        gs.status === GlaubenssatzStatusType.MuseumAlterGS &&
        filter.museumAlterGs
      ) {
        data[gs.id] = gs;
      }
      // @ts-ignore
      if (
        gs.status === GlaubenssatzStatusType.PositiverGS &&
        filter.positiverGs
      ) {
        data[gs.id] = gs;
      }
      if (
        // @ts-ignore
        (gs.status == undefined || gs.status === GlaubenssatzStatusType.Leer) &&
        filter.ohneStatus
      ) {
        data[gs.id] = gs;
      }
    });

    return Object.values(data).sort(
      (a, b) =>
        new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime(),
    );
  }, [glaubenssaetze, filter]);

  const handleSetFilter = (newFilter: Partial<GlaubenssatzListeFilterType>) => {
    console.debug("Glaubenssatz filter change", newFilter);
    setFilter((prev) => ({
      ...prev,
      ...newFilter,
    }));
  };

  console.debug(
    "filteredData length:",
    filteredData.length,
    "; filter:",
    filter,
  );

  return {
    filteredData,
    filter,
    setFilter: handleSetFilter,
  };
};
