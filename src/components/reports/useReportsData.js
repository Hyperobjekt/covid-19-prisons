import { useStaticQuery, graphql } from "gatsby";

export default function useReportsData() {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx(filter: { frontmatter: { pagetype: { eq: "reports" } } }) {
          nodes {
            frontmatter {
              reportsData {
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
  );
  return allMdx.nodes[0].frontmatter.reportsData;
}
