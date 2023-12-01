import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, getSelectedGs } from "../../store/glaubenssaetzeSlice";
import FindExamplesScreen from "./FindExamplesScreen";

const PositivenGlaubenssatzPruefenScreen: React.FC<{}> = function () {
  const dispatch = useDispatch();

  const gs = useSelector(getSelectedGs);

  const handleAddExample = (example: string) => {
    dispatch(
      actions.addPositiveExample({
        example,
      }),
    );
  };

  const handleDeleteExample = (example: string) => {
    dispatch(actions.removePositiveExample({ example }));
  };

  const handleEditExample = (oldExample: string, newExample: string) => {
    dispatch(
      actions.editPositiveExample({
        oldExample,
        newExample,
      }),
    );
  };

  return (
    <FindExamplesScreen
      statement={gs?.title ?? ""}
      examples={gs?.positiveExamples ?? []}
      onAddExample={handleAddExample}
      onDeleteExample={handleDeleteExample}
      onEditExample={handleEditExample}
    />
  );
};

export default PositivenGlaubenssatzPruefenScreen;
