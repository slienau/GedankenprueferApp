import React from "react";
import { Input } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  getSelectedInversion,
  getSelectedInversionExamples,
} from "../../store/glaubenssaetzeSlice";
import FindExamplesScreen from "./FindExamplesScreen";

const UmkehrungPruefenScreen: React.FC<{}> = function () {
  const dispatch = useDispatch();

  const examples = useSelector(getSelectedInversionExamples);
  const inversion = useSelector(getSelectedInversion);
  const inputRef = React.useRef<Input | null>(null);

  if (inversion == null || examples == null) return null;

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAddExample = (example: string) => {
    dispatch(
      actions.addInversionExample({
        example,
      }),
    );
  };

  const handleDeleteExample = (example: string) => {
    dispatch(actions.removeInversionExample({ example }));
  };

  const handleEditExample = (oldExample: string, newExample: string) => {
    dispatch(
      actions.editInversionExample({
        oldExample,
        newExample,
      }),
    );
  };

  return (
    <FindExamplesScreen
      statement={inversion}
      examples={examples || []}
      onAddExample={handleAddExample}
      onDeleteExample={handleDeleteExample}
      onEditExample={handleEditExample}
    />
  );
};

export default UmkehrungPruefenScreen;
