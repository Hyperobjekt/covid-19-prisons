import React from "react"
import clsx from "clsx"
import { format as d3Format } from "d3-format"

import PropTypes from "prop-types"
import { Typography, withStyles } from "@material-ui/core"
import Stack from "../Stack"
import { isNumber } from "../../common/utils/selectors"
import { getLang } from "../../common/utils/i18n"

export const styles = (theme) => ({
  root: {},
  number: {
    fontSize: theme.typography.pxToRem(32),
    color: theme.palette.secondary.secondary,
    "&.selected": {
      color: theme.palette.secondary.main,
    },
    fontWeight: 700,
    lineHeight: 1,
  },
  label: {
    color: theme.palette.text.secondary,
    lineHeight: 1.25,
    marginTop: theme.spacing(0.5),
  },
  unavailable: {
    "& $number": {
      fontSize: theme.typography.pxToRem(16),
      color: "rgba(0,0,0,0.3)",
      marginBottom: 4,
    },
  },
})

const NumberStat = ({
  classes,
  className,
  value,
  label,
  format = ",d",
  isSelectedMetric,
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
          selected: isSelectedMetric,
        })}
        variant="number"
      >
        {isValid ? formatter(value) : getLang("unavailable")}
      </Typography>
      <Typography className={classes.label} variant="body2">
        {label}
      </Typography>
      {children}
    </Stack>
  )
}

NumberStat.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  isSelectedMetric: PropTypes.bool,
}

export default withStyles(styles)(NumberStat)
