import { useStaticQuery, graphql } from "gatsby"

export default function useResourcesData() {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx(filter: { slug: { eq: "reports" } }) {
          nodes {
            frontmatter {
              reports {
                date
                description
                url
                author
                title
              }
            }
          }
        }
      }
    `
  )
  return allMdx.nodes[0].frontmatter.reports
}
