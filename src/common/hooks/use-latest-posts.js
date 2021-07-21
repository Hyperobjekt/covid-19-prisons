import { useStaticQuery, graphql } from "gatsby";
import { useMemo } from "react";
import { postDataToProps } from "../../components/blog";

export default function useLatestPosts() {
  const { allMdx } = useStaticQuery(
    graphql`
      query MyQuery {
        allMdx(
          filter: { frontmatter: { category: { in: ["blog", "report"] } } }
          sort: { order: DESC, fields: frontmatter___date }
        ) {
          nodes {
            id
            slug
            frontmatter {
              meta {
                author
              }
              featured
              description
              name
              path
              date
            }
          }
        }
      }
    `
  );

  if (!allMdx || !allMdx.nodes) return [];
  return allMdx.nodes.map(postDataToProps);
}
