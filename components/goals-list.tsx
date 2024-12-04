// import { FlatList } from "react-native";
// import { useMemo, useState } from "react";
// import GoalItem from "./goal-item";
// import Tabs from "./tabs";

// type GoalListProps = {
//   goals: Goal[];
//   onPress: (goalId: string) => void;
// };

// export default function GoalsList(props: GoalListProps) {
//   const [selectTab, setSelectedTab] = useState<Tab>("All");

//   const filterGoalsByTab = (tab: Tab) => {
//     return props.goals
//       .filter((goal) => {
//         if (tab === "All") return true;
//         if (tab === "Working") return !goal.isCompleted;
//         if (tab === "Completed") return goal.isCompleted;
//       })
//       .sort((a, b) => {
//         if (a.isCompleted && !b.isCompleted) return 1;
//         if (!a.isCompleted && b.isCompleted) return -1;
//         return 0;
//       });
//   };

//   const allGoals = useMemo(() => filterGoalsByTab("All"), [props.goals]);
//   const workingGoals = useMemo(
//     () => filterGoalsByTab("Working"),
//     [props.goals]
//   );
//   const completedGoals = useMemo(
//     () => filterGoalsByTab("Completed"),
//     [props.goals]
//   );

//   const getGoals = () => {
//     if (selectTab === "All") return allGoals;
//     if (selectTab === "Working") return workingGoals;
//     if (selectTab === "Completed") return completedGoals;
//   };

//   return (
//     <>
//       {/* tabs of goals categories */}
//       <Tabs
//         goals={props.goals}
//         selectedTab={selectTab}
//         onSelectTab={(tab: Tab) => setSelectedTab(tab)}
//       />

//       <FlatList
//         data={getGoals()}
//         renderItem={({ item }) => (
//           <GoalItem goal={item} onPress={props.onPress.bind(null, item.id)} />
//         )}
//         keyExtractor={(item) => item.id}
//         className="flex-[12] rounded-xl"
//       />
//     </>
//   );
// }

import { FlatList } from "react-native";
import { useCallback, useMemo, useState } from "react";
import GoalItem from "./goal-item";
import Tabs from "./tabs";
import { useOptimistic } from "../hooks/useOptimistic";

type Tab = "All" | "Working" | "Completed";

type Goal = {
  id: string;
  text: string;
  isCompleted: boolean;
};

type GoalListProps = {
  goals: Goal[];
  onPress: (goalId: string) => void;
};

export default function GoalsList({ goals, onPress }: GoalListProps) {
  const [selectedTab, setSelectedTab] = useState<Tab>("All");

  // Using our custom optimistic hook
  const [optimisticGoals, addOptimisticGoal] = useOptimistic<Goal[], Goal>(
    goals,
    (state, newGoal) =>
      state.map((goal) => (goal.id === newGoal.id ? newGoal : goal))
  );

  // Memoized filter function
  const filterGoalsByTab = useCallback((goals: Goal[], tab: Tab) => {
    return goals
      .filter((goal) => {
        switch (tab) {
          case "All":
            return true;
          case "Working":
            return !goal.isCompleted;
          case "Completed":
            return goal.isCompleted;
          default:
            return true;
        }
      })
      .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
  }, []);

  // Memoized filtered goals
  const filteredGoals = useMemo(
    () => filterGoalsByTab(optimisticGoals, selectedTab),
    [optimisticGoals, selectedTab, filterGoalsByTab]
  );

  // Optimistic goal update handler
  const handleGoalPress = useCallback(
    (goalId: string) => {
      const goalToUpdate = optimisticGoals.find((g) => g.id === goalId);
      if (goalToUpdate) {
        // Optimistically update the goal
        addOptimisticGoal({
          ...goalToUpdate,
          isCompleted: !goalToUpdate.isCompleted,
        });
        // Trigger the actual update
        onPress(goalId);
      }
    },
    [optimisticGoals, onPress, addOptimisticGoal]
  );

  // Memoized tab stats
  const tabStats = useMemo(
    () => ({
      all: optimisticGoals.length,
      working: optimisticGoals.filter((g) => !g.isCompleted).length,
      completed: optimisticGoals.filter((g) => g.isCompleted).length,
    }),
    [optimisticGoals]
  );

  const renderGoalItem = useCallback(
    ({ item }: { item: Goal }) => (
      <GoalItem goal={item} onPress={() => handleGoalPress(item.id)} />
    ),
    [handleGoalPress]
  );

  return (
    <>
      <Tabs
        goals={optimisticGoals}
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
        stats={tabStats}
      />

      <FlatList
        data={filteredGoals}
        renderItem={renderGoalItem}
        keyExtractor={useCallback((item: Goal) => item.id, [])}
        className="flex-[12] rounded-xl"
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={10}
      />
    </>
  );
}
