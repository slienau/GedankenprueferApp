import React from "react";
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

  if (inversion == null || examples == null) return null;

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
