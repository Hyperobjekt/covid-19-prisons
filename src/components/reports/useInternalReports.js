import { useStaticQuery, graphql } from "gatsby";

export default function useInternalReports() {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx(
          filter: {
            frontmatter: { draft: { ne: true }, category: { eq: "report" } }
          }
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
  return allMdx.nodes.map((node) => {
    const url = node.frontmatter.path || node.slug;
    const absoluteUrl = url[0] === "/" ? url : "/" + url;
    return {
      author: node.frontmatter.meta.author,
      description: node.frontmatter.description,
      title: node.frontmatter.name,
      url: absoluteUrl,
      date: node.frontmatter.date,
    };
  });
}
