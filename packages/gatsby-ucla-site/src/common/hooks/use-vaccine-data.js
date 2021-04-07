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
            isFederal
            isIce
            residents {
              initiated
            }
            staff {
              initiated
            }
          }
        }
      }
    `
  )

  return useMemo(() => {
    const total = {
      isState: false,
      isTotal: true,
      jurisdiction: getLang("total"),
      residents: { initiated: 0 },
      staff: { initiated: 0 },
    }
    const filtered = nodes.filter((n) => {
      if (!n.residents.initiated && !n.staff.initiated) {
        return false
      }
      total.residents.initiated += n.residents.initiated || 0
      total.staff.initiated += n.staff.initiated || 0
      return true
    })

    return [...filtered, total]
  }, [nodes])
}
