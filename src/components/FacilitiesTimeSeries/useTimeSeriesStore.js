import create from "zustand";

const useTimeSeriesStore = create((set, get) => ({
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
