import React from "react";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";

type GlaubenssatzListeFilterProps = {
  filter: {
    universelleGs: boolean;
    einschraenkendeGs: boolean;
    offenFuerZweifel: boolean;
    museumAlterGs: boolean;
    ohneStatus: boolean;
  };
  setFilter: (
    newFilter: Partial<GlaubenssatzListeFilterProps["filter"]>,
  ) => void;
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
    console.log("handleSelect", index);
    setSelectedIndex(index);
    setFilter({
      universelleGs: index.includes(new IndexPath(0)),
      einschraenkendeGs: index.includes(new IndexPath(2)),
      offenFuerZweifel: index.includes(new IndexPath(3)),
      museumAlterGs: index.includes(new IndexPath(4)),
      ohneStatus: index.includes(new IndexPath(5)),
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
