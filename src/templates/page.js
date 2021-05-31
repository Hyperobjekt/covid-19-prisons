import React from "react";
import { graphql } from "gatsby";
import { getMdxProps } from "gatsby-theme-hypercore/src/templates/page";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "gatsby-theme-hypersite/src/layout";
import { Block } from "@hyperobjekt/material-ui-website";
import { withStyles } from "@material-ui/core";

/** base content page block wrapper */
const Content = withStyles((theme) => ({
  root: {
    margin: "auto",
    padding: 0,
    paddingBottom: theme.spacing(6),
    maxWidth: `41.5rem`,
    "& .MuiTypography-root": {
      marginBottom: `1rem`,
      "& + .MuiList-root": {
        marginTop: 0,
      },
    },
    "& .MuiList-root .MuiTypography-root": {
      marginBottom: `0.5rem`,
    },
    "& h1,h2,h3,h4,h5,h6": {
      marginTop: `1rem`,
    },
    "& a": {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
  },
}))(Block);

const PageTemplate = (props) => {
  const { body, ...mdxProps } = getMdxProps(props);
  return (
    <Layout {...mdxProps} {...props}>
      {body && (
        <Content>
          <MDXRenderer {...mdxProps} {...props}>
            {body}
          </MDXRenderer>
        </Content>
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
