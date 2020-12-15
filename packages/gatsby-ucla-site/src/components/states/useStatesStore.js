import create from "zustand"
import { GROUPS } from "../../common/constants"

/**
 * Store for state information releative to the "states" pages
 */
const useStatesStore = create((set) => ({
  stateName: null,
  setStateName: (stateName) => set({ stateName }),
  data: null,
  setData: (data) => set({ data }),
  content: null,
  setContent: (content) => set({ content }),
  currentStep: null,
  setCurrentStep: (currentStep) => set({ currentStep }),
  facilitiesGroup: GROUPS[0],
  setFacilitiesGroup: (facilitiesGroup) => set({ facilitiesGroup }),
  hoveredMarker: null,
  setHoveredMarker: (hoveredMarker) => set({ hoveredMarker }),
  hoveredFacility: null,
  setHoveredFacility: (hoveredFacility) => set({ hoveredFacility }),
}))

export default useStatesStore
