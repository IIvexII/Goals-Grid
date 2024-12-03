import { useState } from "react";
import { Alert, Button, FlatList, Text, TextInput, View } from "react-native";
import "../styles/global.css";
import GoalItem from "../components/goal-item";
import GoalInput from "../components/goal-input";

export default function App() {
  const [goals, setGoals] = useState<Goal[]>([]);

  function addGoal(goal: string) {
    if (goal.length === 0) return Alert.alert("Empty", "Goal cannot be empty!");

    // set the new goal to the top of the list
    setGoals((prevGoals) => [
      { id: Math.random().toString(), text: goal },
      ...prevGoals,
    ]);
  }

  return (
    <View className="flex-1 px-8 mt-12">
      <View className="flex-1 flex-row justify-between items-center gap-2 border-b border-b-red-950">
        <GoalInput onPress={addGoal} />
      </View>
      <FlatList
        data={goals}
        renderItem={({ item }) => <GoalItem text={item.text} />}
        keyExtractor={(item) => item.id}
        className="flex-[6] gap-2 mt-8"
      />
    </View>
  );
}
