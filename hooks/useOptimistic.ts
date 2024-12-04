import { useCallback, useState } from "react";

export function useOptimistic<TData, TAction>(
  initialData: TData,
  updateFn: (state: TData, action: TAction) => TData
): [TData, (action: TAction) => void] {
  const [optimisticState, setOptimisticState] = useState<TData>(initialData);

  // Update effect when initialData changes
  if (JSON.stringify(initialData) !== JSON.stringify(optimisticState)) {
    setOptimisticState(initialData);
  }

  const addOptimisticUpdate = useCallback(
    (action: TAction) => {
      setOptimisticState((currentState) => updateFn(currentState, action));
    },
    [updateFn]
  );

  return [optimisticState, addOptimisticUpdate];
}
