import { useStaticQuery, graphql } from "gatsby"
import { useMemo } from "react"
import { typeSelector } from "../utils"
import useOptionsStore from "./use-options-store"

export default function useFacilitiesData() {
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
              tested
            }
          }
        }
      }
    `
  )
  const selectedCategories = useOptionsStore(
    (state) => state.selectedCategories
  )
  return useMemo(
    () =>
      nodes.filter((d) => {
        return selectedCategories.indexOf(typeSelector(d)) > -1
      }),
    [nodes, selectedCategories]
  )
}
