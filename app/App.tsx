import { useState } from "react";
import { Alert, FlatList, Image, ScrollView, Text, View } from "react-native";

import GoalItem from "../components/goal-item";
import GoalInput from "../components/goal-input";
import Button from "../components/button";

import { GOALS } from "../data/goals";

import { StatusBar } from "expo-status-bar";
import { WHITE_COLOR } from "../constants/colors";
import { GOAL_IMAGE } from "../constants/images";

import "../styles/global.css";
import Tabs from "../components/tabs";
import GoalsList from "../components/goals-list";

export default function App() {
  const [goals, setGoals] = useState<Goal[]>(GOALS);
  const [visible, setVisible] = useState(false);

  function addGoalHandler(goal: string) {
    if (goal.length === 0) return Alert.alert("Empty", "Goal cannot be empty!");

    // set the new goal to the top of the list
    setGoals((prevGoals) => [
      { id: Math.random().toString(), text: goal, isCompleted: false },
      ...prevGoals,
    ]);
  }

  function pressHandler(goalId: string) {
    // find previous goal
    const goal = goals.find((goal) => goal.id === goalId);

    if (!goal) return;

    // update the goal
    const newGoal = { ...goal, isCompleted: !goal.isCompleted };

    setGoals((prevGoals) => {
      const newGoals = [...prevGoals]; // copy the goals
      const index = newGoals.findIndex((goal) => goal.id === goalId); // find the index of the goal

      newGoals[index] = newGoal;

      return newGoals;
    });
  }

  function closeModelHandler() {
    setVisible(false);
  }

  return (
    <>
      <View className="flex-1 bg-white px-8 pt-12">
        {/* Header */}
        <View className="flex-[3]">
          <View className="flex-row justify-center items-center gap-1">
            <View className="flex-1">
              <Text className="text-base text-gray-500">Welcome Back</Text>
              <Text className="text-2xl">Zafeer Hafeez</Text>
            </View>
            <Image
              source={GOAL_IMAGE}
              style={{ tintColor: "black" }}
              resizeMode="contain"
              className="w-14 h-14"
            />
          </View>

          {/* Add Goal Button */}
          <View className="mt-4 gap-2">
            <Text className="text-xl italic font-light">
              <Text className="text-2xl">“</Text>Goals are dreams with
              deadlines.
              <Text className="text-2xl">”</Text>
            </Text>
            <Button title="Add New Goal" onPress={() => setVisible(true)} />
          </View>
        </View>

        {/* List of Goals */}
        <GoalsList goals={goals} onPress={pressHandler} />

        {/* modal */}
        <GoalInput
          visible={visible}
          onCancel={closeModelHandler}
          onGoalAdd={addGoalHandler}
        />
      </View>

      <StatusBar backgroundColor={WHITE_COLOR} style="dark" />
    </>
  );
}
