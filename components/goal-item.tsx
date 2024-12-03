import { View, Text } from "react-native";

export default function GoalItem({ text }: { text: string }) {
  return (
    <View className="border border-gray-200 rounded-lg px-6 py-2 my-1 bg-purple-700">
      <Text className="text-white font-bold text-lg">{text}</Text>
    </View>
  );
}
