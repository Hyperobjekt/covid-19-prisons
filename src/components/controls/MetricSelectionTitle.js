import React from "react"
import clsx from "clsx"
import { fade, Typography, withStyles } from "@material-ui/core"
import MetricSelection from "./MetricSelection"
import RegionSelection from "../immigration/RegionSelection"
import { serifTypography } from "../../gatsby-theme-hyperobjekt-core/theme"
import { useOptionsStore } from "../../common/hooks"

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
  isImmigration,
  ...props
}) => {
  // inject metric selection onto title
  /* eslint-disable no-template-curly-in-string */
  const titleParts = title.split("${metric}")
  /* eslint-enable no-template-curly-in-string */
  const metricSelection = (
    <MetricSelection group={group} isImmigration={isImmigration} />
  )
  const titleArray =
    titleParts.length === 2
      ? [titleParts[0], metricSelection, titleParts[1]]
      : [...titleParts, metricSelection]

  const regionSelected = useOptionsStore((state) => state.iceRegionId)
  let regionTitleArray = []
  if (isImmigration) {
    const regionText = " Field Office region" + (regionSelected ? "" : "s")
    const inText = " in " + (regionSelected ? "the " : "")

    regionTitleArray = [inText, <RegionSelection />, regionText]
  }

  return (
    <Typography
      className={clsx(classes.root, className)}
      variant="h3"
      {...props}
    >
      {titleArray.map((t, i) => (
        <React.Fragment key={i}>{t}</React.Fragment>
      ))}
      {regionTitleArray.map((t, i) => (
        <React.Fragment key={i}>{t}</React.Fragment>
      ))}
    </Typography>
  )
}

MetricSelectionTitle.propTypes = {}

export default withStyles(styles)(MetricSelectionTitle)
