import React from "react"
import { default as CoreHelmet } from "gatsby-theme-hyperobjekt-core/src/components/helmet"

/**
 * Add custom fonts to the helmet
 */
const Helmet = (props) => {
  return (
    <CoreHelmet {...props}>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cloud.typography.com/6135894/6886832/css/fonts.css"
      />
    </CoreHelmet>
  )
}

export default Helmet
