import React from "react";
import { graphql } from "gatsby";
import { getMdxProps } from "gatsby-theme-hypercore/src/templates/page";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "gatsby-theme-hypersite/src/layout";
import { withStyles } from "@material-ui/core";
import Content from "../components/Content";

/** base content page block wrapper */
const PageContent = withStyles((theme) => ({
  root: {
    margin: "auto",
    padding: 0,
    paddingBottom: theme.spacing(6),
    maxWidth: `41.5rem`,
  },
}))(Content);

const PageTemplate = (props) => {
  const { body, ...mdxProps } = getMdxProps(props);
  return (
    <Layout {...mdxProps} {...props}>
      {body && (
        <PageContent>
          <MDXRenderer {...mdxProps} {...props}>
            {body}
          </MDXRenderer>
        </PageContent>
      )}
    </Layout>
  );
};

export const pageQuery = graphql`
  query UclaPageQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      slug
      timeToRead
      tableOfContents
      wordCount {
        sentences
        words
      }
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
        embeddedImages {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        store {
          key
          value
        }
      }
    }
  }
`;

export default PageTemplate;
