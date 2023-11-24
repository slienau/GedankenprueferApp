import React from "react";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { GlaubenssatzListeFilterType } from "./GlaubenssatzListe.hooks";

type GlaubenssatzListeFilterProps = {
  filter: GlaubenssatzListeFilterType;
  setFilter: (newFilter: Partial<GlaubenssatzListeFilterType>) => void;
};

const GlaubenssatzListeFilter: React.FC<GlaubenssatzListeFilterProps> = ({
  filter,
  setFilter,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath[]>([
    new IndexPath(0),
    new IndexPath(1),
  ]);

  const handleSelect = (index: IndexPath[]) => {
    setSelectedIndex(index);

    const selectedRows = index.map((i) => i.row);

    setFilter({
      universelleGs: selectedRows.includes(0),
      einschraenkendeGs: selectedRows.includes(1),
      offenFuerZweifel: selectedRows.includes(2),
      museumAlterGs: selectedRows.includes(3),
      ohneStatus: selectedRows.includes(4),
    });
  };

  return (
    <Select
      multiSelect={true}
      selectedIndex={selectedIndex}
      onSelect={handleSelect}
      placeholder={"Filter"}
    >
      <SelectItem title="Universelle Glaubenssätze" />
      <SelectItem title="einschränkende Glaubenssätze" />
      <SelectItem title="offen für Zweifel" />
      <SelectItem title="Museum alter Glaubenssätze" />
      <SelectItem title="ohne Status" />
    </Select>
  );
};

export default GlaubenssatzListeFilter;
