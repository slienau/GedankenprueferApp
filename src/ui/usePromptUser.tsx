import { useState } from "react";
import { Alert, TextInput } from "react-native";

const usePromptUser = () => {
  const [inputValue, setInputValue] = useState("");

  const promptUser = () => {
    Alert.alert(
      "Prompt Title",
      "Prompt Message",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => console.log("OK Pressed, inputValue: ", inputValue)
        }
      ],
      {
        cancelable: false,
        onDismiss: () => console.log("onDismiss"),
        renderCustomContent: () => (
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            autoFocus={true}
            placeholder="Type here..."
          />
        )
      }
    );
  };

  return promptUser;
};

export default usePromptUser;