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
}

const spikePath = (length, width = 7) => {
  if (!length || !width) return `M0,0L0,0L0,0`
  return `M${-width / 2},0L0,${-length}L${width / 2},0`
}

const Spike = ({ length, width, classes, className, ...props }) => {
  const { path } = useSpring({
    to: { path: spikePath(length, width) },
  })

  return (
    <>
      <animated.path
        className={clsx("spike", classes.root, className)}
        d={path}
        {...props}
      />
      <animated.path
        className={clsx(classes.buffer)}
        d={path}
        {...props}
      />
    </>
  )
}

Spike.propTypes = {
  length: PropTypes.number,
  width: PropTypes.number,
}

export default withStyles(style)(Spike)
