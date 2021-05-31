import React from "react";
import { graphql } from "gatsby";
import { getMdxProps } from "gatsby-theme-hypercore/src/templates/page";
import { getImage } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "gatsby-theme-hypersite/src/layout";
import { Block } from "@hyperobjekt/material-ui-website";

const BlogPostTemplate = (props) => {
  const { mdx, allMdx } = props.data;
  const { image } = mdx.frontmatter;
  const featuredImage = image && getImage(image);

  const postNode = allMdx.edges.find((edge) => edge.node.id === mdx.id);
  const { body, ...mdxProps } = getMdxProps(props);
  return (
    <Layout {...mdxProps} {...props}>
      {body && (
        <Block>
          <MDXRenderer>{body}</MDXRenderer>
        </Block>
      )}
    </Layout>
  );
};
export default BlogPostTemplate;

export const query = graphql`
  query ($pathSlug: String!) {
    # get post itself (could instead pull this data off allMdx node by path === $pathSlug)
    mdx(frontmatter: { path: { eq: $pathSlug } }) {
      id
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
        author
        date
        title
        image {
          childImageSharp {
            gatsbyImageData(
              transformOptions: { fit: COVER, cropFocus: CENTER }
              width: 1200
              height: 630
            )
          }
        }
        path
      }
      body
    }
    # get all posts to connect the next/prev
    allMdx(
      sort: { fields: frontmatter___date, order: ASC }
      filter: { frontmatter: { isBlogPost: { eq: true } } }
    ) {
      edges {
        node {
          id
        }
        next {
          frontmatter {
            title
            description
            path
          }
        }
        previous {
          frontmatter {
            title
            description
            path
          }
        }
      }
    }
  }
`;
