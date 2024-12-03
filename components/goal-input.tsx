import { useEffect, useRef, useState } from "react";
import { TextInput, View, Text, Dimensions } from "react-native";
import Button from "./button";
import { ActionSheetRef } from "react-native-actions-sheet";
import ActionSheet from "react-native-actions-sheet";
import { BEIGE_COLOR } from "../constants/colors";

type GoalInputProps = {
  visible: boolean;
  onGoalAdd: (text: string) => void;
  onCancel: () => void;
};

export default function GoalInput(props: GoalInputProps) {
  const [text, setText] = useState("");
  const actionSheetRef = useRef<ActionSheetRef>(null);

  function pressHandler() {
    props.onGoalAdd(text);
    setText("");

    // close the modal
    props.onCancel();
  }

  useEffect(() => {
    if (props.visible) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
    }
  }, [props.visible]);

  return (
    <ActionSheet
      ref={actionSheetRef}
      onClose={props.onCancel}
      containerStyle={{
        backgroundColor: BEIGE_COLOR,
      }}
      gestureEnabled={true}
    >
      <View className="mt-6 px-6 pb-16 gap-4 bg-beige rounded-t-xl">
        <View className="flex-row justify-start items-center  ">
          <Text className="text-2xl flex-1">Create New Goal</Text>
          <Button
            title="Set goal"
            onPress={pressHandler}
            containerStyle="bg-black py-2 px-8 justify-center"
            textStyle="font-normal text-white"
          />
        </View>
        <TextInput
          className="w-full p-4 bg-white border border-gray-200 rounded-lg placeholder:text-gray-700 mb-2"
          placeholder="Your Goals will be here..."
          onChangeText={(text) => setText(text)}
          value={text}
          autoFocus
        />
      </View>
    </ActionSheet>
  );
}
