import { useStaticQuery, graphql } from "gatsby";

export default function useReportsData() {
  const { allDataJson } = useStaticQuery(
    graphql`
      query {
        allDataJson(filter: { id: { eq: "reports" } }) {
          nodes {
            reports {
              author
              description
              title
              url
              date
            }
          }
        }
      }
    `
  );
  return allDataJson.nodes[0].reports || [];
}
