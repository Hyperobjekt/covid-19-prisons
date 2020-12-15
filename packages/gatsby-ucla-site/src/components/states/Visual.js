import React from "react"
import clsx from "clsx"
import useStatesStore from "./useStatesStore"
import {
  FacilitiesMap,
  FilingsVisual,
  GrassrootsVisual,
  ImmigrationVisual,
  ReleasesVisual,
} from "./visuals"
import { useSpring } from "react-spring"
import { withStyles } from "@material-ui/core"

const styles = (theme) => ({
  root: {
    position: "relative",
  },
  visual: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: theme.spacing(3),
  },
})

const Visual = ({ classes, className, ...props }) => {
  // current step that is scrolled in view
  const currentStep = useStatesStore((state) => state.currentStep)
  const isMapVisible =
    ["residents", "staff", "facilities"].indexOf(currentStep) > -1
  const isVisible = (step) => currentStep === step

  // springs for transitioning opacity
  const mapOpacity = useSpring({
    opacity: isMapVisible ? 1 : 0,
    zIndex: isMapVisible ? 2000 : -1,
  })
  const filingsOpacity = useSpring({
    opacity: isVisible("filings") ? 1 : 0,
    zIndex: isVisible("filings") ? 2000 : -1,
  })
  const releasesOpacity = useSpring({
    opacity: isVisible("releases") ? 1 : 0,
    zIndex: isVisible("releases") ? 2000 : -1,
  })
  const immigrationOpacity = useSpring({
    opacity: isVisible("immigration") ? 1 : 0,
    zIndex: isVisible("immigration") ? 2000 : -1,
  })
  const grassrootsOpacity = useSpring({
    opacity: isVisible("grassroots") ? 1 : 0,
    zIndex: isVisible("grassroots") ? 2000 : -1,
  })

  return (
    <div className={clsx(classes.root, className)} {...props}>
      <FacilitiesMap className={classes.visual} style={mapOpacity} />
      <FilingsVisual className={classes.visual} style={filingsOpacity} />
      <ReleasesVisual className={classes.visual} style={releasesOpacity} />
      <ImmigrationVisual
        className={classes.visual}
        style={immigrationOpacity}
      />
      <GrassrootsVisual className={classes.visual} style={grassrootsOpacity} />
    </div>
  )
}

Visual.propTypes = {}

export default withStyles(styles)(Visual)
