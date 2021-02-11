import React from "react"
import ReactTooltip from "react-tooltip"
import InfoIcon from "../../content/assets/info-icon.svg"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  iconWrapper: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary + " !important",
    textDecoration: "none !important",
    fontSize: theme.typography.pxToRem(14),
    display: "inline-flex",
    lineHeight: "30px",
    // cursor: "pointer",
    "& img": {
      paddingRight: theme.spacing(1),
    },
  },
  tooltip: {
    maxWidth: "350px",
  },
  title: {
    display: "block",
    fontSize: theme.typography.pxToRem(16),
    paddingBottom: theme.spacing(1),
    borderBottom: "dotted white 1px",
    marginBottom: theme.spacing(1),
  },
  note: {
    fontSize: theme.typography.pxToRem(14),
  },
}))

const IconWithTooltip = ({
  iconText = "Data notes",
  title = "Data notes",
  notes = [],
  ...props
}) => {
  const classes = useStyles()

  const id = "icon-tooltip-" + Math.random()
  return (
    <>
      <a className={classes.iconWrapper} data-tip data-for={id}>
        <img alt="info" src={InfoIcon} />
        {iconText}
      </a>

      <ReactTooltip
        className={classes.tooltip}
        place="top"
        id={id}
        effect="solid"
      >
        {title && <h4 className={classes.title}>{title}</h4>}
        {/* {children} */}
        {notes.map((note) => (
          <p className={classes.note}>{note}</p>
        ))}
      </ReactTooltip>
    </>
  )
}

IconWithTooltip.propTypes = {}

export default IconWithTooltip
