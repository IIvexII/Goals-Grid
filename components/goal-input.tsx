import { useState } from "react";
import { TextInput, Button } from "react-native";

type GoalInputProps = {
  onPress: (text: string) => void;
};

export default function GoalInput(props: GoalInputProps) {
  const [goalText, setGoalText] = useState("");

  return (
    <>
      <TextInput
        className="flex-1 p-2 border border-gray-200 rounded-lg placeholder:text-gray-500"
        placeholder="Your Goals will be here..."
        onChangeText={(text) => setGoalText(text)}
      />
      <Button title="Set goal" onPress={() => props.onPress(goalText)} />
    </>
  );
}
