import { useStaticQuery, graphql } from "gatsby"

export default function useBlogPostsData() {
  // const { allMdx } = useStaticQuery(
  //   graphql`
  //     query {
  //       allMdx(
  //         sort: { fields: frontmatter___date, order: DESC }
  //         filter: { frontmatter: { isBlogPost: { eq: true } } }
  //       ) {
  //         nodes {
  //           id
  //           frontmatter {
  //             featured
  //             description
  //             title
  //             path
  //             date
  //           }
  //         }
  //       }
  //     }
  //   `
  // )

  // const postsData = allMdx.nodes || []

  // if (!postsData.length) {
  //   return {}
  // }

  // let { featuredPost, posts } = postsData.reduce(
  //   (accum, post) => {
  //     if (!accum.featuredPost && post.frontmatter.featured) {
  //       // take the first post that's marked as featured (posts sorted by most recent)
  //       accum.featuredPost = post
  //       return accum
  //     } else {
  //       accum.posts.push(post)
  //       return accum
  //     }
  //   },
  //   { featuredPost: null, posts: [] }
  // )

  // if (!featuredPost) {
  //   // none marked as featured... use the most recent one
  //   featuredPost = posts.shift()
  // }
  return { featuredPost: {}, posts: [] }
}
