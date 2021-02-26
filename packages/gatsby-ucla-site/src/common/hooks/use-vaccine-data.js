import { useMemo } from "react"
import { JURISDICTIONS } from "../constants"
import useFacilitiesData from "./use-facilities-data"

const vaccineFieldMap = {
  residents: ["initiated", "completed", "vadmin"],
  staff: ["initiated", "completed", "vadmin"],
}
const vaccineFieldMapGroups = Object.keys(vaccineFieldMap)

export default function useVaccineData() {
  // get data for all jurisdictions (don't filter with toggles)
  const data = useFacilitiesData(JURISDICTIONS)
  return useMemo(() => {
    /*
     * If we have statewide vaccination data for a state, use that.
     * Otherwise, if we have facility-level vax data, aggregate that.
     */

    const {
      statewideData,
      facilitiesMap
    } = data.reduce((accum, d) => {
      const containsRelevantData = vaccineFieldMapGroups.some((group) => {
        return vaccineFieldMap[group].some((field) => d[group][field])
      })

      const statewideDataExists = accum.facilitiesMap[d.state] === null
      if (!containsRelevantData || statewideDataExists) {
        // prefer statewide data to facility data
        return accum
      } else if (d.name.toLowerCase() === "statewide") {
        // overwrite facilities found before, and prevent others from being collected
        accum.facilitiesMap[d.state] = null
        // use the statewide data
        accum.statewideData.push(d)
        return accum
      } else if (d.name.toLowerCase() === "all bop facilities") {
        const relabeledData = {
          ...d,
          noNavigate: true, // don't attempt to navigate to state page on click
          state: "Federal Bureau of Prisons"
        }
        accum.statewideData.push(relabeledData)
        return accum
      } else if (d.name.toLowerCase() === "all ice facilities") {
        const relabeledData = {
          ...d,
          noNavigate: true, // don't attempt to navigate to state page on click
          state: "U.S. Immigration and Customs Enforcement"
        }
        accum.statewideData.push(relabeledData)
        return accum
      } else {
        // no statewide data (yet), so add facility data to be aggregated
        accum.facilitiesMap[d.state] = accum.facilitiesMap[d.state] || []
        accum.facilitiesMap[d.state].push(d)
        return accum
      }
    }, { statewideData: [], facilitiesMap: {} })

    const aggregatedFacilityData = Object.keys(facilitiesMap)
      .filter((state) => !!facilitiesMap[state])
      .map((state) => {
        const aggregate = { state, name: "Statewide", jurisdiction: "state" }
        const facilities = facilitiesMap[state]
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
