import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import UnitTestingProviders from "../../../lib/testing-utils/UnitTestingProviders";
import { ButtonBasic, ButtonPrimary, ButtonDanger } from "./index";

describe("Buttons", () => {
  const testItems = [ButtonBasic, ButtonPrimary, ButtonDanger];

  testItems.forEach((ButtonComponent) => {
    test("renders label", () => {
      const { getByText } = render(
        <UnitTestingProviders>
          <ButtonComponent onPress={() => null} label={"Button Label"} />
        </UnitTestingProviders>,
      );
      expect(getByText("Button Label")).not.toBeNull();
    });

    test("calls onPress function", () => {
      {
        const mockFn = jest.fn();
        const { getByText } = render(
          <UnitTestingProviders>
            <ButtonComponent onPress={mockFn} label={"Button Label"} />
          </UnitTestingProviders>,
        );
        const el = getByText("Button Label");
        fireEvent.press(el);
        expect(mockFn).toBeCalledTimes(1);
      }
    });

    test("does not call disabled button", () => {
      const mockFn = jest.fn();
      const { getByText } = render(
        <UnitTestingProviders>
          <ButtonComponent
            onPress={mockFn}
            label={"Button Label"}
            disabled={true}
          />
        </UnitTestingProviders>,
      );
      const el = getByText("Button Label");
      fireEvent.press(el);
      expect(mockFn).not.toBeCalledTimes(1);
      expect(mockFn).toBeCalledTimes(0);
    });

    test("applies style", () => {
      const { getByTestId } = render(
        <UnitTestingProviders>
          <ButtonComponent
            onPress={() => null}
            label={"Button Label"}
            style={{
              backgroundColor: "#1e1e1e",
              borderWidth: 5,
              borderColor: "#434343",
              padding: 101,
              margin: 102,
            }}
            buttonProps={{ testID: "button" }}
          />
        </UnitTestingProviders>,
      );
      const el = getByTestId("button");
      expect(el).toHaveStyle({ backgroundColor: "#1e1e1e" });
      expect(el).toHaveStyle({ borderWidth: 5 });
      expect(el).toHaveStyle({ borderColor: "#434343" });
      expect(el).toHaveStyle({ padding: 101 });
      expect(el).toHaveStyle({ margin: 102 });
    });
  });
});
