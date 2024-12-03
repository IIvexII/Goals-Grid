import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import "../styles/global.css";
import { cn } from "../lib/utils";

export default function App() {
  const [goalText, setGoalText] = useState("");
  const [goals, setGoals] = useState<string[]>([]);

  function goalInputHandler(text: string) {
    setGoalText(text);
  }

  function addGoal() {
    if (goalText.length === 0)
      return Alert.alert("Empty", "Goal cannot be empty!");
    setGoals((prevGoals) => [goalText, ...prevGoals]);
    setGoalText("");
  }

  return (
    <View className="flex-1 px-8 mt-12">
      <View className="flex-1 flex-row justify-between items-center gap-2 border-b border-b-red-950">
        <TextInput
          className="flex-1 border rounded-md"
          placeholder="Your Goals will be here..."
          onChangeText={goalInputHandler}
          value={goalText}
        />
        <Button title="Set goal" onPress={addGoal} />
      </View>
      <View className="flex-[6] gap-2 mt-8">
        {goals.map((goal, index) => (
          <View
            className={cn(
              "text-lg border border-gray-200 rounded-lg px-6 py-2",
              index % 2 ? "bg-red-100" : "bg-green-100"
            )}
          >
            <Text className="">{goal}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
