import React from "react";
import { graphql } from "gatsby";
import PageTemplate from "gatsby-theme-hypercore/src/templates/page";

export const query = graphql`
  query ($pathSlug: String!) {
    mdx(frontmatter: { path: { eq: $pathSlug } }) {
      frontmatter {
        meta {
          title
          description
          keywords
          image {
            childImageSharp {
              gatsbyImageData(
                transformOptions: { fit: COVER, cropFocus: CENTER }
                width: 1200
                height: 630
              )
            }
          }
          isBlogPost
        }
        intro {
          body
          subtitle
          title
        }
        map {
          description
          title
        }
        title
        sponsors {
          title
          logos {
            image
            link
            alt
          }
        }
        table {
          note
          title
        }
        vaccineTable {
          title
          subtitle
        }
      }
      body
    }
  }
`;

/**
 * Use default page template, but provide content prop
 */
const HomeTemplate = (props) => {
  return <PageTemplate {...props} />;
};

export default HomeTemplate;
