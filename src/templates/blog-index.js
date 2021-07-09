import React from "react";
import PageTemplate from "gatsby-theme-hypercore/src/templates/page";
import { graphql } from "gatsby";
import { createStyles, makeStyles } from "@material-ui/core";
import { getImage } from "gatsby-plugin-image";
/**
 * Takes the data post object and maps it to <Post /> props
 */
export const postDataToProps = (post) => {
  if (!post || !post.frontmatter) return {};
  // grab attributes from post frontmatter
  const {
    date,
    name: title,
    description,
    image,
    category,
    path,
    meta,
  } = post.frontmatter;
  // check if path is set in the frontmatter, use that as the URL
  // otherwise use the auto-generated slug
  const url = path || post.slug;
  // make sure we use an absolute path for proper linking (e.g. "/blog/my-post" instead of "blog/my-post")
  const absoluteUrl = url[0] === "/" ? url : "/" + url;
  // pull author info if it exists
  const author = meta && meta.author;
  return {
    date,
    title,
    description,
    author,
    category,
    image: image && getImage(image),
    url: absoluteUrl,
  };
};

const useStyles = makeStyles((theme) =>
  createStyles({
    "@global": {
      ".HypMain-root": {
        background: theme.palette.background.paper,
      },
    },
  })
);

export default function BlogIndexTemplate(props) {
  useStyles();
  const postsData =
    props.data.allMdx.nodes.map((node) => {
      node.frontmatter.path = node.frontmatter.path || node.slug;
      return node;
    }) || [];
  const featuredPost = postsData.find((p) => p.frontmatter?.featured) || {};
  const otherPosts = postsData
    .filter((p) => p.id !== featuredPost.id)
    .map(postDataToProps);
  return (
    <PageTemplate
      featuredPost={postDataToProps(featuredPost)}
      posts={otherPosts}
      {...props}
    />
  );
}

export const pageQuery = graphql`
  query BlogIndexQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
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
      }
    }
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { category: { eq: "blog" } } }
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
`;
