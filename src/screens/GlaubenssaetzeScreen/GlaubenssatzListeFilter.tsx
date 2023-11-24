import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import React from "react";

export default function GlaubenssatzListeFilter() {
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath[]>([
    new IndexPath(0),
    new IndexPath(1),
  ]);

  const handleSelect = (index: IndexPath[]) => {
    console.log("handleSelect", index);
    setSelectedIndex(index);
  };

  return (
    <Select
      multiSelect={true}
      selectedIndex={selectedIndex}
      onSelect={handleSelect}
      placeholder={"Filter"}
    >
      <SelectItem title="Universelle Glaubenssätze" />
      <SelectItem title="Eigene Glaubenssätze" />
      <SelectItem title="einschränkende Glaubenssätze" />
      <SelectItem title="offen für Zweifel" />
      <SelectItem title="Museum alter Glaubenssätze" />
    </Select>
  );
}
