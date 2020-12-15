import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { fade, Typography, withStyles } from "@material-ui/core"
import MetricSelection from "./MetricSelection"
import { serifTypography } from "../../gatsby-theme-hyperobjekt-core/theme"

const styles = (theme) => ({
  root: {
    marginTop: 0,
    "& .MuiButtonBase-root": {
      ...serifTypography,
      fontWeight: 700,
      fontSize: theme.typography.pxToRem(26),
      color: theme.palette.secondary.main,
      textTransform: "lowercase",
      border: `2px dotted transparent`,
      borderBottomColor: fade(theme.palette.text.secondary, 0.333),
      borderRadius: 5,
      position: "relative",
      top: "-0.15rem",
    },
  },
})

const MetricSelectionTitle = ({
  classes,
  className,
  title,
  group,
  ...props
}) => {
  // inject metric selection onto title
  const titleParts = title.split("${metric}")
  const titleArray =
    titleParts.length === 2
      ? [titleParts[0], <MetricSelection group={group} />, titleParts[1]]
      : [...titleParts, <MetricSelection group={group} />]

  return (
    <Typography
      className={clsx(classes.root, className)}
      variant="h3"
      {...props}
    >
      {titleArray.map((t, i) => (
        <React.Fragment key={i}>{t}</React.Fragment>
      ))}
    </Typography>
  )
}

MetricSelectionTitle.propTypes = {}

export default withStyles(styles)(MetricSelectionTitle)
