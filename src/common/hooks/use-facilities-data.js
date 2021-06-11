import { useStaticQuery, graphql } from "gatsby"
import { useMemo } from "react"
import { typeSelector } from "../utils"
import useOptionsStore from "./use-options-store"

export default function useFacilitiesData(categories, selectedRegion) {
  const {
    allFacilities: { nodes },
  } = useStaticQuery(
    graphql`
      query {
        allFacilities {
          nodes {
            id
            name
            city
            state
            jurisdiction
            coords
            iceFieldOffice
            residents {
              confirmed
              deaths
              active
              confirmed_rate
              deaths_rate
              active_rate
              tested
              tested_rate
              population
            }
            staff {
              confirmed
              deaths
              active
            }
          }
        }
      }
    `
  )
  const selectedCategories = useOptionsStore(
    (state) => state.selectedCategories
  )
  const desiredCategories = categories || selectedCategories
  return useMemo(
    () =>
      nodes.filter((d) => {
        if (selectedRegion && d.iceFieldOffice !== selectedRegion) {
          return false
        }

        return desiredCategories.indexOf(typeSelector(d)) > -1
      }),
    [nodes, desiredCategories, selectedRegion]
  )
}
