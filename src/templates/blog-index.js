import React from "react";
import PageTemplate from "gatsby-theme-hypercore/src/templates/page";
import { graphql } from "gatsby";
// const useStyles = makeStyles((theme) =>
//   createStyles({
//     "@global": {

//     },
//   })
// );

// const useStyles = makeStyles((theme) => ());

export default function BlogIndexTemplate(props) {
  // useStyles();
  const postsData = props.data.allMdx.nodes || [];
  const featuredPost = postsData.find((p) => p.frontmatter?.featured) || {};
  const otherPosts = postsData.filter((p) => p.id !== featuredPost.id);
  return (
    <PageTemplate featuredPost={featuredPost} posts={otherPosts} {...props} />
  );
}

// const BlogIndex = () => {
//   const classes = useStyles();
//   return (
//     <Layout className={classes.layout}>
//       <div className={classes.featuredSection}>
//         <h2 className={classes.sectionTitle}>featured post</h2>
//         <BlogPost post={featuredPost} isFeatured={true} />
//       </div>

//       <div className={classes.recentSection}>
//         <h2 className={classes.sectionTitle}>recent posts</h2>
//         {posts.map((p, idx) => (
//           <BlogPost post={p} key={p.frontmatter.path} />
//         ))}
//       </div>
//     </Layout>
//   );
// };

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
      filter: { frontmatter: { template: { eq: "blog" } } }
    ) {
      nodes {
        id
        frontmatter {
          featured
          description
          title
          path
          date
        }
      }
    }
  }
`;
