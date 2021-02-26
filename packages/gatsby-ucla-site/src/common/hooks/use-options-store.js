import create from "zustand"
import {
  METRICS,
  JURISDICTIONS,
  JURISDICTION_COLORS,
  JURISDICTION_GRADIENTS,
} from "../constants"

// grab first group (residents)
const metricGroup = Object.keys(METRICS)[0]

const useOptionsStore = create((set) => ({
  metric: METRICS[metricGroup][0],
  metrics: METRICS[metricGroup],
  iceRegionId: null,
  categories: JURISDICTIONS,
  selectedCategories: JURISDICTIONS,
  categoryColors: JURISDICTION_COLORS,
  categoryGradients: JURISDICTION_GRADIENTS,
  setMetric: (metric) => set({ metric }),
  setIceRegionId: (iceRegionId) => set({ iceRegionId }),
  setMetrics: (options) => set({ options }),
  setCategories: (categories) => set({ categories }),
  setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
}))

export default useOptionsStore
