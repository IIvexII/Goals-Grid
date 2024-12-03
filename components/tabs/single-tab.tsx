import { Text, Pressable } from "react-native";

import { WHITE_COLOR } from "../../constants/colors";
import { cn } from "../../lib/utils";

type SingleTabProps = {
  text: string;
  count: number;
  isSelected: boolean;
  onPress: () => void;
};

export default function SingleTab(props: SingleTabProps) {
  return (
    <Pressable
      android_ripple={{ color: WHITE_COLOR }}
      className={cn(
        "bg-gray-200 px-4 py-2 flex-row justify-center gap-1 rounded-lg self-center",
        props.isSelected && "bg-black"
      )}
      onPress={props.onPress}
    >
      <Text className={cn(props.isSelected && "text-white")}>{props.text}</Text>
      <Text
        className={cn("font-bold text-xs", props.isSelected && "text-white")}
      >
        ({props.count})
      </Text>
    </Pressable>
  );
}
