import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import {
  makeStyles,
  useMediaQuery,
  useTheme,
  withStyles,
} from "@material-ui/core"

/**
 * Getter to retrieve align-items and justify-content values.
 * Allows users to specify top / right / bottom / left in addition
 * to any valid flexbox style value (e.g. space-around)
 */
const getAlign = (align) => {
  if (!align) return undefined
  switch (align) {
    case "right":
    case "bottom":
      return "flex-end"
    case "left":
    case "top":
      return "flex-start"
    default:
      return align
  }
}

/** Stack styles */
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: ({ align }) => getAlign(align),
    justifyContent: ({ justify }) => getAlign(justify),
    "& > * + *": {
      marginTop: ({ spacing, isHorizontal }) =>
        spacing && !isHorizontal ? theme.spacing(spacing) : "unset",
      marginLeft: ({ spacing, isHorizontal }) =>
        spacing && isHorizontal ? theme.spacing(spacing) : "unset",
    },
  },
}))

/**
 * Generates styles for horizontal layout for a given breakpont
 * @param {*} globalStyles styles to add to
 * @param {*} theme material ui theme object
 * @param {*} breakpoint breakpoint to add styles to
 */
function generateStackLayout(globalStyles, theme, breakpoint) {
  const styles = {}
  const key = `stack-${breakpoint}-horizontal`
  styles[key] = { flexDirection: "row" }
  // No need for a media query for the first size.
  if (breakpoint === "xs") {
    Object.assign(globalStyles, styles)
  } else {
    globalStyles[theme.breakpoints.up(breakpoint)] = styles
  }
}

export const styles = (theme) => ({
  // adds classes for horizontal alignment by breakpoint
  ...theme.breakpoints.keys.reduce((accumulator, key) => {
    // Use side effect over immutability for better performance.
    generateStackLayout(accumulator, theme, key)
    return accumulator
  }, {}),
})

/**
 * A flexbox helper for stacking items horizontally and vertically with even margins
 */
const Stack = ({
  classes,
  className: propClassName,
  horizontal = false,
  align,
  justify,
  dense,
  spacing = 1,
  component: Component = "div",
  ...props
}) => {
  const theme = useTheme()
  const breakpoint = horizontal === true ? "xs" : horizontal
  // get a media query for the horizontal breakpoint, or use unmatchable breakpoint
  const mq = breakpoint ? theme.breakpoints.up(breakpoint) : "(max-width:1px)"
  const isHorizontal = useMediaQuery(mq)
  const { root } = useStyles({ spacing, isHorizontal, align, justify })
  const className = clsx(
    root,
    {
      [classes[`stack-xs-horizontal`]]:
        horizontal === "xs" || horizontal === true,
      [classes[`stack-${String(horizontal)}-horizontal`]]:
        horizontal !== false && typeof horizontal === "string",
    },
    propClassName
  )
  return <Component className={className} {...props} />
}

Stack.propTypes = {
  /** object of classnames that apply to the component ({root}) */
  classes: PropTypes.object,
  /** class name to apply to the root */
  className: PropTypes.string,
  /** spacing increment based on the theme spacing function */
  spacing: PropTypes.number,
  /** true to stack horizontally, or a breakpoint string where to switch to horizontal */
  horizontal: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** flexbox align-items property value */
  align: PropTypes.string,
  /** flexbox justify-content property value */
  justify: PropTypes.string,
}
export default withStyles(styles, { name: "HypStack" })(Stack)
