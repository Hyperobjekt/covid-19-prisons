import { useStaticQuery, graphql } from "gatsby"

export default function useScorecardData() {
  const {
    allScorecard: { nodes },
  } = useStaticQuery(
    graphql`
      query {
        allScorecard {
          nodes {
            score
            machine
            regularly
            history
            defined
            cases_residents
            deaths_residents
            active_residents
            tests_residents
            population_residents
            cases_staff
            deaths_staff
            tests_staff
          }
        }
      }
    `
  )
  return nodes
}
