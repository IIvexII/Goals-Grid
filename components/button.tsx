import { Text, Pressable } from "react-native";
import { cn } from "../lib/utils";

type ButtonProps = {
  onPress: () => void;
  title: string;
  textStyle?: string;
  containerStyle?: string;
};

export default function Button(props: ButtonProps) {
  return (
    <Pressable
      className={cn("bg-beige p-4 rounded-xl", props.containerStyle)}
      onPress={props.onPress}
    >
      <Text
        className={cn("text-lg text-center font-semibold", props.textStyle)}
      >
        {props.title}
      </Text>
    </Pressable>
  );
}
