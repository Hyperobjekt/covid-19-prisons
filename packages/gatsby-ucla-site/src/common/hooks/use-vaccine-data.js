import { useStaticQuery, graphql } from "gatsby"
import { useMemo } from "react"
import { getLang } from "../utils/i18n"


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
    const total = {
      isState: false,
      jurisdiction: getLang("total"),
      residents: { vadmin: 0 },
      staff: { vadmin: 0 },
    }
    const filtered = nodes.filter((n) => {
      if (!n.residents.vadmin && !n.staff.vadmin) {
        return
      }
      total.residents.vadmin += n.residents.vadmin || 0
      total.staff.vadmin += n.staff.vadmin || 0
      return true
    })

    return [...filtered, total]
  }, [nodes])
}
