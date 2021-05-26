import React from "react"
import PropTypes from "prop-types"
import MDX from "mdx-scoped-runtime"
import mdxComponents from "gatsby-theme-hyperobjekt-core/src/components/mdx"
const MDXPreview = ({ entry }) => {
  const { Hero, SEO, ...components } = mdxComponents
  return (
    <MDX components={components} scope={{ Hero, SEO }}>
      {entry.getIn(["data", "body"])}
    </MDX>
  )
}

MDXPreview.propTypes = {
  entry: PropTypes.object.isRequired,
}

export default MDXPreview
