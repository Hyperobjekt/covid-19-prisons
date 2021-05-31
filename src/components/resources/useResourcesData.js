import { useStaticQuery, graphql } from "gatsby"

export default function useResourcesData() {
  const { allResources } = useStaticQuery(
    graphql`
      query {
        allResources {
          group(field: category) {
            nodes {
              description
              organization
              links
              category
            }
            fieldValue
          }
        }
      }
    `
  )
  return allResources.group
}
