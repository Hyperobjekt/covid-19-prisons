import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { withStyles } from "@material-ui/core"
import { animated, useSpring } from "react-spring"

export const style = {
  root: {
    strokeWidth: 0.8,
    fillOpacity: 1,
  },
  // fixes 75a - create an additional, transparent spike with a wider stroke to allow easier hover
  // (functions like added padding, which svgs don't have)
  buffer: {
    strokeWidth: 22,
    fillOpacity: 0,
    stroke: "transparent",
  },
  outline: {
    strokeWidth: 0.2,
    fillOpacity: 0,
    stroke: "#000000bd",
  },
}

const spikePath = (length, width = 7) => {
  if (!length || !width) return `M0,0L0,0L0,0`
  // for the shorter, narrower spikes proposed
  // return `M${-width * 0.375},0L0,${-length * 0.75}L${width * 0.375},0`
  return `M${-width / 2},0L0,${-length}L${width / 2},0`
}

const Spike = ({ length, width, classes, className, ...props }) => {
  const rawPath = spikePath(length, width)
  const { path } = useSpring({
    to: { path: rawPath },
  })

  return (
    <>
      <animated.path
        className={clsx("spike", classes.root, className)}
        d={path}
        {...props}
      />
      <path className={classes.buffer} d={rawPath} />
      <path className={classes.outline} d={rawPath} />
    </>
  )
}

Spike.propTypes = {
  length: PropTypes.number,
  width: PropTypes.number,
}

export default withStyles(style)(Spike)
