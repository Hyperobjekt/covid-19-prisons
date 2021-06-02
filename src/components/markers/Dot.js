import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { withStyles } from "@material-ui/core"
import { animated, useSpring } from "react-spring"

export const style = {
  root: {
    strokeWidth: 1,
    strokeOpacity: 0.3,
  },
}

const Dot = ({ radius, classes, className, ...props }) => {
  const { r } = useSpring({
    to: { r: radius },
  })

  return (
    <animated.circle
      className={clsx("dot", classes.root, className)}
      r={r}
      {...props}
    />
  )
}

Dot.propTypes = {
  radius: PropTypes.number,
}

export default withStyles(style)(Dot)
