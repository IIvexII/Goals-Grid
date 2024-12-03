import { View, Text, Pressable } from "react-native";
import { BEIGE_COLOR } from "../constants/colors";
import { cn } from "../lib/utils";

type GoalItemProps = {
  goal: Goal;
  onPress: () => void;
};

export default function GoalItem(props: GoalItemProps) {
  return (
    <Pressable
      android_ripple={{
        color: BEIGE_COLOR,
      }}
      onPress={props.onPress}
      className="py-4 px-6 bg-gray-100 disabled:bg-gray-200"
    >
      <View>
        <Text
          className={cn("text-base", props.goal.isCompleted && "line-through")}
        >
          {props.goal.text}
        </Text>
      </View>
    </Pressable>
  );
}
