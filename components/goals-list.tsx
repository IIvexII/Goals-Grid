import { FlatList } from "react-native";
import { useState } from "react";
import GoalItem from "./goal-item";
import Tabs from "./tabs";

type GoalListProps = {
  goals: Goal[];
  onPress: (goalId: string) => void;
};

export default function GoalsList(props: GoalListProps) {
  const [selectTab, setSelectedTab] = useState<Tab>("All");

  return (
    <>
      {/* tabs of goals categories */}
      <Tabs
        goals={props.goals}
        selectedTab={selectTab}
        onSelectTab={(tab: Tab) => setSelectedTab(tab)}
      />

      <FlatList
        data={props.goals
          .filter((goal) => {
            if (selectTab === "All") return true;
            if (selectTab === "Working") return !goal.isCompleted;
            if (selectTab === "Completed") return goal.isCompleted;
          })
          .sort((a, b) => {
            if (a.isCompleted && !b.isCompleted) return 1;
            if (!a.isCompleted && b.isCompleted) return -1;
            return 0;
          })}
        renderItem={({ item }) => (
          <GoalItem goal={item} onPress={props.onPress.bind(null, item.id)} />
        )}
        keyExtractor={(item) => item.id}
        className="flex-[12] rounded-xl"
      />
    </>
  );
}
