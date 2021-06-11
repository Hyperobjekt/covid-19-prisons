import create from "zustand";

const useTimeSeriesStore = create((set, get) => ({
  selectedFacilities: [],
  setSelectedFacilities: (selectedFacilities) => set({ selectedFacilities }),
  loadedStates: [],
  // setLoadedStates: (loadedStates) => set({ loadedStates }),
  // loadedDataMap: [],
  // setLoadedDataMap: (loadedDataMap) => set({ loadedDataMap }),
  setLoaded: (state, loadedDataMap) =>
    set({ loadedStates: [...get().loadedStates, state], loadedDataMap }),
}));

export default useTimeSeriesStore;
