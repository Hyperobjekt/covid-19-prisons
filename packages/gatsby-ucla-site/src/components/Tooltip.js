import { makeStyles } from "@material-ui/core"
import React from "react"
import ReactTooltip from "react-tooltip"

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.text.primary,
  },
}))

const Tooltip = (props) => {
  const classes = useStyles()
  return (
    <ReactTooltip
      backgroundColor="#283224"
      className={classes.root}
      {...props}
    />
  )
}

export default Tooltip
