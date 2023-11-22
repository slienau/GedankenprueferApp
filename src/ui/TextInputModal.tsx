import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { Button, Modal, Text } from "@ui-kitten/components";

const TextInputModal = () => {
  const [inputValue, setInputValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const openPrompt = () => {
    setModalVisible(true);
  };

  const closePrompt = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    console.log("Confirmed inputValue: ", inputValue);
    closePrompt();
  };

  return (
    <View>
      <Modal visible={modalVisible} transparent={false}>
        <View>
          <Text>Prompt Message</Text>
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            autoFocus={true}
            placeholder="Type here..."
          />
          <Button title="Cancel" onPress={closePrompt} />
          <Button title="OK" onPress={handleConfirm} />
        </View>
      </Modal>
      <Button title="Open Prompt" onPress={openPrompt} />
    </View>
  );
};

export default TextInputModal;