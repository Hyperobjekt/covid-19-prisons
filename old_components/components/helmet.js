import React from "react"
import { Helmet } from "react-helmet"
/**
 * Add custom fonts to the helmet
 */
const NewHelmet = (props) => {
  return (
    <Helmet {...props}>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cloud.typography.com/6135894/6886832/css/fonts.css"
      />
    </Helmet>
  )
}

export default NewHelmet
