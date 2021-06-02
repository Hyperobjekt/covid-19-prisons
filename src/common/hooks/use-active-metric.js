import useOptionsStore from "./use-options-store"

export default function useActiveMetric() {
  return useOptionsStore((state) => state.metric)
}
