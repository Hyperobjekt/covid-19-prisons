import create from "zustand";
import { METRICS, GROUPS } from "../../common/constants";

// grab first group (residents)
const group = Object.keys(GROUPS)[0];
const metric = METRICS[group];

const useTimeSeriesStore = create((set, get) => ({
  selectedMetric: metric,
  setMetric: (selectedMetric) => set({ selectedMetric }),
  selectedGroup: group,
  setMetric: (selectedGroup) => set({ selectedGroup }),

  selectedFacilities: [],
  setSelectedFacilities: (selectedFacilities) => set({ selectedFacilities }),
  loadedStates: [],
  // setLoadedStates: (loadedStates) => set({ loadedStates }),
  loadedStateDataMap: {},
  // setLoadedStateDataMap: (loadedStateDataMap) => set({ loadedStateDataMap }),
  setLoaded: (state, loadedStateDataMap) =>
    set({
      loadedStates: [...get().loadedStates, state],
      loadedStateDataMap,
    }),

  // parsedFacilities: [],
  parsedFacilityMap: {},
  setParsedFacilityMap: (parsedFacilityMap) => set({ parsedFacilityMap }),
  // setParsed: (facility, parsedFacilityMap) =>
  //   set({
  //     parsedFacilities: [...get().parsedFacilities, facility],
  //     parsedFacilityMap,
  //   }),
}));

export default useTimeSeriesStore;
