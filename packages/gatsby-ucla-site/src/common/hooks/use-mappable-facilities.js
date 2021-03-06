import { useMemo } from "react"
import useFacilitiesData from "./use-facilities-data"
import { isNumber } from "../utils/selectors"
export default function useMappableFacilities(categories, selectedRegion) {
  const data = useFacilitiesData(categories, selectedRegion)
  return useMemo(
    () => data.filter((d) => isNumber(d.coords[0]) && isNumber(d.coords[1])),
    [data]
  )
}
