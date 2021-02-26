import { useMemo } from "react"
import useFacilitiesData from "./use-facilities-data"

const vaccineFieldMap = {
  residents: ["initiated", "completed", "vadmin"],
  staff: ["initiated", "completed", "vadmin"],
}
const vaccineFieldMapGroups = Object.keys(vaccineFieldMap)

export default function useVaccineData() {
  const data = useFacilitiesData()
  return useMemo(() => {
    /*
     * If we have statewide vaccination data for a state, use that.
     * Otherwise, if we have facility-level vax data, aggregate that.
     */

    const relevantFacilitiesMap = {}
    const statewideData = data.filter((d) => {
      const containsRelevantData = vaccineFieldMapGroups.some((group) => {
        return vaccineFieldMap[group].some((field) => d[group][field])
      })

      const statewideDataExists = relevantFacilitiesMap[d.state] === null
      if (!containsRelevantData || statewideDataExists) {
        return false
      } else if (d.name === "Statewide") {
        // overwrite facilities found before, and prevent others from being collected
        relevantFacilitiesMap[d.state] = null
        return true
      } else {
        relevantFacilitiesMap[d.state] = relevantFacilitiesMap[d.state] || []
        relevantFacilitiesMap[d.state].push(d)
        return false
      }
    })

    const aggregatedFacilityData = Object.keys(relevantFacilitiesMap)
      .filter((state) => !!relevantFacilitiesMap[state])
      .map((state) => {
        const aggregate = { state, name: "Statewide", jurisdiction: "state" }
        const facilities = relevantFacilitiesMap[state]
        vaccineFieldMapGroups.forEach((group) => {
          aggregate[group] = {}

          vaccineFieldMap[group].forEach((field) => {
            aggregate[group][field] = null

            facilities.forEach((fac) => {
              const val = fac[group][field]
              if (val) {
                aggregate[group][field] = aggregate[group][field] || 0
                aggregate[group][field] += val
              }
            })
          })
        })

        return aggregate
      })

    return [...statewideData, ...aggregatedFacilityData]
  }, [data])
}
