import { View, ScrollView } from "react-native";
import SingleTab from "./single-tab";
import { useEffect, useState } from "react";

type TabsProps = {
  goals: Goal[];
  selectedTab: Tab;
  onSelectTab: (tab: Tab) => void;
};
type TabCounts = {
  [key: string]: number;
};

const tabs: Tab[] = ["All", "Working", "Completed"];
export default function Tabs(props: TabsProps) {
  const [counts, setCounts] = useState<TabCounts>(calculateCount());

  useEffect(() => {
    setCounts(calculateCount());
  }, [props.goals]);

  function calculateCount() {
    const newCounts = {
      All: props.goals.length,
      Working: props.goals.filter((goal) => !goal.isCompleted).length,
      Completed: props.goals.filter((goal) => goal.isCompleted).length,
    };

    return newCounts;
  }

  return (
    <ScrollView horizontal centerContent className="flex-2">
      <View className="flex-row gap-4">
        {tabs.map((tab) => (
          <SingleTab
            key={tab}
            text={tab}
            count={counts[tab]}
            onPress={props.onSelectTab.bind(null, tab)}
            isSelected={props.selectedTab === tab}
          />
        ))}
      </View>
    </ScrollView>
  );
}
