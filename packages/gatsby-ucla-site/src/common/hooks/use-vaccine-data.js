import { useStaticQuery, graphql } from "gatsby"
import { useMemo } from "react"


export default function useVaccineData() {
  const {
    allVaccines: { nodes },
  } = useStaticQuery(
    graphql`
      query {
        allVaccines {
          nodes {
            id
            jurisdiction
            isState
            residents {
              vadmin
            }
            staff {
              vadmin
            }
          }
        }
      }
    `
  )

  return useMemo(() => {
    return nodes.filter((n) => n.residents.vadmin || n.staff.vadmin)
  }, [nodes])
}
