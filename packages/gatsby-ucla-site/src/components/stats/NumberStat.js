import React from "react"
import clsx from "clsx"
import { format as d3Format } from "d3-format"
import { sansSerifyTypography } from "../../gatsby-theme-hyperobjekt-core/theme"
import PropTypes from "prop-types"
import { Typography, withStyles } from "@material-ui/core"
import Stack from "../Stack"
import { isNumber } from "../../common/utils/selectors"
import { getLang } from "../../common/utils/i18n"

export const styles = (theme) => ({
  root: {},
  number: {
    ...sansSerifyTypography,
    fontSize: theme.typography.pxToRem(24),
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(32),
    },
    color: theme.palette.secondary.secondary,
    "&.highlighted": {
      color: theme.palette.secondary.main,
    },
    fontWeight: 700,
    lineHeight: 1,
  },
  unavailable: {
    "& $number": {
      fontSize: theme.typography.pxToRem(16),
      color: "rgba(0,0,0,0.3)",
    },
  },
})

const NumberStat = ({
  classes,
  className,
  value,
  format = ",d",
  secondary,
  children,
  ...props
}) => {
  const formatter = typeof format === "function" ? format : d3Format(format)
  const isValid = isNumber(value)
  return (
    <Stack
      className={clsx(
        "number-stat",
        classes.root,
        { [classes.unavailable]: !isValid },
        className
      )}
      {...props}
    >
      <Typography
        className={clsx(classes.number, {
          highlighted: !secondary,
        })}
        variant="body1"
      >
        {isValid ? formatter(value) : getLang("unavailable")}
      </Typography>
      {children}
    </Stack>
  )
}

NumberStat.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  secondary: PropTypes.bool,
}

export default withStyles(styles)(NumberStat)
